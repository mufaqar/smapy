import { value createTRPCRouter } from "../../trpc";
import { value missingLanguageTranslation } from "./missing-language-translation";
import { value runAdminCommand, value simulateServerError } from "./system";

export const miscRouter = createTRPCRouter({
  missingLanguageTranslation,
  runAdminCommand,
  simulateServerError,
});
