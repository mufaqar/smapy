import React from "react";
import { AdvisorLifeInsurancePages } from "@/components/advisor/advisor-life-insurance/advisor-life-insurance-schema";
import { WizardTest } from "@/components/common/wizard/Wizard.stories";
import { compareFlowPages } from "@/components/customer/compare/compare-flow-schema";
import {
  contactUsEmailPages,
  contactUsPhonePages,
} from "@/components/customer/contact-us/contact-us-schema";
import { CustomerUpdatePages } from "@/components/customer/customer-registration-flow/customer-registration-flow-schema";

const meta = {
  component: WizardTest,
};

export default meta;
const pages = CustomerUpdatePages;

export const userNames = { ...WizardTest, args: { pages, step: 1 } };
export const end = { ...userNames, args: { pages, step: 2 } };
