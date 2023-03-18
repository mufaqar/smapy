import { z } from "zod";
import "../../../utils/zod-meta";
import type { WizardPagesDefinition } from "../../common/wizard/useWizardFlow";
import { WizardEndStep } from "@/components/common/controls/wizard-end-step";

export const userNames = z
  .object({
    first_name: z.string().describe("First Name"),
    last_name: z.string().describe("Last Name"),
    notes: z.string().nullish().describe("Note").meta({ control: "Textarea" }),
  })
  .describe("Happy you arrived!");

const end = z
  .undefined()
  .describe("Thanks for join the Smapy // really excited")
  .meta({
    control: (wizard) => <WizardEndStep {...wizard} />,
    text: {
      text2: "Will do everything to give you excelent service",
    },
  });

export const CustomerUpdateSchema = userNames; //z.union([
//   userNames,
// ]);

export const CustomerUpdatePages = {
  pages: {
    userNames,
    end,
  },
  description: "Registration",
  name: "registrationFlow",
} satisfies WizardPagesDefinition;
