import type { z } from "zod";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import type { MetaInfo, ControlCallback } from "../../../utils/zod-meta";
import { getZodMetaInfo } from "../../../utils/zod-meta";
import type { ZodEffects } from "zod";
import type { TranslationFn } from "../../../utils/i18n-utils";
import { translateSchemaInfo } from "../../../utils/i18n-utils";
import { useQueryState } from "next-usequerystate";

// type CustomRefMap = Record<string, () => Promise<any>>;
// export type CustomControlDef = (props: WizardControlProps) => React.ReactNode;
// export type CustomControlDefMap = { [key: string]: CustomControlDef };

interface UseWizardFlowOptions {
  onCompleteUrl: string;

  translate: TranslationFn;
}

export const useWizardFlow = (
  type: z.ZodUnion<any>,
  options: UseWizardFlowOptions
) => {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useQueryState<number>("step", {
    history: "push",
    parse: (val: string) => (val ? Number(val) : 0),
    defaultValue: 0,
  });

  const steps = useMemo(() => {
    const stepsRaw = getZodMetaInfo(type);
    const steps = translateSchemaInfo(stepsRaw, options.translate);
    return steps;
  }, [options.translate, type]);

  if (!steps.children) {
    throw new Error("Not a union type");
  }

  const step: MetaInfo | undefined = steps.children[currentStep];

  if (!step) {
    throw new Error(
      `Unexpected state currentStep: ${currentStep}/${steps.children.length}`
    );
  }

  const control: ControlCallback | undefined =
    step.meta.control && typeof step.meta.control === "function"
      ? step.meta.control
      : undefined;

  const [stepRange, setStepRange] = useState<{ start: number; end: number }>({
    start: 0,
    end: Object.keys(steps.children || {}).length - 1,
  });

  const setStep = (stepIdx: number) => {
    console.log(`useWizardFlow:setStep`, {
      stepIdx,
      stepRange,
      currentStep,
    });
    void setCurrentStep(
      Math.min(stepRange.end, Math.max(stepRange.start, stepIdx))
    );
  };

  const onStepBack = () => {
    console.log(`useWizardFlow:onStepBack`, { stepRange, currentStep });
    setStep(currentStep - 1);
  };

  const onStepNext = async () => {
    console.log(`useWizardFlow:onStepNext`, { stepRange, currentStep });
    if (currentStep >= stepRange.end) {
      await router.push(options.onCompleteUrl);
    } else {
      setStep(currentStep + 1);
    }
  };

  console.log(`muly:useWizardFlow`, {
    stepRange,
    control,
    step,
    currentStep,
    metaInfo: steps,
  });

  if (step.typeName === "ZodUndefined" && !control) {
    throw new Error(
      `Invalid step ${currentStep}, schema type is ${step.typeName} and control is empty`
    );
  }

  return {
    stepRange,
    setStepRange: (start?: number, end?: number) => {
      const _start = start === undefined ? stepRange.start : start;
      const _end = end === undefined ? stepRange.end : end;
      setStepRange({
        start: _start,
        end: _end,
      });

      void setCurrentStep(Math.min(_end, Math.max(_start, currentStep)));
      console.log(`useWizardFlow:setStepRange`, {
        _start,
        _end,
        currentStep,
      });
    },

    setStep,
    onStepBack,
    onStepNext,

    control,
    step,
    currentStep,
    schema: step.type as z.AnyZodObject | ZodEffects<any, any>,
    metaInfo: steps,
  };
};

export type WizardControlProps = { wizard: ReturnType<typeof useWizardFlow> };
