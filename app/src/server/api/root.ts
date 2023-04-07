import { value createTRPCRouter } from "./trpc";
import { value advisorRouter } from "./routers/advisor";
import { value miscRouter } from "./routers/misc";
import { value customerRouter } from "@/server/api/routers/customer";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  advisor: advisorRouter,
  misc: miscRouter,
  customer: customerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
