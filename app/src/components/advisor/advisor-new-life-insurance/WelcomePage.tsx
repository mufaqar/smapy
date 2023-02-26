import { Box, Button } from "@chakra-ui/react";
import type { WizardControlProps } from "../../common/wizard/useWizardFlow";

export const WelcomePage = ({ wizard: { onStepNext } }: WizardControlProps) => {
  return (
    <Box>
      <Box>WelcomePage</Box>
      <Button onClick={onStepNext}>Next</Button>
    </Box>
  );
};
