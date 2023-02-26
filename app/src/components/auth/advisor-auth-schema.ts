import { z } from "zod";
import { formatPhoneNumber, validatePhoneNumber } from "../../utils/phone";
import { isIsraeliIdValid } from "../../utils/israeli-id-validator";
import { declareTranslationNS, dt } from "../../utils/i18n-utils";

declareTranslationNS("advisor");

export const schemaRegister = z
  .object({
    first_name: z.string().describe("First Name"),
    last_name: z.string().describe("Last Name").default("Muly"),
    id_card_number: z
      .string()
      .refine(
        (val) => isIsraeliIdValid(val),
        dt("register.id_card_number.validation", "Not valid israeli id number")
      )
      .describe("ID Card Number"),
    phone: z
      .string()
      .refine(
        (val) => !validatePhoneNumber(val).error,
        dt("register.phone.validation", "Not a valid phone number")
      )
      .transform((val) => formatPhoneNumber(val) || "")
      .describe("Phone Number"),
  })
  .describe("schemaRegister")
  .meta({ name: "register" });

export const schemaSignin = schemaRegister.pick({
  id_card_number: true,
  phone: true,
});
