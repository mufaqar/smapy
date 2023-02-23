import type { CustomControlDefMap } from "../forms/zod-describe";
import type { z } from "zod";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { AdvisorUpdateSchema } from "../../advisor/advisor-registration-flow/advisor-registration-flow-schema";
import type { MetaInfo } from "../../../utils/zod-utils";
import { getZodMetaInfo } from "../../../utils/zod-utils";
import type { ZodEffects } from "zod";
import { translateSchemaInfo } from "../../../utils/i18n-utils";

type CustomRefMap = Record<string, () => Promise<any>>;

interface UseWizardFlowOptions {
  onCompleteUrl: string;
  customControlsMap?: CustomControlDefMap;

  refMap?: CustomRefMap;

  translate: (key: string, def?: string) => string;
}

export const useWizardFlow = (
  type: z.ZodUnion<any>,
  options: UseWizardFlowOptions
) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = useMemo(() => {
    const stepsRaw = getZodMetaInfo(AdvisorUpdateSchema);
    const steps = translateSchemaInfo(stepsRaw, options.translate);
    console.log(`muly:getZodMetaInfo:MEMO`, { stepsRaw, steps });
    return steps;
  }, [options.translate]);

  if (!steps.children) {
    throw new Error("Not a union type");
  }

  const step: MetaInfo | undefined = steps.children[currentStep];

  const controlName =
    step?.typeName === "ZodUndefined" ? step?.description?.control : undefined;

  console.log(`muly:useWizardFlow`, { steps, step, controlName, currentStep });

  const control =
    controlName && options.customControlsMap
      ? options.customControlsMap[controlName]
      : undefined;

  if (!step) {
    throw new Error(
      `Unexpected state currentStep: ${currentStep}/${steps.children.length}`
    );
  }

  const onStepBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const onStepNext = async () => {
    if (currentStep >= Object.keys(steps.children || {}).length) {
      await router.push(options.onCompleteUrl);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return {
    onStepBack,
    onStepNext,
    control,
    step,
    currentStep,
    schema: step.type as z.AnyZodObject | ZodEffects<any, any>,
  };
};
