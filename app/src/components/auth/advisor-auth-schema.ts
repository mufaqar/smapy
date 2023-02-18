import { z } from "zod";
import { formatPhoneNumber, validatePhoneNumber } from "../../utils/phone";
import { isIsraeliIdValid } from "../../utils/israeli-id-validator";

export const schemaRegister = z
  .object({
    first_name: z.string().describe("First Name"),
    last_name: z.string().describe("Last Name").default("Muly"),
    id_card_number: z
      .string()
      .refine((val) => isIsraeliIdValid(val), "Not valid israeli id number")
      .describe("ID Card Number"),
    phone: z
      .string()
      .refine(
        (val) => !validatePhoneNumber(val).error,
        "Not a valid phone number"
      )
      .transform((val) => formatPhoneNumber(val) || "")
      .describe("Phone Number"),
  })
  .describe("schemaRegister");

export const schemaSignin = schemaRegister.pick({
  id_card_number: true,
  phone: true,
});
