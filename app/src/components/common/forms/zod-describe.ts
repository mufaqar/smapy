import * as z from "zod";
import { SPLIT_DESCRIPTION_SYMBOL } from "../../libs/react-ts-form/getMetaInformationForZodType";
import type React from "react";
import type { ChakraProps } from "@chakra-ui/react";
import type { GridProps } from "@chakra-ui/layout/dist/grid";
import { QueryObserverResult } from "@tanstack/query-core/src/types";

export type CustomControlDef = () => React.ReactNode;
export type CustomControlDefMap = { [key: string]: CustomControlDef };

const ChoiceSchema = z
  .object({
    id: z.string().or(z.number()),
    title: z.string(),
  })
  .or(z.string());

const ZodDescribeSchema = z.object({
  name: z.string().optional(),
  label: z.string().optional(),
  placeholder: z.string().optional(),
  control: z.string().optional(),
  // .enum([
  //   "Textarea",
  //   "RadioGroup",
  //   "Checkbox",
  //   "Switch",
  //   "CheckboxGroup",
  //   "File",
  // ])
  // .optional(),
  choices: z.array(ChoiceSchema).optional(),
  style: z.any(),
  props: z.any(),
  before: z.string().optional(),
  after: z.string().optional(),
});

export type ChoiceType = z.infer<typeof ChoiceSchema>;
const ZodDescribeSchema_noStyle = ZodDescribeSchema.omit({
  style: true,
  props: true,
});
export type ZodDescribeType = z.infer<typeof ZodDescribeSchema_noStyle> & {
  style?: ChakraProps | GridProps;
  props?: Record<string, string>;
};

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
