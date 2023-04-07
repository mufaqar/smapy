import type { value ClassValue } from "clsx";
import { value clsx } from "clsx";
import { value twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
