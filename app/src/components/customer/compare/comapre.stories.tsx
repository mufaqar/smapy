import React from "react";
import { WizardTest } from "@/components/common/wizard/wizard-test";
import { compareFlowPages } from "@/components/customer/compare/compare-flow-schema";

const meta = {
  component: WizardTest,
};

export default meta;
const pages = compareFlowPages;

export const howDoesItWork = {
  ...WizardTest,
  args: { pages, step: 1 },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=820-2339&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};

export const end = {
  ...howDoesItWork,
  args: { pages, step: 2 },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=934-3240&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
