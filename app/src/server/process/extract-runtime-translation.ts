import { AdvisorNewLifeInsurancePages } from "../../components/advisor/advisor-new-life-insurance/advisor-new-life-insurance-schema";
import { AdvisorUpdatePages } from "../../components/advisor/advisor-registration-flow/advisor-registration-flow-schema";
import { schemaRegister } from "../../components/auth/advisor-auth-schema";
import type { ZodTypeAny } from "zod/lib/types";
import type { TranslationFn } from "../../utils/i18n-utils";
import { translateSchemaInfo } from "../../utils/i18n-utils";
import type { WizardPagesDefinition } from "../../components/common/wizard/useWizardFlow";
import { getPagesZodMetaInfo } from "../../components/common/wizard/useWizardFlow";
import { getZodMetaInfo } from "../../utils/zod-meta";

export const extractRuntimeTranslation = (nsMap: {
  [ns: string]: TranslationFn;
}) => {
  let count = 0;

  const translate: TranslationFn = (key: string, def?: string) => {
    // console.log(`translate ${ns} ${key}=${def}`);
    if (!nsMap[ns]) {
      throw new Error(`Missing translator for namespace ${ns}`);
    }

    count++;
    return nsMap[ns](key, def);
  };

  const translateSchema = (schema: ZodTypeAny) => {
    translateSchemaInfo(getZodMetaInfo(schema), translate, "");
  };

  const translateWizard = (pagesDefinition: WizardPagesDefinition) => {
    const stepsRaw = getPagesZodMetaInfo(pagesDefinition);
    const steps = translateSchemaInfo(stepsRaw, translate);
  };

  const ns = "advisor";
  [schemaRegister].forEach(translateSchema);
  [AdvisorNewLifeInsurancePages, AdvisorUpdatePages].forEach(translateWizard);

  return { message: `done count:${count}` };
};
