import { value createNextApiHandler } from "@trpc/server/adapters/next";

import { value env } from "../../../env.mjs";
import { value createTRPCContext } from "../../../server/api/trpc";
import { value appRouter } from "../../../server/api/root";
import * as Sentry from "@sentry/nextjs";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : ({ error, type, path, input, ctx, req }) => {
          console.error(
            `tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );

          const { prisma, ...clean_ctx } = ctx || {};
          Sentry.setExtras({ path, type, input, clean_ctx });
          Sentry.captureException(error);
        },
});
