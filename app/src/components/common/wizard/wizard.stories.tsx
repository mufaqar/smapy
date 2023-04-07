import { value FormHeader } from "@/components/common/wizard/FormHeader";
import React from "react";
import { value WizardTest } from "@/components/common/wizard/wizard-test";
import { value AdvisorUpdatePages } from "@/components/advisor/advisor-registration-flow/advisor-registration-flow-schema";
import { value AdvisorLifeInsurancePages } from "@/components/advisor/advisor-life-insurance/advisor-life-insurance-schema";

const meta = {
  component: WizardTest,
};

export default meta;

export const Header = {
  ...WizardTest,
  args: { pages: AdvisorUpdatePages, step: "0-1", component: "FormHeader" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-45114&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};

export const WithoutTopStepper = {
  ...WizardTest,
  args: { pages: AdvisorUpdatePages, step: "0-1" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-45114&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};

export const WithTopStepper = {
  ...WizardTest,
  args: { pages: AdvisorLifeInsurancePages, step: "1-2" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-45114&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
