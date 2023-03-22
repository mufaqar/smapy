import type { WizardControlProps } from "../../common/wizard/useWizardFlow";
import { Button } from "@/components/ui/button";

export const WelcomePage = ({ onStepNext }: WizardControlProps) => {
  return (
    <div>
      <div>WelcomePage</div>
      <Button onClick={onStepNext}>Next</Button>
    </div>
  );
};
