import { createTRPCRouter } from "~/server/api/trpc";
import { studentRouter } from "~/server/api/routers/student";
import { feedbackRouter } from "~/server/api/routers/feedback";
import { postRouter } from "~/server/api/routers/post"; // Other existing routers

export const appRouter = createTRPCRouter({
  student: studentRouter,
  feedback: feedbackRouter,
  post: postRouter,
  // Add other routers here
});

export const createCaller = appRouter.createCaller;

// export type definition of API
export type AppRouter = typeof appRouter;
