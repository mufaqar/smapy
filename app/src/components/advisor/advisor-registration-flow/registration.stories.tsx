import React from "react";
import { AdvisorLifeInsurancePages } from "@/components/advisor/advisor-life-insurance/advisor-life-insurance-schema";
import { WizardTest } from "@/components/common/wizard/Wizard.stories";
import { AdvisorUpdatePages } from "@/components/advisor/advisor-registration-flow/advisor-registration-flow-schema";

const meta = {
  component: WizardTest,
};

export default meta;
const pages = AdvisorUpdatePages;

export const userNames = { ...WizardTest, args: { pages, step: 1 } };
export const knowTheAgent = { ...userNames, args: { pages, step: 2 } };
export const uploadIdPicture = {
  ...userNames,
  args: { pages, step: 3 },
};
export const bankDetails = {
  ...userNames,
  args: { pages, step: 4 },
};
export const agreeToTerms = {
  ...userNames,
  args: { pages, step: 5 },
};
export const end = {
  ...userNames,
  args: { pages, step: 6 },
};
