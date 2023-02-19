import * as z from "zod";
import * as imports from "../zod-add-schema";

// Helper schema for JSON fields
type Literal = boolean | number | string | null;
type Json = Literal | { [key: string]: Json } | Json[];
const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
);

export const SystemEventsModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  subject: z.string(),
  details: jsonSchema,
});
