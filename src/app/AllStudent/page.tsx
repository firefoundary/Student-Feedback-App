"use client";

import { api } from "~/utils/api"; // tRPC hooks
import { toast } from "react-hot-toast";
import NavigationBar from '../NavigationBar/page';


export default function AllStudentsPage() {
  // Fetch students
  const { data: students, refetch } = api.student.getAll.useQuery();

  // Delete student mutation
  const deleteStudent = api.student.delete.useMutation({
    onSuccess: () => {
      toast.success("Student deleted!");
      refetch();
    },
    onError: () => toast.error("Failed to delete student"),
  });

  return (
    <div><NavigationBar /> {/* Ensure this component exists */}
    <div className="max-w-3xl mx-auto p-6">
      
      <h1 className="text-2xl font-bold mb-4">All Students</h1>

      {students?.length ? (
        <ul className="border p-4">
          {students.map((student) => (
            <li key={student.id} className="border-b p-2 flex justify-between">
              <span>{student.studentId}: {student.name} (Grade: {student.grade})</span>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => deleteStudent.mutate({ id: student.id })}

              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>HOLD UP WAIT AMIN</p>
      )}
    </div>
    </div>
  );
}