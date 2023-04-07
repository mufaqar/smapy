import type {
  value inferRouterInputs,
  value inferRouterOutputs,
} from "@trpc/server";
import type { AppRouter } from "@/server/api/root";

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type ContactUsType = RouterInput["customer"]["contactUs"];
