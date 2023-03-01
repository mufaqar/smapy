import * as z from "zod"
import * as imports from "../zod-add-schema"
import { InsuranceStatus } from "@prisma/client"
import { CompleteUserProfile, RelatedUserProfileModel, Completecustomer, RelatedcustomerModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string | null
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const lifeInsuranceModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
  statusDate: z.date().nullish(),
  advisorId: z.string(),
  number_of_persons: z.number().int(),
  customerId: z.string().nullish(),
  loan_tracks_count: z.number().int().nullish(),
  load_tracks: imports.LoanTracks,
  total: z.number().nullish(),
  status: z.nativeEnum(InsuranceStatus),
})

export interface CompletelifeInsurance extends z.infer<typeof lifeInsuranceModel> {
  advisor: CompleteUserProfile
  customer?: Completecustomer | null
}

/**
 * RelatedlifeInsuranceModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedlifeInsuranceModel: z.ZodSchema<CompletelifeInsurance> = z.lazy(() => lifeInsuranceModel.extend({
  advisor: RelatedUserProfileModel,
  customer: RelatedcustomerModel.nullish(),
}))
