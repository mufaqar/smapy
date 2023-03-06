import { z } from "zod";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import type { MetaInfo, ControlCallback } from "../../../utils/zod-meta";
import { ConditionCallback, getZodMetaInfo } from "../../../utils/zod-meta";
import type { ZodEffects } from "zod";
import type { TranslationFn } from "../../../utils/i18n-utils";
import { translateSchemaInfo } from "../../../utils/i18n-utils";
import { useQueryState } from "next-usequerystate";
import type { ZodTypeAny } from "zod/lib/types";
import { map } from "rambda";

// type CustomRefMap = Record<string, () => Promise<any>>;
// export type CustomControlDef = (props: WizardControlProps) => React.ReactNode;
// export type CustomControlDefMap = { [key: string]: CustomControlDef };

export const getPagesZodMetaInfo = (
  wizardPagesDefinition: WizardPagesDefinition
): MetaInfo => {
  const { pages, description, name, ...meta } = wizardPagesDefinition;
  return {
    meta: { label: description, ...meta },
    children: map((page, name) => getZodMetaInfo(page, name), pages),
    typeName: name || "wizard",
    name: name || "wizard",
    type: z.undefined(),
  };
};

interface UseWizardFlowOptions {
  onCompleteUrl: string;

  translate: TranslationFn;

  recordData?: any;
}

export interface WizardPagesDefinition {
  pages: Record<string, ZodTypeAny>;

  description: string;
  name: string;
}

export const useWizardFlow = (
  pagesDefinition: WizardPagesDefinition,
  options: UseWizardFlowOptions
) => {
  // console.log(`muly:useWizardFlow`, { options });
  const router = useRouter();

  const [currentStep, setCurrentStep] = useQueryState<number>("step", {
    history: "push",
    parse: (val: string) => (val ? Number(val) : 0),
    defaultValue: 0,
  });
  const [currentStepREPLACE, setCurrentStepREPLACE] = useQueryState<number>(
    "step",
    {
      history: "replace",
      parse: (val: string) => (val ? Number(val) : 0),
      defaultValue: 0,
    }
  );

  const { steps, meta } = useMemo(() => {
    const stepsRaw = getPagesZodMetaInfo(pagesDefinition);
    const steps = translateSchemaInfo(stepsRaw, options.translate);
    const { children, meta } = steps;
    return { steps: Object.values(steps.children || {}), meta };
  }, [options.translate, pagesDefinition]);

  if (!steps) {
    throw new Error("No steps found");
  }

  const stepCount = steps.length;
  const step: MetaInfo | undefined = steps[currentStep];

  if (!step) {
    throw new Error(
      `Unexpected state currentStep: ${currentStep}/${stepCount}`
    );
  }

  const control: ControlCallback | undefined =
    step.meta.control && typeof step.meta.control === "function"
      ? step.meta.control
      : undefined;

  const [stepRange, setStepRange] = useState<{ start: number; end: number }>({
    start: 0,
    end: stepCount - 1,
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

  const onStepBack = async (data?: any) => {
    await moveStep(-1, data);
  };

  const moveStep = async (direction: number, data?: any) => {
    let idx = currentStep + direction;
    while (
      (direction > 0 || idx > stepRange.start) &&
      (direction < 0 || idx < stepRange.end) &&
      !evaluateStepCondition(steps[idx], data)
    ) {
      console.log(
        `useWizardFlow:moveStep ${idx}:${steps[idx]?.name} ${direction} condition is false`,
        {
          idx,
          step: steps[idx],
          data,
        }
      );
      idx += direction;
    }
    if (idx >= stepRange.end) {
      await router.push(options.onCompleteUrl);
    } else {
      setStep(idx);
    }
  };

  const onStepNext = async (data?: any) => {
    await moveStep(1, data);
  };

  // console.log(`muly:useWizardFlow`, {
  //   stepRange,
  //   control,
  //   step,
  //   currentStep,
  //   metaInfo: steps,
  // });

  if (step.typeName === "ZodUndefined" && !control) {
    throw new Error(
      `Invalid step ${currentStep}, schema type is ${step.typeName} and control is empty`
    );
  }

  const evaluateStepCondition = (step?: MetaInfo, data?: any) => {
    return step?.meta.condition
      ? step.meta.condition(step, data || options.recordData)
      : true;
  };

  return {
    stepRange,
    setStepRange: async (start?: number, end?: number) => {
      const _start = start === undefined ? stepRange.start : start;
      const _end = end === undefined ? stepRange.end : end;
      setStepRange({
        start: _start,
        end: _end,
      });

      await setCurrentStepREPLACE(
        Math.min(_end, Math.max(_start, currentStep))
      );
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
    steps,
    currentStep,
    schema: step.type as z.AnyZodObject | ZodEffects<any, any>,
    meta,
    formContext: { t: options.translate, formMeta: step },
  };
};

export type WizardControlProps = { wizard: ReturnType<typeof useWizardFlow> };
