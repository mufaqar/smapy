import { z } from "zod";
import { WelcomePage } from "./welcome-page";
import type {
  WizardControlProps,
  WizardPagesDefinition,
} from "../../common/wizard/useWizardFlow";
import { customerModel } from "../../../../prisma/zod";
import { range } from "rambda";
import { LoanTrack } from "../../../../prisma/zod-add-schema";
import { MortgageSummary } from "./mortgage-summary";
import type { ConditionCallback } from "../../../utils/zod-meta";
import { dt } from "../../../utils/i18n-utils";
import { HowDoesItWork } from "@/components/common/controls/how-does-it-work";
import { WizardEndStep } from "@/components/common/controls/wizard-end-step";
import { WizardEndQuestion } from "./wizard-end-question";
import { SendLinksHeader } from "@/components/advisor/advisor-life-insurance/send-links-header";

const howDoesItWork = z
  .undefined()
  .describe("How Does It Work?")
  .meta({
    control: (wizard) => <HowDoesItWork product={"life"} {...wizard} />,
    stepInfo: "none",
    text: {
      text_1: "text_1",
      text_2: "text_2",
      text_3: "text_3",
      text_life4: "text_life4",
      text_mortgage4: "text_mortgage4",
      text_property4: "text_property4",
      next: "Compare",
    },
  });

const numberOfCustomers = z
  .object({
    number_of_customers: z.coerce
      .number()
      .default(1)
      .describe("How many customers")
      .meta({
        control: "RadioGroup",
        choices: [
          { id: 1, title: "One" },
          { id: 2, title: "Two" },
        ],
      }),
  })
  .describe("Choose number of customers")
  .meta({
    stepInfo: {
      name: "Initial details",
      sub: "Persons",
    },
  });

const customerPageCondition: ConditionCallback = (wizardInfo, data) => {
  const regexCustomer = /customer(\d)/gm;
  const matchCustomer = regexCustomer.exec(wizardInfo.step.name);
  const idxCustomer = matchCustomer ? Number(matchCustomer[1]) : 0;

  // console.log(`muly:condition`, { step, data, idxCustomer });
  return idxCustomer < data?.number_of_customers;
};

const customerDetails1 = z
  .object({
    gender: customerModel.shape.gender.describe("Gender").meta({
      control: "RadioGroup",
      choices: [
        { id: "male", title: "Male" },
        { id: "female", title: "Female" },
      ],
    }),

    smoking: customerModel.shape.smoking.describe("Smoked last 2 years?").meta({
      control: "RadioGroup",
      choices: [
        { id: "yes", title: "Yes" },
        { id: "no", title: "No" },
        { id: "stop", title: "Stop Last 2 Years" },
      ],
    }),

    smoking_stop_month: z.coerce
      .number()
      .nullish()
      .describe("How long ago you stop?")
      .meta({ condition: (_wizardInfo, { smoking }) => smoking === "stop" }),

    first_name: z.string().describe("First name"),
    last_name: z.string().describe("First name"),

    family_status: customerModel.shape.family_status
      .describe("Family Status")
      .meta({
        choices: [
          { id: "Single", title: "Single" },
          { id: "Married", title: "Married" },
          { id: "Divorced", title: "Divorced" },
          { id: "Separated", title: "Separated" },
          { id: "Widowed", title: "Widowed" },
        ],
      }),

    birthDate: z
      .date()
      .default(() => new Date())
      .describe("Date of birth"),
  })
  .refine(
    (value) => {
      console.log(`muly:refine:smoking_stop_month_validation`, { value });
      return value.smoking !== "stop" || value.smoking_stop_month || 0 > 0;
    },
    {
      path: ["smoking_stop_month"],
      message: dt(
        "smoking_stop_month_validation",
        "Please select how many month ago stopped to smoke"
      ),
    }
  )
  .describe("Personal Details")
  .meta({
    condition: customerPageCondition,
    props: { translationKey: "customerDetails1" },
    stepInfo: {
      sub: "Personal details",
    },
  });

const customerDetails2 = z
  .object({
    occupation: z.string().describe("Customer occupation"),
    dangerous_hobby_has: z.coerce
      .boolean()
      .describe("Customer has dangerous hobby?")
      .meta({
        control: "RadioGroup",
        choices: [
          { id: 1, title: "Yes" },
          { id: 0, title: "No" },
        ],
      }),
    dangerous_hobby: z
      .string()
      .nullish()
      .describe("Hobby")
      .meta({
        condition: (_wizardInfo, { dangerous_hobby_has }) =>
          !!dangerous_hobby_has,
      }),
    dangerous_hobby_desc: z
      .string()
      .nullish()
      .describe("Hobby Description")
      .meta({
        condition: (_wizardInfo, { dangerous_hobby_has }) =>
          !!dangerous_hobby_has,
      }),
  })
  .refine(
    (value) => {
      return !value.dangerous_hobby_has || value.dangerous_hobby;
    },
    {
      path: ["dangerous_hobby"],
      message: dt("dangerous_hobby_validation", "Please fill dangerous hobby"),
    }
  )
  .describe("General Details")
  .meta({
    condition: customerPageCondition,
    props: { translationKey: "customerDetails2" },
    stepInfo: {
      sub: "General details",
    },
  });

