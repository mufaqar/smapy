import { z } from "zod";
import { WizardPagesDefinition } from "@/components/common/wizard/useWizardFlow";
import { WizardEndStep } from "@/components/common/controls/wizard-end-step";

export type HowToContactType = "whatsapp" | "phone" | "email";
export type ProductType =
  | "life"
  | "life-mortgage"
  | "property"
  | "property-mortgage";

const product = z
  .string()
  .describe("Which insurance you want us to help? v2")
  .meta({
    className: "col-span-2",
    afterElement: (wizard) => (
      <>
        <h2 className="col-span-2 text-center">
          {wizard.step.meta.text?.header || null}
        </h2>
        <img
          src="/images/forms/contact-us.jpg"
          width={240}
          className="row-span-3"
        />
      </>
    ),
    control: "RadioGroup",
    choices: [
      { id: "life", title: "life", info: "/images/product/life.svg" },
      {
        id: "life-mortgage",
        title: "life-mortgage",
        info: "/images/product/life-mortgage.svg",
      },
      {
        id: "property",
        title: "property",
        info: "/images/product/property.svg",
      },
      {
        id: "property-mortgage",
        title: "property-mortgage",
        info: "/images/product/property-mortgage.svg",
      },
    ],
  });

const name = z.string().describe("Full name");

const subject = z
  .string()
  .nullish()
  .describe("Message")
  .meta({ control: "Textarea" });

const formMeta = {
  className: "grid grid-cols-2",
  text: { header: "Fill details and will return to you" },
  // Sample of render, not needed here
  //   render: ({ product, ...rest }, wizard) => (
  //     <div className="grid grid-cols-2">
  //       <div className="col-span-2">{product}</div>
  //       <img src="/images/forms/contact-us.jpg" width={240} />
  //       <div>{Object.values(rest)}</div>
  //     </div>
  //   ),
};

export const contactDetailsPhone = z
  .object({
    product,
    name,
    contact_info: z.string().describe("Phone"),
    subject,
  })
  .meta(formMeta);

const contactDetailsEmail = z
  .object({
    product,
    name,
    contact_info: z.string().email().describe("Email"),
    subject,
  })
  .meta(formMeta);

const end = z
  .undefined()
  .describe("Thanks for choosing Smapy // Thanks")
  .meta({
    control: (wizard) => <WizardEndStep {...wizard} />,
    text: {
      text1: "Will contact you soon",
      text2: "You will enjoy great service",
    },
  });

export const contactUsPhonePages = {
  pages: {
    contactDetailsPhone,
    end,
  },
  description: "Contact Me",
  name: "contactUsPhone",
} satisfies WizardPagesDefinition;

export const contactUsEmailPages = {
  pages: {
    contactDetailsEmail,
    end,
  },
  description: "Contact Me",
  name: "contactUsEmail",
} satisfies WizardPagesDefinition;
