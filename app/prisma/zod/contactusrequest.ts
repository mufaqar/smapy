import * as z from "zod"
import * as imports from "../zod-add-schema"

export const contactUsRequestModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  product: z.string().nullish(),
  name: z.string().nullish(),
  subject: z.string().nullish(),
  contact_info: z.string(),
})
