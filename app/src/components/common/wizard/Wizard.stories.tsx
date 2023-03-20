import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Form } from "@/components/common/forms/Form";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";
import { t } from "../../../../.storybook/stories-utils";
import { z } from "zod";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import {
  contactUsEmailPages,
  contactUsPhonePages,
  HowToContactType,
} from "@/components/customer/contact-us/contact-us-schema";
import { useWizardFlow } from "@/components/common/wizard/useWizardFlow";
import { api } from "@/utils/api";
import { AdvisorUpdatePages } from "@/components/advisor/advisor-registration-flow/advisor-registration-flow-schema";

const WizardTest = (args: any) => {
  const wizard = useWizardFlow(AdvisorUpdatePages, {
    translate: t,
    onCompleteUrl: "/",
  });

  const { onStepNext } = wizard;

  const handleSubmit = async (data: any) => {
    await onStepNext();
  };

  return (
    <WizardPage
      wizard={wizard}
      handleSubmit={handleSubmit}
      recordData={{}}
      formData={{}}
    />
  );
};

export default {
  title: "Wizard",
  component: WizardTest,
} as ComponentMeta<typeof WizardTest>;

const Template: ComponentStory<typeof WizardTest> = (args) => (
  <WizardTest {...args} />
);

export const WizardPage = Template.bind({});
WizardPage.args = {};
