import type { z } from "zod";
import { useUser } from "@supabase/auth-helpers-react";
import { Box, Button, Stack } from "@chakra-ui/react";
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
    <>
      <Box>AdvisorRegistrationFlow</Box>
      <Button
        onClick={onStepBack}
        isDisabled={currentStep === 0}
        alignSelf="end"
      >
        Back
      </Button>
      {!!control ? (
        control()
      ) : (
        <Form
          schema={step.type}
          onSubmit={handleSubmit}
          // props={{}}
          defaultValues={userProfile}
        ></Form>
      )}
      <pre>{JSON.stringify(userProfile, null, 2)}</pre>
    </>
  );
};
