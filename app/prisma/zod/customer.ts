import * as z from "zod"
import * as imports from "../zod-add-schema"
import { Gender, Smoking, FamilyStatus } from "@prisma/client"
import { CompleteUserProfile, RelatedUserProfileModel, CompletelifeInsuranceCustomer, RelatedlifeInsuranceCustomerModel } from "./index"

export const customerModel = z.object({
  id: z.string(),
  userId: z.string().nullish(),
  gender: z.nativeEnum(Gender).nullish(),
  smoking: z.nativeEnum(Smoking).nullish(),
  smoking_stop_month: z.number().int().nullish(),
  first_name: z.string().nullish(),
  last_name: z.string().nullish(),
  card_id: z.string().nullish(),
  phone: z.string().nullish(),
  email: z.string().nullish(),
  city: z.string().nullish(),
  street: z.string().nullish(),
  street_number: z.string().nullish(),
  apartment_number: z.string().nullish(),
  family_status: z.nativeEnum(FamilyStatus),
  birthDate: z.date().nullish(),
  occupation: z.string().nullish(),
  dangerous_hobby_has: z.boolean().nullish(),
  dangerous_hobby: z.string().nullish(),
  dangerous_hobby_desc: z.string().nullish(),
})

export interface Completecustomer extends z.infer<typeof customerModel> {
  userProfile?: CompleteUserProfile | null
  lifeInsuranceCustomer: CompletelifeInsuranceCustomer[]
}

/**
 * RelatedcustomerModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedcustomerModel: z.ZodSchema<Completecustomer> = z.lazy(() => customerModel.extend({
  userProfile: RelatedUserProfileModel.nullish(),
  lifeInsuranceCustomer: RelatedlifeInsuranceCustomerModel.array(),
}))
