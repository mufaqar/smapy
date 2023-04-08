import { z } from "zod";
import { formatPhoneNumber, validatePhoneNumber } from "../../utils/phone";
import { isIsraeliIdValid } from "../../utils/israeli-id-validator";
import { declareTranslationNS, dt } from "../../utils/i18n-utils";

declareTranslationNS("landing-page");

export type CustomerRole = "advisor" | "customer";

export const schemaLogin = z
  .object({
    // first_name: z.string().describe("First Name"),
    // last_name: z.string().describe("Last Name").default("Muly"),
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
  .describe("Happy to see you")
  .meta({
    text: {
      entry_customer: "Customer entry",
      entry_advisor: "Advisor entry",
    },
    name: "login",
  });

export const schemaOTP = z
  .object({
    pin: z.string().min(6).max(6).describe("What is your code"),
  })
  .describe(
    "Confirmation and continue // Sent you confirmation code in SMS message "
  )
  .meta({
    text: {
      entry_customer: "Customer entry",
      entry_advisor: "Advisor entry",
    },
    name: "otp",
  });
