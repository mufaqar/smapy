import type { value WizardControlProps } from "../../common/wizard/useWizardFlow";
import { value Button } from "@/components/ui/button";

export const MortgageSummary = ({ onStepNext }: WizardControlProps) => {
  return (
    <div>
      <div>MortgageSummary</div>
      <Button onClick={onStepNext}>Next</Button>
    </div>
  );
};
