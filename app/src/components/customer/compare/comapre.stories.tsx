import React from "react";
import { AdvisorLifeInsurancePages } from "@/components/advisor/advisor-life-insurance/advisor-life-insurance-schema";
import { WizardTest } from "@/components/common/wizard/Wizard.stories";
import { compareFlowPages } from "@/components/customer/compare/compare-flow-schema";

const meta = {
  component: WizardTest,
};

export default meta;
const pages = compareFlowPages;

export const howDoesItWork = { ...WizardTest, args: { pages, step: 1 } };
export const end = { ...howDoesItWork, args: { pages, step: 2 } };
