import React from "react";
import { AdvisorLifeInsurancePages } from "@/components/advisor/advisor-life-insurance/advisor-life-insurance-schema";
import { WizardTest } from "@/components/common/wizard/Wizard.stories";

const meta = {
  component: WizardTest,
};

export default meta;
const pages = AdvisorLifeInsurancePages;

export const howDoesItWork = { ...WizardTest, args: { pages, step: 1 } };
export const numberOfCustomers = { ...howDoesItWork, args: { pages, step: 2 } };
export const customer0_details1 = {
  ...howDoesItWork,
  args: { pages, step: 3 },
};
export const customer0_details2 = {
  ...howDoesItWork,
  args: { pages, step: 4 },
};
export const customer1_details1 = {
  ...howDoesItWork,
  args: { pages, step: 5 },
};
export const customer1_details2 = {
  ...howDoesItWork,
  args: { pages, step: 6 },
};
export const loanTracksCount = { ...howDoesItWork, args: { pages, step: 7 } };
export const track0 = { ...howDoesItWork, args: { pages, step: 8 } };
export const customer0_moreDetails = {
  ...howDoesItWork,
  args: { pages, step: 17 },
};
export const customer1_moreDetails = {
  ...howDoesItWork,
  args: { pages, step: 18 },
};
export const mortgagePropertyAddress = {
  ...howDoesItWork,
  args: { pages, step: 19 },
};
export const insuranceDetails = { ...howDoesItWork, args: { pages, step: 20 } };
export const sendLinksToComplete = {
  ...howDoesItWork,
  args: { pages, step: 21 },
};
export const end = { ...howDoesItWork, args: { pages, step: 22 } };
