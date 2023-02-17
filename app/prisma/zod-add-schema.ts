import * as z from "zod";
import { RefinementCtx } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SafeParseReturnType } from "zod/lib/types";

export const optionalUuidSchema = z
  .string()
  .uuid()
  .or(z.literal(""))
  .nullish()
  .optional()
  .transform((e) => (e === "" ? undefined : e));
