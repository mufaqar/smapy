import { t } from "../../../../.storybook/stories-utils";
import { useWizardFlow } from "@/components/common/wizard/useWizardFlow";
import { AdvisorUpdatePages } from "@/components/advisor/advisor-registration-flow/advisor-registration-flow-schema";
import { WizardPage } from "./WizardPage";
import { FormHeader } from "@/components/common/wizard/FormHeader";
import React from "react";
import { AdvisorLifeInsurancePages } from "@/components/advisor/advisor-life-insurance/advisor-life-insurance-schema";

export const WizardTest = (args: any) => {
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