const loanDetailsIntro = z
  .undefined()
  .describe("loanDetailsIntro")
  .meta({
    name: "loanDetailsIntro",
    control: (props: WizardControlProps) => <WelcomePage {...props} />,
    stepInfo: {
      sub: "Loan details",
    },
  });

const loanTracksCount = z
  .object({
    loan_tracks_count: z.coerce
      .number()
      .min(1)
      .max(10)
      .describe("How many mortgage path?")
      .meta({
        choices: range(1, 9).map((idx) => ({ id: idx, title: `${idx}` })),
      }),
  })
  .describe("Select mortgage track count")
  .meta({
    stepInfo: {
      sub: "Loan details",
    },
  });

const loanTracks = z
  .object({
    balance: z.coerce.number().min(0).describe("Balance"),
    endDate: z
      .date()
      .default(() => new Date())
      .describe("Loan end Date"),
    interest_rate: z.coerce.number().describe("Interest percentage"),
    interest_type: LoanTrack.shape.interest_type
      .describe("Interest Type")
      .meta({ control: "RadioGroup" }),
    linkage_type: LoanTrack.shape.linkage_type
      .describe("Linkage Type")
      .meta({ control: "RadioGroup" }),
    loan_type: LoanTrack.shape.loan_type
      .describe("Loan Type")
      .meta({ control: "RadioGroup" }),
  })
  .describe("Mortgage track details")
  .meta({
    condition: (wizardInfo, data) => {
      const regexTrack = /track(\d)/gm;
      const matchTrack = regexTrack.exec(wizardInfo.step.name);
      const idxTrack = matchTrack ? Number(matchTrack[1]) : 0;

      // console.log(`muly:condition`, { step, data, idxTrack });
      return idxTrack < data?.loan_tracks_count;
    },
    props: { translationKey: "loanTracks" },
    stepInfo: {
      sub: "Loan details",
    },
  });

const mortgageSummary = z
  .undefined()
  .describe("mortgageSummary")
  .describe("Results")
  .meta({
    control: (props: WizardControlProps) => <MortgageSummary {...props} />,
    stepInfo: {
      name: "Receiver Offers",
      sub: "Receiver Offers",
    },
  });

const customerMoreDetails = z
  .object({
    first_name: z.string().describe("First name"),
    last_name: z.string().describe("First name"),
    card_id: z.string().describe("Card ID"),
    phone: z.string().describe("Phone"),
    email: z.string().email().describe("Email"),

    city: z.string().describe("City name"),
    street: z.string().describe("Street"),
    street_number: z.string().describe("Street Number"),
    apartment_number: z.string().describe("Apartment Number"),
  })
  .describe("Complete Personal Details")
  .meta({
    condition: customerPageCondition,
    props: { translationKey: "customerMoreDetails" },
    stepInfo: {
      name: "Complete Details",
      sub: "Complete Personal Details",
    },
  });

const sameAddress: ConditionCallback = (step, { same_address_mortgage }) =>
  !same_address_mortgage;

const mortgagePropertyAddress = z
  .object({
    same_address_mortgage: z.coerce
      .boolean()
      .describe("Same address for mortgage property?"),
    property_city: z
      .string()
      .nullish()
      .describe("City name")
      .meta({ condition: sameAddress }),
    property_street: z
      .string()
      .nullish()
      .describe("Street")
      .meta({ condition: sameAddress }),
    property_street_number: z
      .string()
      .nullish()
      .describe("Street Number")
      .meta({ condition: sameAddress }),
    property_apartment_number: z
      .string()
      .nullish()
      .describe("Apartment Number")
      .meta({ condition: sameAddress }),
  })
  .meta({
    condition: (step, { same_address_mortgage }) => !same_address_mortgage,
  })
  .refine(
    ({ same_address_mortgage, property_city }) =>
      same_address_mortgage || property_city,
    {
      path: ["property_city"],
      message: dt("property_city_validation", "Required"),
    }
  )
  .refine(
    ({ same_address_mortgage, property_street }) =>
      same_address_mortgage || property_street,
    {
      path: ["property_street"],
      message: dt("property_street_validation", "Required"),
    }
  )
  .refine(
    ({ same_address_mortgage, property_street_number }) =>
      same_address_mortgage || property_street_number,
    {
      path: ["property_street_number"],
      message: dt("property_street_number_validation", "Required"),
    }
  )
  .refine(
    ({ same_address_mortgage, property_apartment_number }) =>
      same_address_mortgage || property_apartment_number,
    {
      path: ["property_apartment_number"],
      message: dt("property_apartment_number_validation", "Required"),
    }
  )
  .describe("Property Address")
  .meta({
    stepInfo: {
      sub: "Property Address",
    },
  });

