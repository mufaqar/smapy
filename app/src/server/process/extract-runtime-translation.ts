import { AdvisorLifeInsurancePages } from "../../components/advisor/advisor-life-insurance/advisor-life-insurance-schema";
import { AdvisorUpdatePages } from "../../components/advisor/advisor-registration-flow/advisor-registration-flow-schema";
import { schemaLogin } from "../../components/auth/user-auth-schema";
import type { ZodTypeAny } from "zod/lib/types";
import type { TranslationFn } from "../../utils/i18n-utils";
import { translateSchemaInfo } from "../../utils/i18n-utils";
import type { WizardPagesDefinition } from "../../components/common/wizard/useWizardFlow";
import { getPagesZodMetaInfo } from "../../components/common/wizard/useWizardFlow";
import { getZodMetaInfo } from "../../utils/zod-meta";
import { compareFlowPages } from "@/components/customer/compare/compare-flow-schema";
import {
  contactUsEmailPages,
  contactUsPhonePages,
} from "@/components/customer/contact-us/contact-us-schema";
// import { HowDoesItWork } from "@/components/customer/compare/how-does-it-work";

export const extractRuntimeTranslation = (nsMap: {
  [ns: string]: TranslationFn;
}) => {
  let count = 0;
  let context = "";

  const translate: TranslationFn = (key: string, def?: string) => {
    // console.log(`translate ${ns} ${key}=${def}`);
    const map = nsMap[ns];
    if (!map) {
      throw new Error(
        `Missing translator for namespace ${ns} key ${key} def:${def} context ${context}`
      );
    }

    count++;
    return map(key, def);
  };

  const translateSchema = (schema: ZodTypeAny) => {
    context = `translateSchema ns:${ns} name:${schema.metadata().name}`;
    translateSchemaInfo(getZodMetaInfo(schema), translate, "");
    context = "";
  };

  const translateWizard = (pagesDefinition: WizardPagesDefinition) => {
    context = `translateWizard ns:${ns} name:${pagesDefinition.name}}`;
    const stepsRaw = getPagesZodMetaInfo(pagesDefinition);
    const steps = translateSchemaInfo(
      stepsRaw,
      translate,
      pagesDefinition.name
    );
    context = "";
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
