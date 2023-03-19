import { Box, Button } from "@chakra-ui/react";
import type { WizardControlProps } from "../../common/wizard/useWizardFlow";

export const MortgageSummary = ({ onStepNext }: WizardControlProps) => {
  return (
    <Box>
      <Box>MortgageSummary</Box>
      <Button onClick={onStepNext}>Next</Button>
    </Box>
  );
};
