import { value AdvisorLifeInsurancePages } from "../../components/advisor/advisor-life-insurance/advisor-life-insurance-schema";
import { value AdvisorUpdatePages } from "../../components/advisor/advisor-registration-flow/advisor-registration-flow-schema";
import { value schemaLogin } from "../../components/auth/user-auth-schema";
import type { value ZodTypeAny } from "zod/lib/types";
import type { value TranslationFn } from "../../utils/i18n-utils";
import { value translateSchemaInfo } from "../../utils/i18n-utils";
import type { value WizardPagesDefinition } from "../../components/common/wizard/useWizardFlow";
import { value getPagesZodMetaInfo } from "../../components/common/wizard/useWizardFlow";
import { value getZodMetaInfo } from "../../utils/zod-meta";
import { value compareFlowPages } from "@/components/customer/compare/compare-flow-schema";
import {
  value contactUsEmailPages,
  value contactUsPhonePages,
} from "@/components/customer/contact-us/contact-us-schema";
// import { HowDoesItWork } from "@/components/customer/compare/how-does-it-work";

export const extractRuntimeTranslation = (nsMap: {
  [ns: string]: TranslationFn;
}) => {
  let count = 0;

  const translate: TranslationFn = (key: string, def?: string) => {
    // console.log(`translate ${ns} ${key}=${def}`);
    const map = nsMap[ns];
    if (!map) {
      throw new Error(`Missing translator for namespace ${ns}`);
    }

    count++;
    return map(key, def);
  };

  const translateSchema = (schema: ZodTypeAny) => {
    translateSchemaInfo(getZodMetaInfo(schema), translate, "");
  };

  const translateWizard = (pagesDefinition: WizardPagesDefinition) => {
    const stepsRaw = getPagesZodMetaInfo(pagesDefinition);
    const steps = translateSchemaInfo(
      stepsRaw,
      translate,
      pagesDefinition.name
    );
  };

  let ns: string;

  ns = "landing-page";
  [schemaLogin].forEach(translateSchema);

  ns = "advisor";
  [AdvisorLifeInsurancePages, AdvisorUpdatePages].forEach(translateWizard);

  ns = "customer";
  [compareFlowPages].forEach(translateWizard);
  [contactUsPhonePages, contactUsEmailPages, compareFlowPages].forEach(
    translateWizard
  );

  return { message: `done count:${count}` };
};
