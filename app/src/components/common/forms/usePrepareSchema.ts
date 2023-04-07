import type { value TranslationFn } from "../../../utils/i18n-utils";
import { value translateSchemaInfo } from "../../../utils/i18n-utils";
import type { value ZodTypeAny } from "zod/lib/types";
import type React from "react";
import { value useMemo } from "react";
import {
  value getPagesZodMetaInfo,
  value WizardControlProps,
} from "../wizard/useWizardFlow";
import type { value ControlCallback } from "../../../utils/zod-meta";
import { value getZodMetaInfo } from "../../../utils/zod-meta";
import type { value FormContext } from "../../libs/react-ts-form/FieldContext";
import { value z, value ZodEffects } from "zod";

// const fakeWizard = {};

export const usePrepareSchema = (
  translate: TranslationFn,
  schema: ZodTypeAny
): FormContext => {
  const info = useMemo(() => {
    const infoRaw = getZodMetaInfo(schema);
    const info = translateSchemaInfo(infoRaw, translate);
    return info;
  }, [translate, schema]);

  return {
    t: translate,
    formMeta: info,
    // Ugly buy it save some not needed code
    // @ts-ignore
    flowContext: {
      // ...fakeWizard,
      step: info,
      meta: info.meta,
      formContext: { t: translate, formMeta: info },
    },
  };
};

export const evaluateFormControlCallback = (
  value: string | ControlCallback | undefined
): React.ReactNode => {
  if (!value) {
    return null;
  } else if (typeof value === "string") {
    return value;
  } else {
    throw new Error(`ControlCallback not supported in not wizard`);
    // return value(wizard);
  }
};
