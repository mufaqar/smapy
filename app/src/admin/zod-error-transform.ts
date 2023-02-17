import { zodResolver } from "@hookform/resolvers/zod";
import { SafeParseReturnType } from "zod/lib/types";
import { preTransformDates } from "../utils/zod-utils";

export const formResolver =
  (schema: any) => async (data: any, context: any, options: any) => {
    try {
      const answer = await zodResolver(schema)(
        preTransformDates(schema, data),
        context,
        options
      );
      if (Object.keys(answer.errors).length) {
        console.log("formResolver: validation result", {
          zod: answer,
          data,
          context,
          options,
        });
      }
      return Promise.resolve(answer);
    } catch (err: any) {
      console.log(`muly:Error`, { err: err.stack });
      throw err;
    }
  };

export const convertZodAnswerToReactAdminFormErrors = (
  zodAnswer: SafeParseReturnType<any, any>
) => {
  let validationErrors: any = null;
  if (!zodAnswer.success) {
    validationErrors = {};
    zodAnswer.error.issues.forEach(({ path, message }) => {
      let base = validationErrors;
      for (let i = 0; i < path.length - 1; i++) {
        const p = path[i];
        if (p) {
          base[p] = {};
          base = base[p];
        }
      }
      const p = path[path.length - 1];
      if (p) {
        base[p] = message;
      }
    });
  }

  return validationErrors;
};
