import type { z } from "zod";
import { useUser } from "@supabase/auth-helpers-react";
import { Box, Button, Heading, HStack, Stack, VStack } from "@chakra-ui/react";
import { api } from "../../../utils/api";
import { AdvisorUpdateSchema } from "./advisor-registration-flow-schema";
import { WelcomeText } from "./WelcomeText";
import React, { useState } from "react";
import { Form } from "../../common/forms/Form";
import { useWizardFlow } from "../../common/wizard/useWizardFlow";

export const AdvisorRegistrationFlow = () => {
  const { onStepBack, onStepNext, control, step, currentStep } = useWizardFlow(
    AdvisorUpdateSchema,
    {
      onCompleteUrl: "/advisor/dashboard",
      customControlsMap: {
        WelcomeText: () => <WelcomeText />,
      },
    }
  );

  const user = useUser();
  const { data: userProfile, isLoading } =
    api.advisor.getUserProfile.useQuery();
  const updateUserProfile = api.advisor.updateUserProfile.useMutation();

  console.log(`muly:AdvisorRegistrationFlow`, {
    step,
    control,
  });

  const handleSubmit = async (values: z.infer<typeof AdvisorUpdateSchema>) => {
    await updateUserProfile.mutateAsync(values);
    await onStepNext();
  };

  if (isLoading) {
    return null;
  }

  return (
    <VStack maxW="lg" m="auto">
      <Box>AdvisorRegistrationFlow</Box>
      <Box width="100%" position="relative">
        <VStack px={12}>
          <Heading as="h1" size="xl" flexGrow={1}>
            {step.props?.label}
          </Heading>
          <Heading as="h2" size="md" flexGrow={1}>
            {step.props?.placeholder}
          </Heading>
        </VStack>
        <Button
          position="absolute"
          right={0}
          top={0}
          onClick={onStepBack}
          isDisabled={currentStep === 0}
          alignSelf="end"
        >
          Back
        </Button>
      </Box>
      {!!control ? (
        control()
      ) : (
        <Form
          schema={step.type}
          onSubmit={handleSubmit}
          props={{}}
          defaultValues={userProfile}
          formProps={{
            style: {
              // Merged with schema dsk style, priority to dsk
              mt: 18,
            },
            submit: {
              notification: false,
              text: "Next",
              alignSelf: "center",
              mt: 16,
            },
          }}
        ></Form>
      )}
      <pre>{JSON.stringify(userProfile, null, 2)}</pre>
    </VStack>
  );
};
