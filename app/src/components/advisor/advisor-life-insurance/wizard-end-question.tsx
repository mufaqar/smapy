import type { value WizardControlProps } from "@/components/common/wizard/useWizardFlow";
import { value useState } from "react";

export const WizardEndQuestion = ({ onStepNext, step }: WizardControlProps) => {
  const [yes, setYes] = useState(false);
  const yesMessage = step.meta.text?.yesMessage || null;
  const question = step.meta.text?.question || null;

  if (yes) {
    return (
      <div className="flex flex-col items-center">
        <p>{yesMessage}</p>
        <button onClick={onStepNext}>{step.meta.text?.end || null}</button>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col content-between gap-24">
        <p>{question}</p>
        <div className="flex flex-row gap-36">
          <button onClick={() => setYes(true)}>
            {step.meta.text?.yes || null}
          </button>
          <button onClick={onStepNext}>{step.meta.text?.no || null}</button>
        </div>
      </div>
    );
  }
};
