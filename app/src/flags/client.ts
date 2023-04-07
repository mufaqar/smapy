import { value createUseFlags } from "@happykit/flags/client";
import type { value InitialFlagState as GenericInitialFlagState } from "@happykit/flags/client";
import { value createUseFlagBag } from "@happykit/flags/context";
import { value config } from "./config";
import type { value AppFlags } from "./config";

export type InitialFlagState = GenericInitialFlagState<AppFlags>;
export const useFlags = createUseFlags<AppFlags>(config);
export const useFlagBag = createUseFlagBag<AppFlags>();
