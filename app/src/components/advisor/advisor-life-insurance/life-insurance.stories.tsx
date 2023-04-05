import React from "react";
import { AdvisorLifeInsurancePages } from "@/components/advisor/advisor-life-insurance/advisor-life-insurance-schema";
import { WizardTest } from "@/components/common/wizard/wizard-test";

const meta = {
  component: WizardTest,
};

export default meta;
const pages = AdvisorLifeInsurancePages;

export const howDoesItWork = {
  ...WizardTest,
  args: { pages, step: "0-1" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-39449&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};

export const numberOfCustomers = {
  ...howDoesItWork,
  args: { pages, step: "1-1" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-38623&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
export const customer0_details1 = {
  ...howDoesItWork,
  args: { pages, step: "1-2" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-38703&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};

export const customer0_details2 = {
  ...howDoesItWork,
  args: { pages, step: "1-3" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-38771&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
export const customer1_details1 = {
  ...howDoesItWork,
  args: { pages, step: "1-4" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-40220&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
export const customer1_details2 = {
  ...howDoesItWork,
  args: { pages, step: "1-5" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-40445&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};

export const loanDetailsIntro = {
  ...howDoesItWork,
  args: { pages, step: "1-6" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-38862&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};

export const loanTracksCount = {
  ...howDoesItWork,
  args: { pages, step: "1-7" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-40071&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
export const track0 = {
  ...howDoesItWork,
  args: { pages, step: "1-8" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-40071&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
export const customer0_moreDetails = {
  ...howDoesItWork,
  args: { pages, step: "3-1" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-39061&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
export const customer1_moreDetails = {
  ...howDoesItWork,
  args: { pages, step: "3-2" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-41496&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
export const mortgagePropertyAddress = {
  ...howDoesItWork,
  args: { pages, step: "3-3" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-39449&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
export const insuranceDetails = {
  ...howDoesItWork,
  args: { pages, step: "3-4" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-40851&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
export const sendLinksToComplete = {
  ...howDoesItWork,
  args: { pages, step: "4-1" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-39188&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
export const end = {
  ...howDoesItWork,
  args: { pages, step: "4-2" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-39808&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
