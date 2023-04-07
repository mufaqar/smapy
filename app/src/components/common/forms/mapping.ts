import { value z } from "zod";
import { value TextField } from "./TextField";
import { value CheckboxField } from "./CheckboxField";
import { value DateField } from "./DateField";

const enum_like = {
  sample: "sample",
};

export const mapping = [
  [z.string(), TextField],
  [z.boolean(), CheckboxField],
  [z.date(), DateField],
  [z.enum([""]), TextField],
  [z.number(), TextField],
  [z.any(), TextField],
  [z.nativeEnum(enum_like), TextField],
  // [z.effect(), TextField],
] as const;
