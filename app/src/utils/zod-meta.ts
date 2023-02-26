/* eslint-disable
      @typescript-eslint/no-unsafe-assignment,
      @typescript-eslint/no-unsafe-return,
      @typescript-eslint/no-unsafe-member-access,
      @typescript-eslint/no-unsafe-call,
      @typescript-eslint/no-unsafe-argument
*/

import type { ZodEffects } from "zod";
import { z, ZodType } from "zod";
import type { ZodTypeAny } from "zod/lib/types";
import type React from "react";
import type { ChakraProps, GridProps } from "@chakra-ui/react";
import type { WizardControlProps } from "../components/common/wizard/useWizardFlow";

export const SPLIT_DESCRIPTION_SYMBOL = " // ";

const ChoiceSchema = z
  .object({
    id: z.string().or(z.number()),
    title: z.string(),
  })
  .or(z.string());

export type ChoiceType = z.infer<typeof ChoiceSchema>;

export type ControlCallback = (props: WizardControlProps) => React.ReactNode;

export interface ZodMetaDataItem {
  name?: string;
  label?: string;
  placeholder?: string;
  control?: string | ControlCallback;
  choices?: ChoiceType[];
  style?: ChakraProps | GridProps;
  props?: Record<string, any>;
  before?: React.ReactNode;
  after?: React.ReactNode;
}

declare module "zod" {
  interface ZodType {
    metadata(): ZodMetaDataItem;
    meta(meta: string | ZodMetaDataItem): this;
  }
}

ZodType.prototype.metadata = function () {
  return this._def.meta;
};

ZodType.prototype.meta = function (meta: string | ZodMetaDataItem) {
  if (typeof meta === "string") {
    const [label, ...rest] = meta
      .split(SPLIT_DESCRIPTION_SYMBOL)
      .map((e) => e.trim());
    meta = { label, placeholder: rest.join(SPLIT_DESCRIPTION_SYMBOL) };
  }

  const This = (this as any).constructor;
  return new This({
    ...this._def,
    meta,
  });
};

export interface MetaInfo {
  meta: ZodMetaDataItem;
  children?: Record<string, MetaInfo>;
  type: z.AnyZodObject | ZodEffects<any, any> | ZodTypeAny;
  // type: z.AnyZodObject | ZodEffects<any, any>;

  typeName: string;
}

export const getZodMetaInfo = <T extends ZodTypeAny>(
  type: T,
  name?: string
): MetaInfo => {
  const getFullMeta = <T extends ZodTypeAny>(type: T): ZodMetaDataItem => {
    let desc = {};
    const description = type.description;
    if (description) {
      const [label, ...rest] = description
        .split(SPLIT_DESCRIPTION_SYMBOL)
        .map((e) => e.trim());
      const placeholder = rest.join(SPLIT_DESCRIPTION_SYMBOL);
      desc = {
        label: label,
        placeholder: placeholder ? placeholder : undefined,
      };
    }

    return {
      name,
      ...type.metadata(),
      ...desc,
    };
  };

  const getInnerType = <T extends ZodTypeAny>(type: T): string => {
    let r = type;
    while (r._def.innerType) {
      r = r._def.innerType;
    }
    while (r._def.schema) {
      r = r._def.schema;
    }
    return r._def.typeName;
  };

  let r = type;

  // @ts-ignore
  while (r.unwrap) {
    // @ts-ignore
    r = r.unwrap();
  }
  while (r._def.innerType) {
    r = r._def.innerType;
  }
  while (r._def.schema) {
    r = r._def.schema;
  }

  if (r._def.typeName === "ZodUnion") {
    const children: Record<string, MetaInfo> = {};
    r._def.options.forEach((r: ZodTypeAny, idx: number) => {
      children[idx] = getZodMetaInfo(r);
    });

    return {
      meta: getFullMeta(r),
      children,
      typeName: getInnerType(r),
      type,
    };
  } else if (r._def.typeName === "ZodObject") {
    const children: Record<string, MetaInfo> = {};
    Object.keys(r._def.shape()).forEach((key) => {
      // console.log(`muly:SCAN OBJECT ${name}->${key}`, {});
      children[key] = getZodMetaInfo(r._def.shape()[key], key);
    });
    // console.log(`muly:getZodMetaInfo CHILD`, { map: Object.keys(children) });
    return {
      meta: getFullMeta(r),
      children,
      typeName: getInnerType(r), // r._def.typeName,
      type,
    };
  } else {
    return {
      meta: getFullMeta(type),
      typeName: getInnerType(r),
      type,
    };
  }
};
