import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// Define input validation schemas using Zod
const createStudentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  studentId: z.string().min(1, "Student ID is required"),
  grade: z.string().min(1, "Grade is required"),
});

const updateStudentSchema = createStudentSchema.partial().extend({
  id: z.string().min(1, "Student ID is required"),
});

export const studentRouter = createTRPCRouter({
  // Get all students
  getAll: publicProcedure.query(async ({ ctx }) => {
    console.log("DB instance in getAll:", ctx.db); // Debugging log
  
    if (!ctx.db) {
      throw new Error("Database connection is not available in tRPC context");
    }
  
    return await ctx.db.student.findMany({
      include: {
        subjects: { include: { grades: true } },
        attendance: true,
        behavioralNotes: true,
        feedbackHistory: true,
      },
    });
  }),
  

  // Get a single student by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.student.findUnique({
        where: { id: input.id },
        include: {
          subjects: {
            include: {
              grades: true,
            },
          },
          attendance: true,
          behavioralNotes: true,
          feedbackHistory: true,
        },
      });
    }),

  // Create a new student
  create: publicProcedure
    .input(createStudentSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.student.create({
        data: {
          name: input.name,
          studentId: input.studentId,
          grade: input.grade,
          attendance: {
            create: {
              present: 0,
              absent: 0,
              late: 0,
            },
          },
        },
      });
    }),

  // Update an existing student
  update: publicProcedure
    .input(updateStudentSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return await ctx.db.student.update({
        where: { id },
        data,
      });
    }),

  // Delete a student
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.student.delete({
        where: { id: input.id },
      });
    }),

  // Add a subject to a student
  addSubject: publicProcedure
    .input(
      z.object({
        studentId: z.string(),
        name: z.string(),
        performance: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.subject.create({
        data: {
          name: input.name,
          performance: input.performance,
          student: {
            connect: { id: input.studentId },
          },
        },
      });
    }),

  // Add a grade to a subject
  addGrade: publicProcedure
    .input(
      z.object({
        subjectId: z.string(),
        value: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.grade.create({
        data: {
          value: input.value,
          subject: {
            connect: { id: input.subjectId },
          },
        },
      });
    }),

  // Update attendance record
  updateAttendance: publicProcedure
    .input(
      z.object({
        studentId: z.string(),
        present: z.number().optional(),
        absent: z.number().optional(),
        late: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { studentId, ...attendanceData } = input;
      return await ctx.db.attendance.upsert({
        where: { studentId },
        update: attendanceData,
        create: {
          ...attendanceData,
          student: {
            connect: { id: studentId },
          },
        },
      });
    }),

  // Add a behavioral note
  addBehavioralNote: publicProcedure
    .input(
      z.object({
        studentId: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.behavioralNote.create({
        data: {
          content: input.content,
          student: {
            connect: { id: input.studentId },
          },
        },
      });
    }),

  // Export student data to CSV/XLSX format (returns formatted data)
  exportStudentData: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const student = await ctx.db.student.findUnique({
        where: { id: input.id },
        include: {
          subjects: {
            include: {
              grades: true,
            },
          },
          attendance: true,
          behavioralNotes: true,
          feedbackHistory: true,
        },
      });

      if (!student) {
        throw new Error("Student not found");
      }

      // Format data for export
      // This will be used by the Gemini API
      const exportData = {
        name: student.name,
        studentId: student.studentId,
        grade: student.grade,
        subjects: student.subjects.map((subject) => ({
          name: subject.name,
          performance: subject.performance,
          averageGrade: subject.grades.length
            ? subject.grades.reduce((sum, grade) => sum + grade.value, 0) /
              subject.grades.length
            : null,
        })),
        attendance: student.attendance,
        behavioralNotes: student.behavioralNotes.map((note) => note.content),
      };

      return exportData;
    }),
});