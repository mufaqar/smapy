import { z } from "zod";
import { WelcomePage } from "./WelcomePage";
import type {
  WizardControlProps,
  WizardPagesDefinition,
} from "../../common/wizard/useWizardFlow";
import { customerModel } from "../../../../prisma/zod";
import { range } from "rambda";
import { LoanTrack, LoanTracks } from "../../../../prisma/zod-add-schema";
import { MortgageSummary } from "./MortgageSummary";

const dummySchemaWelcome = z
  .undefined()
  .describe("welcomePage")
  .meta({
    control: (props: WizardControlProps) => <WelcomePage {...props} />,
  });

const numberOfPersons = z.object({
  number_of_persons: z.coerce
    .number()
    .default(1)
    .describe("How many persons")
    .meta({
      control: "RadioGroup",
      choices: [
        { id: 1, title: "One" },
        { id: 2, title: "Two" },
      ],
    }),
});

const personDetails1 = z.object({
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

  smoking_stop_month: z
    .number()
    .optional()
    .describe("How long ago you stop?")
    .meta({ condition: ({ smoking }) => smoking === "stop" }),

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

  birthDate: z.date().describe("Date of birth"),
});

const personDetails2 = z.object({
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
    .describe("Hobby")
    .meta({ condition: ({ dangerous_hobby_has }) => !!dangerous_hobby_has }),
  dangerous_hobby_desc: z
    .string()
    .describe("Hobby Description")
    .meta({ condition: ({ dangerous_hobby_has }) => !!dangerous_hobby_has }),
});

// const mortgageDetailsIntro = z
//   .undefined()
//   .describe("mortgageDetailsIntro")
//   .meta({
//     name: "mortgageDetailsIntro",
//     control: (props: WizardControlProps) => <WelcomePage {...props} />,
//   });
//

const loanTracksCount = z.object({
  loan_tracks_count: z
    .number()
    .min(1)
    .max(10)
    .describe("How many mortgage path?")
    .meta({
      choices: range(1, 9).map((idx) => ({ id: idx, title: `${idx}` })),
    }),
});

const loanTracks = z.object({
  balance: z.number().min(0).describe("Balance"),
  endDate: z.date().describe("Loan end Date"),
  interest_rate: z.number().describe("Interest percentage"),
  interest_type: LoanTrack.shape.interest_type
    .describe("Interest Type")
    .meta({ control: "RadioGroup" }),
  linkage_type: LoanTrack.shape.interest_type
    .describe("Linkage Type")
    .meta({ control: "RadioGroup" }),
  loan_type: LoanTrack.shape.loan_type
    .describe("Loan Type")
    .meta({ control: "RadioGroup" }),
});

const mortgageSummary = z
  .undefined()
  .describe("mortgageSummary")
  .meta({
    control: (props: WizardControlProps) => <MortgageSummary {...props} />,
  });

const newInsuranceThanksPage = z
  .undefined()
  .describe("newInsuranceThanksPage")
  .meta({
    control: (props: WizardControlProps) => <WelcomePage {...props} />,
  });

const personMoreDetails = z.object({
  first_name: z.string().describe("First name"),
  last_name: z.string().describe("First name"),
  card_id: z.string().describe("Card ID"),
  phone: z.string().describe("Phone"),
  email: z.string().email().describe("Email"),

  city: z.string().describe("City name"),
  street: z.string().describe("Street"),
  street_number: z.string().describe("Street Number"),
  apartment_number: z.string().describe("Apartment Number"),

  same_address_mortgage: z.coerce
    .boolean()
    .describe("Same address for mortgage property?"),
});

const mortgagePropertyAddress = z
  .object({
    property_city: z.string().describe("City name"),
    property_street: z.string().describe("Street"),
    property_street_number: z.string().describe("Street Number"),
    property_apartment_number: z.string().describe("Apartment Number"),
  })
  .meta({ condition: ({ same_address_mortgage }) => !same_address_mortgage });

const insuranceDetails = z.object({
  insurance_start_date: z.date().describe("Insurance start date"),

  bank_name: z.string().nullish().default("").describe("Bank // Bank name"),
  bank_number: z
    .string()
    .nullish()
    .default("")
    .describe("Bank Number // Bank Number..."),
  bank_branch: z.string().nullish().default("").describe("Branch // Branch..."),
  bank_branch_number: z
    .string()
    .nullish()
    .default("")
    .describe("Branch Number // Branch Number..."),
});

const sendLinksToComplete = z.object({
  email_customer1: z.string().email().describe("Email customer 1"),
  phone_customer1: z.string().describe("Phone customer 1"),
  email_customer2: z.string().email().describe("Email customer 2"),
  phone_customer2: z.string().describe("Phone customer 2"),
  details_approval: z
    .date({ invalid_type_error: "Must approve all details are correct" })
    .describe("I confirm all details are correct and complete")
    .meta({ control: "Checkbox" }),
});

export const AdvisorNewLifeInsurancePages = {
  pages: {
    dummySchemaWelcome,
    numberOfPersons,
    person1_details1: personDetails1,
    person1_details2: personDetails2,
    person2_details1: personDetails1,
    person2_details2: personDetails2,
    // mortgageDetailsIntro,
    loanTracksCount,
    track1: loanTracks,
    track2: loanTracks,
    track3: loanTracks,
    track4: loanTracks,
    track5: loanTracks,
    track6: loanTracks,
    track7: loanTracks,
    track8: loanTracks,
    track9: loanTracks,
    personMoreDetails,
    mortgagePropertyAddress,
    insuranceDetails,
    sendLinksToComplete,
    newInsuranceThanksPage,
  },
  description: "New Life Insurance for Mortgage",
  name: "AdvisorNewLifeInsurance",
} satisfies WizardPagesDefinition;