const insuranceDetails = z
  .object({
    insurance_start_date: z
      .date()
      .default(() => new Date())
      .describe("Insurance start date"),

    bank_name: z.string().nullish().default("").describe("Bank // Bank name"),
    bank_number: z
      .string()
      .nullish()
      .default("")
      .describe("Bank Number // Bank Number..."),
    bank_branch: z
      .string()
      .nullish()
      .default("")
      .describe("Branch // Branch..."),
    bank_branch_number: z
      .string()
      .nullish()
      .default("")
      .describe("Branch Number // Branch Number..."),
  })
  .describe("Insurance details")
  .meta({
    stepInfo: {
      sub: "Insurance details",
    },
  });

const sendLinksToComplete = z
  .object({
    email_customer1: z.string().email().nullish().describe("Email customer 1"),
    phone_customer1: z.string().nullish().describe("Phone customer 1"),
    email_customer2: z
      .string()
      .email()
      .nullish()
      .describe("Email customer 2")
      .meta({
        condition: (step, { number_of_customers }) => number_of_customers > 1,
      }),
    phone_customer2: z
      .string()
      .nullish()
      .describe("Phone customer 2")
      .meta({
        condition: (step, { number_of_customers }) => number_of_customers > 1,
      }),
    details_approval: z
      .date({ invalid_type_error: "Must approve all details are correct" })
      .describe("I confirm all details are correct and complete")
      .meta({ control: "Checkbox" }),
  })
  .describe("Send links to complete")
  .meta({
    stepInfo: {
      name: "Process End",
      sub: "Confirm and End",
    },
    text: {
      subTitle: "subTitle",
      subTitle2: "subTitle2",
      imageTitle1: "imageTitle1",
      imageTitle2: "imageTitle2",
    },
    beforeElement: (wizard: WizardControlProps) => (
      <SendLinksHeader wizard={wizard} />
    ),
  });

const end = z
  .undefined()
  .describe("Thanks for choosing Smapy // Order received successfully")
  .meta({
    control: (wizard) => (
      <WizardEndStep wizard={wizard}>
        <WizardEndQuestion {...wizard} />
      </WizardEndStep>
    ),
    stepInfo: "none",
    text: {
      text1: "Link to complete was sent",
      text2: "In 2 years we will compare again",
      question: "Customer need property insurance?",
      yesMessage: "Cool, we will call him",
      yes: "yes",
      no: "no",
      end: "end",
    },
  });

export const AdvisorLifeInsurancePages = {
  pages: {
    howDoesItWork,
    numberOfCustomers,
    customer0_details1: customerDetails1.extendMeta({
      text: { subTitle: "subTitle.person1" },
    }),
    customer0_details2: customerDetails2.extendMeta({
      text: { subTitle: "subTitle.person1" },
    }),
    customer1_details1: customerDetails1.extendMeta({
      text: { subTitle: "subTitle.person2" },
    }),
    customer1_details2: customerDetails2.extendMeta({
      text: { subTitle: "subTitle.person2" },
    }),
    loanDetailsIntro,
    loanTracksCount,
    track0: loanTracks.extendMeta({
      text: { subTitle: "subTitle.track1" },
    }),
    track1: loanTracks.extendMeta({
      text: { subTitle: "subTitle.track2" },
    }),
    track2: loanTracks.extendMeta({
      text: { subTitle: "subTitle.track3" },
    }),
    track3: loanTracks.extendMeta({
      text: { subTitle: "subTitle.track4" },
    }),
    track4: loanTracks.extendMeta({
      text: { subTitle: "subTitle.track5" },
    }),
    track5: loanTracks.extendMeta({
      text: { subTitle: "subTitle.track6" },
    }),
    track6: loanTracks.extendMeta({
      text: { subTitle: "subTitle.track7" },
    }),
    track7: loanTracks.extendMeta({
      text: { subTitle: "subTitle.track8" },
    }),
    track8: loanTracks.extendMeta({
      text: { subTitle: "subTitle.track9" },
    }),
    mortgageSummary,
    customer0_moreDetails: customerMoreDetails.extendMeta({
      text: { subTitle: "subTitle.person1" },
    }),
    customer1_moreDetails: customerMoreDetails.extendMeta({
      text: { subTitle: "subTitle.person2" },
    }),
    mortgagePropertyAddress,
    insuranceDetails,
    sendLinksToComplete,
    end,
  },
  description: "New Life Insurance for Mortgage",
  name: "lifeInsurance",
  ns: "advisor",
} satisfies WizardPagesDefinition;
