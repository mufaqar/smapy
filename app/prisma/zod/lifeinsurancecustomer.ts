import * as z from "zod"
import * as imports from "../zod-add-schema"
import { CompletelifeInsurance, RelatedlifeInsuranceModel, Completecustomer, RelatedcustomerModel } from "./index"

export const lifeInsuranceCustomerModel = z.object({
  lifeInsuranceId: z.string(),
  customerId: z.string(),
  sort: z.number().int(),
})

export interface CompletelifeInsuranceCustomer extends z.infer<typeof lifeInsuranceCustomerModel> {
  lifeInsurance: CompletelifeInsurance
  customer: Completecustomer
}

/**
 * RelatedlifeInsuranceCustomerModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedlifeInsuranceCustomerModel: z.ZodSchema<CompletelifeInsuranceCustomer> = z.lazy(() => lifeInsuranceCustomerModel.extend({
  lifeInsurance: RelatedlifeInsuranceModel,
  customer: RelatedcustomerModel,
}))
