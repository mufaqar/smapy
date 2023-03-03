import { z } from "zod";
import { schemaRegister } from "../../auth/advisor-auth-schema";
import "../../../utils/zod-meta";
import { WelcomeText } from "./WelcomeText";
import type { WizardPagesDefinition } from "../../common/wizard/useWizardFlow";

export const missingName = schemaRegister
  .pick({
    first_name: true,
    last_name: true,
  })
  .describe("Complete missing details");

export const knowTheAgent = z
  .object({
    years_experience: z.coerce
      .number()
      .min(0)
      .max(120)
      .default(0)
      .describe("Advisory years of experience // Years..."),

    worker_type: z
      .string()
      .describe("Are you")
      .meta({
        control: "RadioGroup",
        choices: [
          { id: "freelancer", title: "Freelancer" },
          { id: "hired", title: "Hired" },
        ],
      }),
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
  .describe(
    "Partnership start with a good recognition // Some of your experience"
  );

export const uploadIdPicture = z
  .object({
    certificate_id_picture: z.string().nullish().meta("Upload ID Picture"),
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
  .describe("Identification");

export const bankDetails = z
  .object({
    bank_name: z.string().nullish().default("").describe("Bank // Bank name"),
    bank_number: z
      .string()
      .nullish()
      .default("")
      .describe("Bank Number // Bank Number..."),
    bank_branch: z
      .string()
      .nullish()
      .default("")
      .describe("Branch // Branch..."),
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
      .describe("Will fill later")
      .meta({
        style: {
          gridColumn: "1/3",
          textAlign: "center",
          mt: 8,
        },
      }),
  })
  .describe("Where to deposit your money?")
  .meta({
    style: {
      templateColumns: "2fr 1fr",
      gap: 6,
    },
    props: {
      image: "/images/advisor-register-bank.svg",
    },
  })
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

    // if (!arg.bank_number) {
    //   ctx.addIssue({
    //     code: "custom",
    //     message: "Bank number is required",
    //     path: ["bank_number"],
    //   });
    // }

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

export const agreeToTerms = z
  .object({
    signed_terms: z
      .date({ invalid_type_error: "Must agree to terms" })
      .describe("Confirm terms")
      .meta({ control: "Checkbox", before: "Terms" }),
  })
  .describe("Terms");

const registrationThanksPage = z
  .undefined()
  .describe("registrationThanksPage")
  .meta({
    control: (props) => <WelcomeText />,
  });

export const AdvisorUpdateSchema = z.union([
  missingName,
  knowTheAgent,
  uploadIdPicture,
  bankDetails,
  agreeToTerms,
  registrationThanksPage,
]);

export const AdvisorUpdatePages = {
  pages: {
    missingName,
    knowTheAgent,
    uploadIdPicture,
    bankDetails,
    agreeToTerms,
    registrationThanksPage,
  },
  description: "Registration",
  name: "AdvisorRegistrationFlow",
} satisfies WizardPagesDefinition;
