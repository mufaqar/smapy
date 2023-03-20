import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Form } from "@/components/common/forms/Form";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";
import { t } from "../../../../.storybook/stories-utils";
import { z } from "zod";

const FormTest = (args: any) => {
  const formContext = usePrepareSchema(t, args.schema);

  const onSubmit = (values: any) => {
    console.log(`muly:onSubmit`, { values });
  };

  return (
    <Form
      formContext={formContext}
      schema={args.schema}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmit}
      props={{}}
      formProps={{
        submit: {
          notification: false,
          text: "Next",
        },
      }}
    ></Form>
  );
};

export default {
  title: "Design/Form",
  component: FormTest,
} as ComponentMeta<typeof FormTest>;

const Template: ComponentStory<typeof FormTest> = (args) => (
  <FormTest {...args} />
);

export const TextField = Template.bind({});
TextField.args = {
  schema: z.object({
    first_name: z.string().describe("First Name // place holder..."),
  }),
};

export const NumberField = Template.bind({});
NumberField.args = {
  schema: z.object({
    count: z.coerce
      .number()
      .min(0)
      .max(5)
      .describe("Count // Number from 0 to 5..."),
  }),
};

export const Textarea = Template.bind({});
Textarea.args = {
  schema: z.object({
    text: z
      .string()
      .describe("Label // Place holder...")
      .meta({ control: "Textarea" }),
  }),
};

export const File = Template.bind({});
File.args = {
  schema: z.object({
    text: z
      .string()
      .describe("Label // Place holder...")
      .meta({ control: "File" }),
  }),
};

export const CheckboxString = Template.bind({});
CheckboxString.args = {
  schema: z.object({
    text: z
      .string()
      .describe("Checkbox as string")
      .meta({
        control: "Checkbox",
        choices: [
          { id: "male", title: "Male" },
          { id: "female", title: "Female" },
        ],
      }),
  }),
};

export const SwitchString = Template.bind({});
SwitchString.args = {
  schema: z.object({
    text: z
      .string()
      .describe("Switch as string")
      .meta({
        control: "Switch",
        choices: [
          { id: "male", title: "Male" },
          { id: "female", title: "Female" },
        ],
      }),
  }),
};

export const RadioGroupString = Template.bind({});
RadioGroupString.args = {
  schema: z.object({
    text: z
      .string()
      .describe("RadioGroup")
      .meta({
        control: "RadioGroup",
        choices: [
          { id: "male", title: "Male" },
          { id: "female", title: "Female" },
          { id: "na", title: "N/A" },
        ],
      }),
  }),
};

export const Select = Template.bind({});
Select.args = {
  schema: z.object({
    text: z
      .string()
      .describe("Select")
      .meta({
        choices: [
          { id: "male", title: "Male" },
          { id: "female", title: "Female" },
          { id: "na", title: "N/A" },
        ],
      }),
  }),
};

export const CheckboxBoolean = Template.bind({});
CheckboxBoolean.args = {
  schema: z.object({
    bool: z.boolean().describe("Boolean"),
  }),
};

export const SwitchBoolean = Template.bind({});
SwitchBoolean.args = {
  schema: z.object({
    bool: z.boolean().describe("Boolean").meta({ control: "Switch" }),
  }),
};

export const CheckboxDate = Template.bind({});
CheckboxDate.args = {
  schema: z.object({
    date: z.date().describe("Date").meta({ control: "Checkbox" }),
  }),
};

export const Date = Template.bind({});
Date.args = {
  schema: z.object({
    date: z.date().describe("Date"),
  }),
};
