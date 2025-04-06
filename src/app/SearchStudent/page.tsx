"use client";

import { useState, useMemo } from "react";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
import NavigationBar from '../NavigationBar/page';

const validFeedbackTypes = ["improvement", "strengths", "parentConference"] as const;
type FeedbackType = typeof validFeedbackTypes[number];

const isValidFeedbackType = (value: string): value is FeedbackType => {
  return validFeedbackTypes.includes(value as FeedbackType);
};

export default function SearchStudent() {
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [feedbackType, setFeedbackType] = useState<FeedbackType | "">("");
  const [isEditing, setIsEditing] = useState(false);
  const [generatedFeedback, setGeneratedFeedback] = useState<string | null>(null);

  // Fetch students
  const { data: students } = api.student.getAll.useQuery();

  // Generate feedback mutation
  const generateFeedback = api.feedback.generateFeedback.useMutation({
    onSuccess: (data) => {
      toast.success("Feedback generated!");
      setGeneratedFeedback(data.content);
    },
    onError: (error) => {
      toast.error("Failed to generate feedback");
      console.error("Feedback generation error:", error);
      setGeneratedFeedback(null);
    }
  }) as any;

  const handleGenerateFeedback = () => {
    if (!studentId || !feedbackType) {
      toast.error("Please enter a valid Student ID and Feedback Type");
      return;
    }
    
    generateFeedback.mutate({
      studentId,
      feedbackType,
    });
  };

  // Memoized and filtered student list
  const filteredAndSortedStudents = useMemo(() => {
    if (!students) return [];

    // Filter by name if search is not empty
    const filtered = studentName 
      ? students.filter(student => 
          student.name.toLowerCase().includes(studentName.toLowerCase())
        )
      : students;

    // Sort by grade (in descending order) and then by student ID
    return filtered.sort((a, b) => {
      // Define grade order from highest to lowest
      const gradeOrder = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];
      
      // Compare grades first
      const gradeComparison = gradeOrder.indexOf(b.grade) - gradeOrder.indexOf(a.grade);
      
      // If grades are the same, compare student IDs
      if (gradeComparison === 0) {
        return a.studentId.localeCompare(b.studentId);
      }
      
      return gradeComparison;
    });
  }, [students, studentName]);

  // Mutation for updating student
  const updateStudent = api.student.update.useMutation({
    onSuccess: () => {
      toast.success("Student information updated successfully!");
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error("Failed to update student information");
      console.error("Update error:", error);
    }
  }) as any;

  // Mutations for additional actions
  const addSubject = api.student.addSubject.useMutation({
    onError: (error) => {
      toast.error("Failed to add subject");
      console.error("Add subject error:", error);
    }
  });

  const addGrade = api.student.addGrade.useMutation({
    onError: (error) => {
      toast.error("Failed to add grade");
      console.error("Add grade error:", error);
    }
  });

  const updateAttendance = api.student.updateAttendance.useMutation({
    onError: (error) => {
      toast.error("Failed to update attendance");
      console.error("Update attendance error:", error);
    }
  });

  const addBehavioralNote = api.student.addBehavioralNote.useMutation({
    onError: (error) => {
      toast.error("Failed to add behavioral note");
      console.error("Add behavioral note error:", error);
    }
  });

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    grade: "",
  });

  // Subjects state
  const [subjects, setSubjects] = useState<Array<{
    id?: string;
    name: string;
    performance?: string;
    grades: Array<{ value: number }>;
  }>>([]);

  // Attendance state
  const [attendance, setAttendance] = useState({
    present: 0,
    absent: 0,
    late: 0
  });

  // Behavioral notes state
  const [behavioralNote, setBehavioralNote] = useState("");

  // Populate form when a student is selected for editing
  const handleEditStudent = (student: any) => {
    setSelectedStudent(student);
    setIsEditing(true);
    setFormData({
      name: student.name,
      studentId: student.studentId,
      grade: student.grade,
    });

    setSubjects(student.subjects?.map((subject: any) => ({
      id: subject.id,
      name: subject.name,
      performance: subject.performance || undefined,
      grades: subject.grades.map((grade: any) => ({ value: grade.value }))
    })) || []);

    setAttendance(student.attendance || {
      present: 0,
      absent: 0,
      late: 0
    });

    // Get the latest behavioral note
    if (student.behavioralNotes && student.behavioralNotes.length > 0) {
      setBehavioralNote(student.behavioralNotes[student.behavioralNotes.length - 1].content);
    }
  };

  // Handle main form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStudent) {
      toast.error("No student selected");
      return;
    }

    try {
      // Update student basic info
      await updateStudent.mutateAsync({
        id: selectedStudent.id,
        ...formData
      });

      // Update attendance
      await updateAttendance.mutateAsync({
        studentId: selectedStudent.id,
        ...attendance
      });

      // Add/update subjects
      for (const subject of subjects) {
      // Add or update subject
        const savedSubject = subject.id 
          ? subject 
          : await addSubject.mutateAsync({
              studentId: selectedStudent.id,
              name: subject.name,
              performance: subject.performance
            });
        // Ensure savedSubject has an ID before using it
        if (!savedSubject.id) {
          throw new Error('Saved subject does not have an ID');
        }

        // Add grades for the subject
        for (const grade of subject.grades) {
          await addGrade.mutateAsync({
            subjectId: savedSubject.id,
            value: grade.value
          });
        }
      }

      // Add behavioral note if not empty
      if (behavioralNote.trim()) {
        await addBehavioralNote.mutateAsync({
          studentId: selectedStudent.id,
          content: behavioralNote
        });
      }

      toast.success("Student information updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update student information");
      console.error(error);
    }
  };

  // Render editing form
  const renderEditForm = () => {
    return (
      <div className="mt-6 p-4 border rounded bg-gray-50">
        <h2 className="text-xl font-bold mb-4">Edit Student Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border p-2 w-full rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Student ID</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                className="border p-2 w-full rounded"
                required
              />
            </div>
          </div>

          {/* Grade and Behavioral Notes */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Grade</label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                className="border p-2 w-full rounded"
                required
              >
                {['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'].map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2">Behavioral Notes</label>
              <textarea
                value={behavioralNote}
                onChange={(e) => setBehavioralNote(e.target.value)}
                className="border p-2 w-full rounded"
                rows={3}
              />
            </div>
          </div>

          {/* Attendance */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Attendance</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-2">Present Days</label>
                <input
                  type="number"
                  value={attendance.present}
                  onChange={(e) => setAttendance(prev => ({ 
                    ...prev, 
                    present: parseInt(e.target.value) || 0 
                  }))}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label className="block mb-2">Absent Days</label>
                <input
                  type="number"
                  value={attendance.absent}
                  onChange={(e) => setAttendance(prev => ({ 
                    ...prev, 
                    absent: parseInt(e.target.value) || 0 
                  }))}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label className="block mb-2">Late Days</label>
                <input
                  type="number"
                  value={attendance.late}
                  onChange={(e) => setAttendance(prev => ({ 
                    ...prev, 
                    late: parseInt(e.target.value) || 0 
                  }))}
                  className="border p-2 w-full rounded"
                />
              </div>
            </div>
          </div>

          {/* Subjects */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Subjects</h2>
              <button
                type="button"
                onClick={() => setSubjects(prev => [...prev, { 
                  name: '', 
                  grades: [{ value: 0 }] 
                }])}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Add Subject
              </button>
            </div>

            {subjects.map((subject, subjectIndex) => (
              <div 
                key={subjectIndex} 
                className="border p-4 rounded mb-4 bg-gray-50"
              >
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2">Subject Name</label>
                    <input
                      type="text"
                      value={subject.name}
                      onChange={(e) => {
                        const newSubjects = [...subjects];
                        if (newSubjects[subjectIndex]) {
                          newSubjects[subjectIndex].name = e.target.value;
                          setSubjects(newSubjects);
                        }
                      }}
                      className="border p-2 w-full rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Performance</label>
                    <select
                      value={subject.performance || ''}
                      onChange={(e) => {
                        const newSubjects = [...subjects];
                        if (newSubjects[subjectIndex]) {
                          newSubjects[subjectIndex].performance = e.target.value;
                          setSubjects(newSubjects);
                        }
                      }}
                      className="border p-2 w-full rounded"
                    >
                      <option value="">Select Performance</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Average">Average</option>
                      <option value="Needs Improvement">Needs Improvement</option>
                    </select>
                  </div>
                </div>

                {/* Grades for this subject */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Grades</h3>
                    <button
                      type="button"
                      onClick={() => {
                        const newSubjects = [...subjects];
                        if (newSubjects[subjectIndex]) {
                          newSubjects[subjectIndex].grades.push({ value: 0 });
                          setSubjects(newSubjects);
                        }
                      }}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Add Grade
                    </button>
                  </div>
                  <div className="space-y-2">
                    {subject.grades.map((grade, gradeIndex) => (
                      <div key={gradeIndex} className="flex items-center space-x-2">
                        <input
                          type="number"
                          step="0.1"
                          value={grade.value}
                          onChange={(e) => {
                            const newSubjects = [...subjects];
                            if (newSubjects[subjectIndex]?.grades[gradeIndex]) {
                              newSubjects[subjectIndex].grades[gradeIndex].value = parseFloat(e.target.value);
                              setSubjects(newSubjects);
                            }
                          }}
                          className="border p-2 w-full rounded"
                          placeholder="Enter grade"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
              disabled={updateStudent.isLoading}
            >
              {updateStudent.isLoading ? 'Updating...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div><NavigationBar />
    <div className="p-4 max-w-md mx-auto">
      
      <h1 className="text-2xl font-bold mb-4 text-center">View and Edit Student Data</h1>
      
      <div className="space-y-4">
        <input
          type="text"
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search by Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        
        <select
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={feedbackType}
          onChange={(e) => {
            const value = e.target.value;
            if (isValidFeedbackType(value)) {
              setFeedbackType(value);
            }
          }}
        >
          <option value="">Select Feedback Type</option>
          {validFeedbackTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1')}
            </option>
          ))}
        </select>
        
        <div className="flex space-x-2">
          <button
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded 
              hover:bg-blue-600 transition-colors 
              disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={handleGenerateFeedback}
            disabled={!studentId || !feedbackType || generateFeedback.isLoading}
          >
            {generateFeedback.isLoading ? 'Generating...' : 'Generate Feedback'}
          </button>
          <button
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded 
              hover:bg-green-600 transition-colors 
              disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!studentId}
            onClick={() => {
              const student = students?.find(s => s.id === studentId);
              if (student) {
                handleEditStudent(student);
              }
            }}
          >
            Edit Student
          </button>
        </div>
      </div>

      {generateFeedback.isError && (
        <div className="text-red-500 mt-4 text-center">
          Error generating feedback. Please try again.
        </div>
      )}
      {generatedFeedback && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
          <h2 className="text-lg font-semibold mb-2">Generated Feedback</h2>
          <p className="whitespace-pre-wrap">{generatedFeedback}</p>
          <button
            className="mt-2 bg-gray-500 text-white px-3 py-1 rounded text-sm"
            onClick={() => setGeneratedFeedback(null)}
          >
            Clear Feedback
          </button>
        </div>
      )}

      {/* Student List Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">
          {studentName ? `Search Results for "${studentName}"` : "All Students"}
        </h2>
        {filteredAndSortedStudents.length ? (
          <ul className="border rounded p-4 space-y-2">
            {filteredAndSortedStudents.map((student) => (
              <li 
                key={student.id} 
                className="flex justify-between items-center border-b pb-2 last:border-b-0"
              >
                <div>
                  <span className="font-medium">{student.name}</span>
                  <span className="text-gray-500 ml-2">
                    (ID: {student.studentId}, Grade: {student.grade})
                  </span>
                </div>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm mr-2"
                  onClick={() => {
                    setStudentId(student.id);
                    setFeedbackType("improvement"); // Default feedback type
                  }}
                >
                  Select
                </button>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  onClick={() => {
                    setStudentId(student.id);
                    handleEditStudent(student);
                  }}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No students found.</p>
        )}
      </div>

      {/* Conditional Rendering of Edit Form */}
      {isEditing && renderEditForm()}
    </div>
    </div>
  );
}