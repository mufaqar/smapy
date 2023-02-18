import type { CustomControlDefMap } from "../forms/zod-describe";
import type { z } from "zod";
import { useRouter } from "next/router";
import { useState } from "react";
import type { WizardsStep } from "../../../utils/zod-utils";
import { splitUnion } from "../../../utils/zod-utils";
import { AdvisorUpdateSchema } from "../../advisor/advisor-registration-flow/advisor-registration-flow-schema";

interface UseWizardFlowOptions {
  onCompleteUrl: string;
  customControlsMap?: CustomControlDefMap;
}

export const useWizardFlow = (
  type: z.ZodUnion<any>,
  options: UseWizardFlowOptions
) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = splitUnion(AdvisorUpdateSchema);
  const step: WizardsStep | undefined = steps[currentStep];

  const controlName =
    // @ts-ignore
    step?.type?._def?.typeName === "ZodUndefined"
      ? step?.props?.label
      : undefined;

  const control =
    controlName && options.customControlsMap
      ? options.customControlsMap[controlName]
      : undefined;

  if (!step) {
    throw new Error(
      `Unexpected state currentStep: ${currentStep}/${steps.length}`
    );
  }

  const onStepBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const onStepNext = async () => {
    if (currentStep >= steps.length) {
      await router.push(options.onCompleteUrl);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return { onStepBack, onStepNext, control, step, currentStep };
};
