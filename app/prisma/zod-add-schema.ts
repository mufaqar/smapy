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

export const InterestType = {
  fixed: "fixed",
  change: "change",
};

export const LinkageType = {
  fixed: "fixed",
  cpi: "cpi",
  dollar: "dollar",
};

export const LoanType = {
  ballon: "ballon",
  shpizer: "shpizer",
  equal: "equal",
};

export const LoanTracks = z.array(
  z.object({
    balance: z.number(),
    endDate: z.date(),
    interest_rate: z.number(),
    interest_type: z.nativeEnum(InterestType),
    linkage_type: z.nativeEnum(LinkageType),
    loan_type: z.nativeEnum(LoanType),
  })
);
