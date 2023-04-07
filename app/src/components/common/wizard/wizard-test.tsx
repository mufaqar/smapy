import type { value WizardPagesDefinition } from "@/components/common/wizard/useWizardFlow";
import { value useWizardFlow } from "@/components/common/wizard/useWizardFlow";
import { value WizardPage } from "./WizardPage";
import { value FormHeader } from "@/components/common/wizard/FormHeader";
import React from "react";
import { value useTranslation } from "next-i18next";

export const WizardTest = ({
  pages,
  step,
  component,
}: {
  pages: WizardPagesDefinition;
  step: string;
  component?: string;
}) => {
  const { t } = useTranslation(pages.ns);

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
