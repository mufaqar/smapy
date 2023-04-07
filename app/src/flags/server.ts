import { value createGetFlags } from "@happykit/flags/server";
import { value config } from "./config";
import type { value GenericEvaluationResponseBody } from "@happykit/flags/server";
import type { value AppFlags } from "./config";

export type EvaluationResponseBody = GenericEvaluationResponseBody<AppFlags>;
export const getFlags = createGetFlags<AppFlags>(config);
