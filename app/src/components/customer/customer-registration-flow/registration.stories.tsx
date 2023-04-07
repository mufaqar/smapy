import React from "react";
import { WizardTest } from "@/components/common/wizard/wizard-test";
import { CustomerUpdatePages } from "@/components/customer/customer-registration-flow/customer-registration-flow-schema";

const meta = {
  component: WizardTest,
};

export default meta;
const pages = CustomerUpdatePages;

export const userNames = {
  ...WizardTest,
  args: { pages, step: "0-1" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-27563&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
export const end = {
  ...userNames,
  args: { pages, step: "0-2" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-45114&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
