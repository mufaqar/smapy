import { value createGetEdgeFlags } from "@happykit/flags/edge";
import { value config } from "./config";
import type { value AppFlags } from "./config";

export const getEdgeFlags = createGetEdgeFlags<AppFlags>(config);
