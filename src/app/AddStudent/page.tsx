"use client";

import { useState } from "react";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
import React from 'react';
import NavigationBar from '../NavigationBar/page';

export default function AddStudentPage() {
  // Initial state to allow easy reset
  const initialFormData = {
    name: "",
    studentId: "",
    grade: "",
  };

  const initialSubjectsState: Array<{
    name: string;
    performance?: string;
    grades: Array<{ value: number }>;
  }> = [];

  const initialAttendanceState = {
    present: 0,
    absent: 0,
    late: 0
  };

  // Form data state
  const [formData, setFormData] = useState(initialFormData);
  const [subjects, setSubjects] = useState(initialSubjectsState);
  const [attendance, setAttendance] = useState(initialAttendanceState);
  const [behavioralNote, setBehavioralNote] = useState("");
  const [loading, setLoading] = useState(false);

  // Method to clear all entries
  const clearAllEntries = () => {
    setFormData(initialFormData);
    setSubjects(initialSubjectsState);
    setAttendance(initialAttendanceState);
    setBehavioralNote("");
    
    // Optional: Add a visual feedback
    toast.success("All entries cleared!", {
      icon: '🧹',
      style: {
        border: '1px solid #4CAF50',
        padding: '16px',
        color: '#4CAF50',
      }
    });
  };

  // API mutations
  const createStudentMutation = api.student.create.useMutation();
  const updateAttendanceMutation = api.student.updateAttendance.useMutation();
  const addSubjectMutation = api.student.addSubject.useMutation();
  const addGradeMutation = api.student.addGrade.useMutation();
  const addBehavioralNoteMutation = api.student.addBehavioralNote.useMutation();

  // Handle input changes for main form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate mandatory fields
    if (!formData.name.trim() || !formData.studentId.trim()) {
      toast.error("Name and Student ID are mandatory");
      return;
    }

    try {
      setLoading(true);
      
      // Create the student first
      const newStudent = await createStudentMutation.mutateAsync({
        ...formData,
        grade: formData.grade || undefined // Make grade optional
      });

      // Now that we have the student ID, we can add the additional data
      
      // 1. Add attendance
      if (attendance.present > 0 || attendance.absent > 0 || attendance.late > 0) {
        await updateAttendanceMutation.mutateAsync({
          studentId: newStudent.id,
          ...attendance
        });
      }

      // 2. Add subjects and their grades
      for (const subject of subjects) {
        if (subject.name) {
          const savedSubject = await addSubjectMutation.mutateAsync({
            studentId: newStudent.id,
            name: subject.name,
            performance: subject.performance
          });

          // Add grades for the subject
          for (const grade of subject.grades) {
            if (grade.value) {
              await addGradeMutation.mutateAsync({
                subjectId: savedSubject.id,
                value: grade.value
              });
            }
          }
        }
      }

      // 3. Add behavioral note if not empty
      if (behavioralNote.trim()) {
        await addBehavioralNoteMutation.mutateAsync({
          studentId: newStudent.id,
          content: behavioralNote
        });
      }

      // Enhanced success toast with student details
      toast.success(
        `Student Added Successfully! 
        Name: ${newStudent.name}
        Student ID: ${newStudent.studentId}`, 
        {
          duration: 4000,
          style: {
            border: '1px solid #4CAF50',
            padding: '16px',
            color: '#4CAF50',
            whiteSpace: 'pre-line'
          }
        }
      );
      
      // Reset all states
      clearAllEntries();
      
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error("Failed to add student. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationBar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Student</h1>
        
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter student name"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Student ID *</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter student ID"
              />
            </div>
          </div>

          {/* Optional Grade */}
          <div>
            <label className="block mb-2 font-medium">Grade (Optional)</label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Grade</option>
              {['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'].map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>

          {/* Behavioral Notes */}
          <div>
            <label className="block mb-2 font-medium">Behavioral Notes (Optional)</label>
            <textarea
              value={behavioralNote}
              onChange={(e) => setBehavioralNote(e.target.value)}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Enter any behavioral notes"
            />
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
                  min="0"
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
                  min="0"
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
                  min="0"
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
                        newSubjects[subjectIndex].name = e.target.value;
                        setSubjects(newSubjects);
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
                        newSubjects[subjectIndex].performance = e.target.value;
                        setSubjects(newSubjects);
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
                        newSubjects[subjectIndex].grades.push({ value: 0 });
                        setSubjects(newSubjects);
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
                            newSubjects[subjectIndex].grades[gradeIndex].value = parseFloat(e.target.value);
                            setSubjects(newSubjects);
                          }}
                          className="border p-2 w-full rounded"
                          placeholder="Enter grade"
                          min="0"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newSubjects = [...subjects];
                            newSubjects[subjectIndex].grades.splice(gradeIndex, 1);
                            setSubjects(newSubjects);
                          }}
                          className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Remove Subject Button */}
                <div className="mt-4 text-right">
                  <button
                    type="button"
                    onClick={() => {
                      const newSubjects = [...subjects];
                      newSubjects.splice(subjectIndex, 1);
                      setSubjects(newSubjects);
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Remove Subject
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Submit and Clear Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              disabled={loading}
            >
              {loading ? "Adding Student..." : "Add Student"}
            </button>
            <button
              type="button"
              onClick={clearAllEntries}
              className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors"
              disabled={loading}
            >
              Clear All
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}