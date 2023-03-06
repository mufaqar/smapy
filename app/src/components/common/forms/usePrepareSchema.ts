import type { TranslationFn } from "../../../utils/i18n-utils";
import { translateSchemaInfo } from "../../../utils/i18n-utils";
import type { ZodTypeAny } from "zod/lib/types";
import { useMemo } from "react";
import { getPagesZodMetaInfo } from "../wizard/useWizardFlow";
import { getZodMetaInfo } from "../../../utils/zod-meta";
import type { FormContext } from "../../libs/react-ts-form/FieldContext";

export const usePrepareSchema = (
  translate: TranslationFn,
  schema: ZodTypeAny
): FormContext => {
  const info = useMemo(() => {
    const infoRaw = getZodMetaInfo(schema);
    const info = translateSchemaInfo(infoRaw, translate);
    return info;
  }, [translate, schema]);

  return { t: translate, formMeta: info };
};
