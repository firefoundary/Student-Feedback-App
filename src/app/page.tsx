"use client";

import { useState } from "react";
import { api } from "~/utils/api"; // tRPC hooks
import { toast } from "react-hot-toast";

export default function StudentsPage() {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [grade, setGrade] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch students
  const { data: students, refetch } = api.student.getAll.useQuery();

  // Create student mutation
  const createStudent = api.student.create.useMutation({
    onSuccess: () => {
      toast.success("Student added!");
      refetch();
      setName("");
      setStudentId("");
      setGrade("");
    },
    onError: () => toast.error("Failed to add student"),
  });

  // Generate feedback mutation
  const generateFeedback = api.feedback.generateFeedback.useMutation({
    onSuccess: (data) => {
      toast.success("Feedback generated!");
      alert(`Generated Feedback:\n${data.content}`);
    },
    onError: () => toast.error("Failed to generate feedback"),
  });

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Student Management</h1>

      {/* Add Student Form */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Add Student</h2>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => createStudent.mutate({ name, studentId, grade })}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Student"}
        </button>
      </div>

      {/* Student List */}
      <h2 className="text-lg font-semibold mb-2">Student List</h2>
      {students?.length ? (
        <ul className="border p-4">
          {students.map((student) => (
            <li key={student.id} className="border-b p-2 flex justify-between">
              <span>{student.name} (Grade: {student.grade})</span>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={() =>
                  generateFeedback.mutate({
                    studentId: student.id,
                    feedbackType: "improvement",
                  })
                }
              >
                Generate Feedback
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
}
