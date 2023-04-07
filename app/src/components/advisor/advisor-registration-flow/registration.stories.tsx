import React from "react";
import { WizardTest } from "@/components/common/wizard/wizard-test";
import { AdvisorUpdatePages } from "@/components/advisor/advisor-registration-flow/advisor-registration-flow-schema";

const meta = {
  component: WizardTest,
};

export default meta;
const pages = AdvisorUpdatePages;

export const userNames = {
  ...WizardTest,
  args: { pages, step: "0-1" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-44794&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
export const knowTheAgent = {
  ...userNames,
  args: { pages, step: "0-2" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-45114&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
export const uploadIdPicture = {
  ...userNames,
  args: { pages, step: "0-3" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-45197&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
export const bankDetails = {
  ...userNames,
  args: { pages, step: "0-4" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-45349&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
export const agreeToTerms = {
  ...userNames,
  args: { pages, step: "0-5" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-45277&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
export const end = {
  ...userNames,
  args: { pages, step: "0-6" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-45590&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
