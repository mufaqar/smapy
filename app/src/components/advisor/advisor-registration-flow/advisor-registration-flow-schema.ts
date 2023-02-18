import { z } from "zod";
import { schemaRegister } from "../../auth/advisor-auth-schema";
import { dsk } from "../../common/forms/zod-describe";

export const schemaStep0 = schemaRegister
  .pick({
    first_name: true,
    last_name: true,
  })
  .describe("schemaStep0");

export const schemaStep1 = z
  .object({
    years_experience: z.coerce
      .number()
      .min(0)
      .max(120)
      .default(0)
      .describe("Advisory years of experience // Years..."),

    worker_type: z.string().describe(
      dsk("Are you // PlaceHolder", {
        control: "RadioGroup",
        choices: [
          { id: "freelancer", title: "Freelancer" },
          { id: "hired", title: "Hired" },
        ],
      })
    ),

    workplace_name: z
      .string()
      .nullish()
      .describe("Name of workplace // Name..."),
    number_of_files: z.coerce
      .number()
      .min(0)
      .nullish()
      .default(0)
      .describe("Number of files a month (Optional) // Average..., "),
  })
  .describe("schemaStep1");

export const schemaStep2 = z
  .object({
    certificate_id_picture: z.string().nullish().describe("Upload ID Picture"),
    certificate_id_picture_later: z
      .boolean()
      .default(false)
      .describe("Will upload ID later"),
  })
  .refine(
    ({ certificate_id_picture, certificate_id_picture_later }) => {
      return certificate_id_picture || certificate_id_picture_later;
    },
    {
      message: "Upload or image or select to upload later",
      path: ["certificate_id_picture"],
    }
  )
  .describe("schemaStep2");

export const schemaStep3 = z
  .object({
    bank_name: z.string().nullish().default("").describe("Bank // Bank name"),
    bank_branch: z
      .string()
      .nullish()
      .default("")
      .describe("Branch // Branch..."),
    bank_number: z
      .string()
      .nullish()
      .default("")
      .describe("Bank Number // Bank Number..."),
    bank_branch_number: z
      .string()
      .nullish()
      .default("")
      .describe("Branch Number // Branch Number..."),
    bank_account: z
      .string()
      .nullish()
      .default("")
      .describe("Account Number // Account Number..."),
    bank_details_later: z
      .boolean()
      .default(false)
      .nullish()
      .describe("Will fill later"),
  })
  .describe("schemaStep3")
  .superRefine((arg, ctx) => {
    if (arg.bank_details_later) {
      return;
    }

    if (!arg.bank_name) {
      ctx.addIssue({
        code: "custom",
        message: "Bank name is required",
        path: ["bank_name"],
      });
    }

    if (!arg.bank_branch) {
      ctx.addIssue({
        code: "custom",
        message: "branch name is required",
        path: ["bank_branch"],
      });
    }

    if (!arg.bank_number) {
      ctx.addIssue({
        code: "custom",
        message: "Bank number is required",
        path: ["bank_number"],
      });
    }

    if (!arg.bank_branch_number) {
      ctx.addIssue({
        code: "custom",
        message: "Bank branch number is required",
        path: ["bank_branch_number"],
      });
    }

    if (!arg.bank_account) {
      ctx.addIssue({
        code: "custom",
        message: "Bank account is required",
        path: ["bank_account"],
      });
    }
  });

export const schemaStep4 = z
  .object({
    signed_terms: z
      .date({ invalid_type_error: "Must agree to terms" })
      .describe(dsk("Confirm terms", { control: "Checkbox" })),
  })
  .describe("schemaStep4");

const dummySchemaThanks = z.undefined().describe("WelcomeText");

export const AdvisorUpdateSchema = z.union([
  schemaRegister,
  schemaStep0,
  schemaStep1,
  schemaStep2,
  schemaStep3,
  schemaStep4,
  dummySchemaThanks,
]);
