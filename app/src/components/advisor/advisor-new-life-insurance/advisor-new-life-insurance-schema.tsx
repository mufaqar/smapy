import { z } from "zod";
import { WelcomePage } from "./WelcomePage";
import type { WizardControlProps } from "../../common/wizard/useWizardFlow";

const dummySchemaWelcome = z
  .undefined()
  .describe("welcomePage")
  .meta({
    name: "dummySchemaWelcome",
    control: (props: WizardControlProps) => <WelcomePage {...props} />,
  });

const numberOfPersons = z.object({
  number_of_persons: z.coerce
    .number()
    .default(1)
    .describe("How many persons")
    .meta({
      control: "RadioGroup",
      choices: [
        { id: 1, title: "One" },
        { id: 2, title: "Two" },
      ],
    }),
});

const newInsuranceThanksPage = z
  .undefined()
  .describe("newInsuranceThanksPage")
  .meta({
    name: "newInsuranceThanksPage",
    control: (props: WizardControlProps) => <WelcomePage {...props} />,
  });

export const AdvisorNewLifeInsuranceSchema = z
  .union([dummySchemaWelcome, numberOfPersons, newInsuranceThanksPage])
  .describe("New Life Insurance for Mortgage")
  .meta({
    name: "AdvisorNewLifeInsuranceSchema",
  });
