import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import type { WizardControlProps } from "./useWizardFlow";

export const FormHeader = ({
  wizard: { stepRange, step, meta, onStepBack, currentStep },
}: WizardControlProps) => {
  // console.log(`muly:FormHeader ${currentStep}:${step.meta.label}`, { meta });
  return (
    <>
      <Box>{meta.label || null}</Box>
      <Box width="100%" position="relative">
        <VStack px={12}>
          <Heading as="h1" size="xl" flexGrow={1}>
            {step.meta.label || null}
          </Heading>
          <Heading as="h2" size="md" flexGrow={1}>
            {step.meta.placeholder || null}
          </Heading>
        </VStack>
        <Button
          position="absolute"
          right={0}
          top={0}
          onClick={() => onStepBack()}
          isDisabled={currentStep === stepRange.start}
          alignSelf="end"
        >
          Back
        </Button>
      </Box>
    </>
  );
};
