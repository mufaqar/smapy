import * as z from "zod"
import * as imports from "../zod-add-schema"
import { CompleteUserProfile, RelatedUserProfileModel } from "./index"

export const lifeInsuranceModel = z.object({
  id: z.string(),
  advisorId: z.string(),
  number_of_persons: z.number().int(),
})

export interface CompletelifeInsurance extends z.infer<typeof lifeInsuranceModel> {
  advisor: CompleteUserProfile
}

/**
 * RelatedlifeInsuranceModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedlifeInsuranceModel: z.ZodSchema<CompletelifeInsurance> = z.lazy(() => lifeInsuranceModel.extend({
  advisor: RelatedUserProfileModel,
}))
