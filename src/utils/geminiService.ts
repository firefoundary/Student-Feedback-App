import { GoogleGenerativeAI } from "@google/generative-ai";

// Types for the student data and feedback options
type Subject = {
  name: string;
  performance: string;
  grades: number[];
  average: number | string;
};

type Attendance = {
  present: number;
  absent: number;
  late: number;
  attendanceRate: number;
};

type StudentData = {
  name: string;
  studentId: string;
  grade: string;
  subjects: Subject[];
  attendance: Attendance | string;
  behavioralNotes: string[];
};

type FeedbackType = "improvement" | "strengths" | "parentConference";

// Get Gemini API key from environment variables
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables");
}

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(apiKey);

// Function to generate feedback based on student data
export async function generateFeedback(
  studentData: StudentData,
  feedbackType: FeedbackType
): Promise<string> {
  try {
    // Get the appropriate prompt template
    const promptTemplate = getPromptTemplate(feedbackType);

    // Format the prompt with student data
    const formattedPrompt = formatPrompt(promptTemplate, studentData);

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: formattedPrompt }] }],
    });

    // Return the generated text
    return result.response.text();
  } catch (error) {
    console.error("Error generating feedback:", error);
    throw new Error("Failed to generate feedback");
  }
}

// Get the appropriate prompt template based on feedback type
function getPromptTemplate(feedbackType: FeedbackType): string {
  const templates = {
    improvement: `
      Based on the student data provided, generate specific areas for improvement for {{name}}. 
      The student is in grade {{grade}}.
      
      Academic Information:
      {{subjectsData}}
      
      Attendance Information:
      {{attendanceData}}
      
      Behavioral Notes:
      {{behavioralNotes}}
      
      Please provide specific, actionable feedback that focuses on areas where the student 
      can improve. Include specific strategies that would be helpful for the student to implement.
      Format the response in a professional but warm tone that would be appropriate for a teacher 
      to share with a student or parent.
    `,
    strengths: `
      Based on the student data provided, highlight the strengths and positive attributes of {{name}}.
      The student is in grade {{grade}}.
      
      Academic Information:
      {{subjectsData}}
      
      Attendance Information:
      {{attendanceData}}
      
      Behavioral Notes:
      {{behavioralNotes}}
      
      Please provide specific feedback that focuses on the student's strengths and achievements.
      Highlight areas where the student excels and provide encouragement.
      Format the response in a professional but warm tone that would be appropriate for a teacher 
      to share with a student or parent.
    `,
    parentConference: `
      Based on the student data provided, prepare talking points for a parent-teacher conference for {{name}}.
      The student is in grade {{grade}}.
      
      Academic Information:
      {{subjectsData}}
      
      Attendance Information:
      {{attendanceData}}
      
      Behavioral Notes:
      {{behavioralNotes}}
      
      Please provide comprehensive talking points that cover both strengths and areas for improvement.
      Include specific examples from the data. Suggest strategies that could be implemented at home to support the student.
      Format the response in a professional but warm tone that would be appropriate for a teacher 
      to discuss with parents during a conference.
    `,
  };

  return templates[feedbackType];
}

// Format the prompt with student data
function formatPrompt(template: string, studentData: StudentData): string {
  let formattedPrompt = template
    .replace("{{name}}", studentData.name)
    .replace("{{grade}}", studentData.grade);

  // Format subjects data
  let subjectsText = "";
  studentData.subjects.forEach((subject) => {
    subjectsText += `- ${subject.name}: Performance ${subject.performance}, `;
    subjectsText += `Grades: ${subject.grades.join(", ")}, `;
    subjectsText += `Average: ${subject.average}\n`;
  });
  formattedPrompt = formattedPrompt.replace("{{subjectsData}}", subjectsText);

  // Format attendance data
  let attendanceText = "";
  if (typeof studentData.attendance === "string") {
    attendanceText = studentData.attendance;
  } else {
    attendanceText = `Present: ${studentData.attendance.present} days, `;
    attendanceText += `Absent: ${studentData.attendance.absent} days, `;
    attendanceText += `Late: ${studentData.attendance.late} days, `;
    attendanceText += `Attendance Rate: ${Math.round(
      studentData.attendance.attendanceRate * 100
    )}%`;
  }
  formattedPrompt = formattedPrompt.replace("{{attendanceData}}", attendanceText);

  // Format behavioral notes
  const behavioralText = studentData.behavioralNotes.length
    ? studentData.behavioralNotes.map((note) => `- ${note}`).join("\n")
    : "No behavioral notes recorded.";
  formattedPrompt = formattedPrompt.replace(
    "{{behavioralNotes}}",
    behavioralText
  );

  return formattedPrompt;
}