import { RefinementCtx } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RTFSupportedZodTypes } from "../components/libs/react-ts-form";
import { ZodOptional, ZodTypeAny } from "zod/lib/types";

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
//     // console.log(`muly:getPrismaSelect`, { shape, r, def: r._def });
//
//     Object.keys(shape).forEach((key: string) => {
//       select[key] = getPrismaSelect(shape[key]);
//     });
//
//     return select;
//   } else {
//     // console.log(`muly:getPrismaSelect ATOM`, { r, w: r.unwrap });
//     return true;
//   }
// };
