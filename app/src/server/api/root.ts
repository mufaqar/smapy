import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { advisorRouter } from "./routers/advisor";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  advisor: advisorRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
