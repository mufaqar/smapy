import { createTRPCRouter } from "../../trpc";
import { missingLanguageTranslation } from "./missing-language-translation";
import { runAdminCommand, simulateServerError } from "./system";

export const miscRouter = createTRPCRouter({
  missingLanguageTranslation,
  runAdminCommand,
  simulateServerError,
});
