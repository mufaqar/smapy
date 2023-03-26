import { FormHeader } from "@/components/common/wizard/FormHeader";
import React from "react";
import { WizardTest } from "@/components/common/wizard/wizard-test";

const meta = {
  component: WizardTest,
};

export default meta;

export const Header = {
  ...WizardTest,
  args: { component: "FormHeader" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-45114&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};

export const Step1 = {
  ...WizardTest,
  args: { step: 2 },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-45114&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
