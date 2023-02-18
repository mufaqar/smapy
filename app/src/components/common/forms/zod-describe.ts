import * as z from "zod";
import { SPLIT_DESCRIPTION_SYMBOL } from "../../libs/react-ts-form/getMetaInformationForZodType";
import type React from "react";

export type CustomControlDef = () => React.ReactNode;
export type CustomControlDefMap = { [key: string]: CustomControlDef };

const ChoiceSchema = z
  .object({
    id: z.string().or(z.number()),
    title: z.string(),
  })
  .or(z.string());

const ZodDescribeSchema = z.object({
  label: z.string().optional(),
  placeholder: z.string().optional(),
  control: z
    .enum([
      "Textarea",
      "RadioGroup",
      "Checkbox",
      "Switch",
      "CheckboxGroup",
      "File",
    ])
    .optional(),
  choices: z.array(ChoiceSchema).optional(),
});

export type ChoiceType = z.infer<typeof ChoiceSchema>;
export type ZodDescribeType = z.infer<typeof ZodDescribeSchema>;

export const dsk = (description: string, value: ZodDescribeType) => {
  const [label, ...rest] = description
    .split(SPLIT_DESCRIPTION_SYMBOL)
    .map((e) => e.trim());
  const placeholder = rest.join(SPLIT_DESCRIPTION_SYMBOL);

  return JSON.stringify({ ...value, label, placeholder });
};

export const dskParse = (description: string) => {
  return ZodDescribeSchema.parse(JSON.parse(description));
};
