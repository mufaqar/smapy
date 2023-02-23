/* eslint-disable
      @typescript-eslint/no-unsafe-assignment,
      @typescript-eslint/no-unsafe-member-access,
      @typescript-eslint/no-unsafe-argument,
      @typescript-eslint/no-unsafe-return,
      @typescript-eslint/no-unsafe-call
*/

import type { RefinementCtx, z, ZodEffects } from "zod";
import type { ZodTypeAny } from "zod/lib/types";
import { unwrap } from "../components/libs/react-ts-form/unwrap";
import { parseDescription } from "../components/libs/react-ts-form/getMetaInformationForZodType";
import type { ZodDescribeType } from "../components/common/forms/zod-describe";

export const preTransformDates = (schema: any, value: any) => {
  const isDate = (field: any): boolean => {
    return (
      field &&
      (field._def.typeName === "ZodDate" || isDate(field._def.innerType))
    );
  };

  const keys = Object.keys(schema.shape);
  for (const key of keys) {
    const field = schema.shape[key];
    if (value[key] && isDate(field)) {
      // console.log(
      //   `muly:preTransformDates ${key} ${field._def.typeName} ${field._def.innerType?._def.typeName}`,
      //   { field }
      // );

      value[key] = new Date(value[key]);
    }
  }

  return value;
};

export const zodRefineCheckArrayDuplicate = (
  value: unknown,
  field: string,
  ctx: RefinementCtx
) => {
  if (value) {
    if (Array.isArray(value)) {
      value.forEach((item: any, index: number) => {
        if (
          item[field] &&
          value.findIndex((item2) => item[field] === item2[field]) !== index
        ) {
          const path = [];
          path[index] = field;
          ctx.addIssue({
            code: "custom",
            message: "Duplicate value",
            path: [`[${index}].${field}`],
          });
        }
      });
    } else {
      console.error(`zodRefineCheckArrayDuplicate, inavlid value`, {
        value,
        field,
        ctx,
      });
      ctx.addIssue({
        code: "custom",
        message: "Not array value",
        path: [`${field}`],
      });
    }
  }
};

// BAD IDEA, loosing types
// export const getPrismaSelect = <T extends ZodTypeAny>(type: T): any => {
//   let r = type;
//
//   // @ts-ignore
//   while (r.unwrap) {
//     // @ts-ignore
//     r = r.unwrap();
//   }
//
//   if (r._def.typeName === "ZodObject") {
//     const select: Record<string, any> = {};
//     const shape = r._def.shape();
//
//     console.log(`muly:getPrismaSelect`, { shape, r, def: r._def });
//
//     Object.keys(shape).forEach((key: string) => {
//       select[key] = getPrismaSelect(shape[key]);
//     });
//
//     return select;
//   } else {
//     console.log(`muly:getPrismaSelect ATOM`, { r, w: r.unwrap });
//     return true;
//   }
// };

export interface MetaInfo {
  description?: ZodDescribeType;
  children?: Record<string, MetaInfo>;
  type: z.AnyZodObject | ZodEffects<any, any> | ZodTypeAny;
  // type: z.AnyZodObject | ZodEffects<any, any>;

  typeName: string;
}

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

export const getZodMetaInfo = <T extends ZodTypeAny>(
  type: T,
  name?: string
): MetaInfo => {
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
      description: { name, ...parseDescription(r.description) },
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
      description: { name, ...parseDescription(r.description) },
      children,
      typeName: getInnerType(r), // r._def.typeName,
      type,
    };
  } else {
    console.log(`muly:getZodMetaInfo:CHILD ${name}`, {
      type,
      r,
      d: type.description,
    });
    return {
      description: { name, ...parseDescription(type.description) },
      typeName: getInnerType(r),
      type,
    };
  }
};
