import { createTRPCRouter } from "../../trpc";
import { missingLanguageTranslation } from "./missing-language-translation";

export const miscRouter = createTRPCRouter({
  missingLanguageTranslation,
});
