import React from "react";
import { WizardTest } from "@/components/common/wizard/wizard-test";
import {
  value contactUsEmailPages,
  value contactUsPhonePages,
} from "@/components/customer/contact-us/contact-us-schema";

const meta = {
  component: WizardTest,
};

export default meta;
const pages = contactUsEmailPages;

export const contactDetailsEmail = {
  ...WizardTest,
  args: { pages, step: "0-1" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=901-2875&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
export const contactDetailsPhone = {
  ...WizardTest,
  args: { pages: contactUsPhonePages, step: "0-1" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=901-2806&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
export const end = {
  ...contactDetailsEmail,
  args: { pages, step: "0-2" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=901-3028&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
