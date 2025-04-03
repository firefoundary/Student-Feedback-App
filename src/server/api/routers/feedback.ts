import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { generateFeedback } from "~/utils/geminiService";

export const feedbackRouter = createTRPCRouter({
  // Generate feedback using Gemini API
  generateFeedback: publicProcedure
    .input(
      z.object({
        studentId: z.string(),
        feedbackType: z.enum([
          "improvement",
          "strengths",
          "parentConference",
        ]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // 1. Get student data
      const studentData = await ctx.db.student.findUnique({
        where: { id: input.studentId },
        include: {
          subjects: {
            include: {
              grades: true,
            },
          },
          attendance: true,
          behavioralNotes: true,
        },
      });

      if (!studentData) {
        throw new Error("Student not found");
      }

      // 2. Format data for Gemini API
      const formattedData = {
        name: studentData.name,
        studentId: studentData.studentId,
        grade: studentData.grade,
        subjects: studentData.subjects.map((subject) => ({
          name: subject.name,
          performance: subject.performance || "Not specified",
          grades: subject.grades.map((grade) => grade.value),
          average: subject.grades.length
            ? subject.grades.reduce((sum, grade) => sum + grade.value, 0) /
              subject.grades.length
            : "No grades recorded",
        })),
        attendance: studentData.attendance
          ? {
              present: studentData.attendance.present,
              absent: studentData.attendance.absent,
              late: studentData.attendance.late,
              attendanceRate:
                studentData.attendance.present /
                (studentData.attendance.present +
                  studentData.attendance.absent +
                  studentData.attendance.late),
            }
          : "No attendance records",
        behavioralNotes: studentData.behavioralNotes.map((note) => note.content),
      };

      // 3. Call Gemini API service
      const feedback = await generateFeedback(formattedData, input.feedbackType);

      // 4. Save feedback to database
      const savedFeedback = await ctx.db.feedback.create({
        data: {
          content: feedback,
          generatedBy: "Gemini API",
          student: {
            connect: { id: input.studentId },
          },
        },
      });

      return savedFeedback;
    }),

  // Get feedback history for a student
  getFeedbackHistory: publicProcedure
    .input(z.object({ studentId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.feedback.findMany({
        where: { studentId: input.studentId },
        orderBy: { date: "desc" },
      });
    }),
});