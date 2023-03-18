import * as z from "zod"
import * as imports from "../zod-add-schema"
import { UserStatus } from "@prisma/client"
import { CompletelifeInsurance, RelatedlifeInsuranceModel, Completecustomer, RelatedcustomerModel } from "./index"

export const UserProfileModel = z.object({
  id: z.string(),
  id_card_number: z.string().nullish(),
  email: z.string().nullish(),
  first_name: z.string().nullish(),
  last_name: z.string().nullish(),
  phone: z.string().nullish(),
  avatar_url: z.string().nullish(),
  address: z.string().nullish(),
  acceptedTermsAndConditions: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
  email_new_value: z.string().nullish(),
  email_time: z.date().nullish(),
  email_verificationCode: z.string().nullish(),
  email_verified: z.date().nullish(),
  phone_new_value: z.string().nullish(),
  phone_time: z.date().nullish(),
  phone_verificationCode: z.string().nullish(),
  phone_verified: z.date().nullish(),
  years_experience: z.number().int().nullish(),
  worker_type: z.string().nullish(),
  workplace_name: z.string().nullish(),
  number_of_files: z.number().int().nullish(),
  certificate_id_picture: z.string().nullish(),
  certificate_id_picture_later: z.boolean().nullish(),
  bank_name: z.string().nullish(),
  bank_branch: z.string().nullish(),
  bank_number: z.string().nullish(),
  bank_branch_number: z.string().nullish(),
  bank_account: z.string().nullish(),
  bank_details_later: z.boolean().nullish(),
  is_advisor: z.boolean(),
  advisor_status: z.nativeEnum(UserStatus),
  notes: z.string().nullish(),
  signed_terms: z.date().nullish(),
})

export interface CompleteUserProfile extends z.infer<typeof UserProfileModel> {
  lifeInsurance: CompletelifeInsurance[]
  customer: Completecustomer[]
}

/**
 * RelatedUserProfileModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserProfileModel: z.ZodSchema<CompleteUserProfile> = z.lazy(() => UserProfileModel.extend({
  lifeInsurance: RelatedlifeInsuranceModel.array(),
  customer: RelatedcustomerModel.array(),
}))
