import { z } from "zod";
import { HowDoesItWork } from "../../common/controls/how-does-it-work";
import type { WizardPagesDefinition } from "@/components/common/wizard/useWizardFlow";
import { WizardEndStep } from "@/components/common/controls/wizard-end-step";

export type ProductType = "life" | "mortgage" | "property";

const howDoesItWork = z
  .undefined()
  .describe("How Does It Work?")
  .meta({
    control: (wizard) => (
      <HowDoesItWork
        product={wizard.props?.product as ProductType}
        {...wizard}
      />
    ),
    text: {
      text_1: "text_1",
      text_2: "text_2",
      text_3: "text_3",
      text_life4: "text_life4",
      text_mortgage4: "text_mortgage4",
      text_property4: "text_property4",
      next: "Compare",
    },
  });

const end = z
  .undefined()
  .describe(
    "Thanks for your interest in Smapy // Right now the service is available only through agents"
  )
  .meta({
    control: (wizard) => <WizardEndStep {...wizard} />,
    text: {
      text1: "Soon will be able to buy from the site",
      text2: "You will enjoy great service",
    },
    // props: { header: false },
  });

export const compareFlowPages = {
  pages: {
    howDoesItWork,
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
  ns: "customer",
} satisfies WizardPagesDefinition;
