import { z } from "zod";
import { HowDoesItWork } from "../../common/controls/how-does-it-work";
import { WizardPagesDefinition } from "@/components/common/wizard/useWizardFlow";
import { WizardEndStep } from "@/components/common/controls/wizard-end-step";

export type HowToContactType = "whatsapp" | "phone" | "email";

const contactDetails = z.object({
  full_name: z.string().describe("Full name"),
  phone: z
    .string()
    .describe("Phone")
    .meta({ condition: ({ meta }) => true }),
  email: z
    .string()
    .email()
    .describe("Email")
    .meta({ condition: ({ meta }) => true }),
  subject: z
    .string()
    .nullish()
    .describe("Message")
    .meta({ control: "Textarea" }),
});

const end = z
  .undefined()
  .describe("Thanks for choosing Smapy // Thanks")
  .meta({
    control: (wizard) => <WizardEndStep {...wizard} />,
    text: {
      text1: "Will contact you soon",
      text2: "You will enjoy great service",
    },
  });

export const compareFlowPages = {
  pages: {
    contactDetails,
    end,
  },
  description: (wizard) => {
    return wizard.meta.text && wizard.props?.product
      ? wizard.meta.text[`title_${wizard.props.product as string}`]
      : "";
  },

  text: {
    title_life: "Compare and buy Life Insurance",
    title_mortgage: "Compare and buy Mortgage Insurance",
    title_property: "Compare and buy property Insurance",
  },
  name: "customerCompareAndBuy",
} satisfies WizardPagesDefinition;
