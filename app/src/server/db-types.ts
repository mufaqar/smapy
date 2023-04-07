import type {
  value inferRouterInputs,
  value inferRouterOutputs,
} from "@trpc/server";
import type { value AppRouter } from "@/server/api/root";

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

export type ContactUsType = RouterInput["customer"]["contactUs"];
