import { t } from "../../../../.storybook/stories-utils";
import type { WizardPagesDefinition } from "@/components/common/wizard/useWizardFlow";
import { useWizardFlow } from "@/components/common/wizard/useWizardFlow";
import { AdvisorUpdatePages } from "@/components/advisor/advisor-registration-flow/advisor-registration-flow-schema";
import { WizardPage } from "./WizardPage";
import { FormHeader } from "@/components/common/wizard/FormHeader";
import React from "react";
import { AdvisorLifeInsurancePages } from "@/components/advisor/advisor-life-insurance/advisor-life-insurance-schema";

export const WizardTest = ({
  pages,
  step,
  component,
}: {
  pages: WizardPagesDefinition;
  step: string;
  component?: string;
}) => {
  const wizard = useWizardFlow(
    pages,
    {
      translate: t,
      onCompleteUrl: "/",
    },
    { step }
  );

  const { onStepNext } = wizard;

  const handleSubmit = async (data: any) => {
    await onStepNext();
  };

  if (component === "FormHeader") {
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
