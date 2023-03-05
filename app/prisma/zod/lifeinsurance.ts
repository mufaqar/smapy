import * as z from "zod"
import * as imports from "../zod-add-schema"
import { InsuranceStatus } from "@prisma/client"
import { CompleteUserProfile, RelatedUserProfileModel, CompletelifeInsuranceCustomer, RelatedlifeInsuranceCustomerModel } from "./index"

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
  number_of_customers: z.number().int(),
  loan_tracks_count: z.number().int().nullish(),
  same_address_mortgage: z.boolean().nullish(),
  property_city: z.string().nullish(),
  property_street: z.string().nullish(),
  property_street_number: z.string().nullish(),
  property_apartment_number: z.string().nullish(),
  insurance_start_date: z.date().nullish(),
  bank_name: z.string().nullish(),
  bank_branch: z.string().nullish(),
  bank_number: z.string().nullish(),
  bank_branch_number: z.string().nullish(),
  details_approval: z.date().nullish(),
  loan_tracks: imports.LoanTracks,
  total: z.number().nullish(),
  status: z.nativeEnum(InsuranceStatus),
})

export interface CompletelifeInsurance extends z.infer<typeof lifeInsuranceModel> {
  advisor: CompleteUserProfile
  lifeInsuranceCustomer: CompletelifeInsuranceCustomer[]
}

/**
 * RelatedlifeInsuranceModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedlifeInsuranceModel: z.ZodSchema<CompletelifeInsurance> = z.lazy(() => lifeInsuranceModel.extend({
  advisor: RelatedUserProfileModel,
  lifeInsuranceCustomer: RelatedlifeInsuranceCustomerModel.array(),
}))
