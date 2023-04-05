import React from "react";
import type { WizardControlProps } from "./useWizardFlow";
import { evaluateControlCallback } from "./useWizardFlow";
import { backDisabled } from "@/components/common/wizard/steps-info";

export const FormHeader = (wizard: WizardControlProps) => {
  const { step, meta, onStepBack, stepsInfo, stepCode } = wizard;
  // console.log(`muly:FormHeader ${currentStep}:${step.meta.label}`, { meta });

  const showBack =
    typeof step.meta.showBack === "boolean" && !step.meta.showBack;

  return (
    <>
      <h1 className="text-center text-5xl font-normal">
        {evaluateControlCallback(meta.label, wizard)}
      </h1>
      <div className="relative w-full">
        <div className="flex flex-col items-center">
          <h2 className="text-center text-4xl font-bold">
            {evaluateControlCallback(step.meta.label, wizard)}
          </h2>
          <h3 className="text-center text-4xl font-light">
            {step.meta.placeholder || null}
          </h3>
        </div>
        {!!showBack && (
          <button
            className="absolute right-0 self-end"
            onClick={() => onStepBack()}
            disabled={backDisabled(stepsInfo, stepCode)}
          >
            Back
          </button>
        )}
      </div>
    </>
  );
};
