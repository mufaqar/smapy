import { z } from "zod";
import "../../../utils/zod-meta";
import type { WizardPagesDefinition } from "../../common/wizard/useWizardFlow";
import { WizardEndStep } from "@/components/common/controls/wizard-end-step";
import { Terms } from "./terms";

export const userNames = z
  .object({
    first_name: z.string().describe("First Name"),
    last_name: z.string().describe("Last Name"),
  })
  .describe("Advisor details")
  .meta({ stepInfo: { sub: "Personal details" } });

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
  )
  .meta({ stepInfo: { sub: "Know You" } });

export const uploadIdPicture = z
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
  .describe("Identification")
  .meta({ stepInfo: { sub: "Identify" } });

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
        className: "col-span-2",
      }),
  })
  .describe("Where to deposit your money?")
  .meta({
    className: "gap-6 grid grid-cols-[2fr_1fr]",
    props: {
      image: "/images/advisor-register-bank.svg",
    },
  })
  .superRefine((arg, ctx) => {
    console.log(`muly:superRefine `, { arg });
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
  })
  .meta({ stepInfo: { sub: "Bank Details" } });

export const agreeToTerms = z
  .object({
    signed_terms: z
      .date({ invalid_type_error: "Must agree to terms" })
      .describe("Confirm terms")
      .meta({ control: "Checkbox", beforeElement: () => <Terms /> }),
  })
  .describe("Terms")
  .meta({ stepInfo: { sub: "Terms" } });

const end = z
  .undefined()
  .describe("Thanks for join the Smapy // really excited")
  .meta({
    control: (wizard) => <WizardEndStep {...wizard} />,
    text: {
      text2: "Will do everything to give service to you and your customers",
    },
    stepInfo: { sub: "End" },
  });

export const AdvisorUpdateSchema = z.union([
  userNames,
  knowTheAgent,
  uploadIdPicture,
  bankDetails,
  agreeToTerms,
]);

export const AdvisorUpdatePages = {
  pages: {
    userNames,
    knowTheAgent,
    uploadIdPicture,
    bankDetails,
    agreeToTerms,
    end,
  },
  description: "Registration",
  name: "registrationFlow",
} satisfies WizardPagesDefinition;
