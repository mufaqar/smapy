import { t } from "../../../../.storybook/stories-utils";
import { useWizardFlow } from "@/components/common/wizard/useWizardFlow";
import { AdvisorUpdatePages } from "@/components/advisor/advisor-registration-flow/advisor-registration-flow-schema";
import { WizardPage } from "./WizardPage";
import { FormHeader } from "@/components/common/wizard/FormHeader";
import React from "react";
import { AdvisorLifeInsurancePages } from "@/components/advisor/advisor-life-insurance/advisor-life-insurance-schema";

const WizardTest = (args: any) => {
  const wizard = useWizardFlow(
    args.pages || AdvisorUpdatePages,
    {
      translate: t,
      onCompleteUrl: "/",
    },
    { step: args.step ? args.step - 1 : 0 }
  );

  const { onStepNext } = wizard;

  const handleSubmit = async (data: any) => {
    await onStepNext();
  };

  if (args.component === "FormHeader") {
    return <FormHeader {...wizard} />;
  } else {
    return (
      <WizardPage
        wizard={wizard}
        handleSubmit={handleSubmit}
        recordData={{}}
        formData={{}}
      />
    );
  }
};

const meta = {
  component: WizardTest,
};

export default meta;

export const Header = {
  ...WizardTest,
  args: { component: "FormHeader" },
};

export const Step1 = {
  ...WizardTest,
  args: { step: 1 },
};

export const Step2 = {
  ...WizardTest,
  args: { step: 2 },
};

export const Step3 = {
  ...WizardTest,
  args: { step: 3 },
};
export const Step4 = {
  ...WizardTest,
  args: { step: 4 },
};
export const Step5 = {
  ...WizardTest,
  args: { step: 5 },
};

export const Step6 = {
  ...WizardTest,
  args: { step: 6 },
};

export const LifeStep1 = {
  ...WizardTest,
  args: { pages: AdvisorLifeInsurancePages, step: 1 },
};

export const LifeStep2 = {
  ...LifeStep1,
  args: { step: 2 },
};
