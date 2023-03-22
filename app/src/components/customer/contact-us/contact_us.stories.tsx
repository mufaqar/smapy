import React from "react";
import { AdvisorLifeInsurancePages } from "@/components/advisor/advisor-life-insurance/advisor-life-insurance-schema";
import { WizardTest } from "@/components/common/wizard/Wizard.stories";
import { compareFlowPages } from "@/components/customer/compare/compare-flow-schema";
import {
  contactUsEmailPages,
  contactUsPhonePages,
} from "@/components/customer/contact-us/contact-us-schema";

const meta = {
  component: WizardTest,
};

export default meta;
const pages = contactUsEmailPages;

export const contactDetailsEmail = { ...WizardTest, args: { pages, step: 1 } };
export const contactDetailsPhone = {
  ...WizardTest,
  args: { pages: contactUsPhonePages, step: 1 },
};
export const end = { ...contactDetailsEmail, args: { pages, step: 2 } };
