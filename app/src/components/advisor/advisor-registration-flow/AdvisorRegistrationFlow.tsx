import { z } from "zod";
import { useUser } from "@supabase/auth-helpers-react";
import { Box, Button, Stack } from "@chakra-ui/react";
import { api } from "../../../utils/api";
import {
  AdvisorUpdateSchema,
  schemaStep0,
  schemaStep1,
  schemaStep2,
  schemaStep3,
  schemaStep4,
} from "./advisor-registration-flow-schema";
import { WelcomeText } from "./WelcomeText";
import { useState } from "react";
import { Form } from "../../common/forms/Form";
import { useRouter } from "next/router";

export const AdvisorRegistrationFlow = () => {
  const onCompleteUrl = "/advisor/dashboard";

  const router = useRouter();
  const user = useUser();
  const { data: userProfile, isLoading } =
    api.advisor.getUserProfile.useQuery();
  const updateUserProfile = api.advisor.updateUserProfile.useMutation();

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 0,
      schema: schemaStep0,
    },
    {
      id: 1,
      schema: schemaStep1,
    },
    {
      id: 2,
      schema: schemaStep2,
    },
    {
      id: 3,
      schema: schemaStep3,
    },
    {
      id: 4,
      schema: schemaStep4,
    },
    {
      id: 5,
      control: <WelcomeText />,
    },
  ];

  const step = steps[currentStep];

  if (!step) {
    throw new Error(
      `Unexpected state currentStep: ${currentStep}/${steps.length}`
    );
  }

  const handleSubmit = async (values: z.infer<typeof AdvisorUpdateSchema>) => {
    await updateUserProfile.mutateAsync(values);
    if (currentStep >= steps.length) {
      await router.push(onCompleteUrl);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepBack = () => {
    setCurrentStep(currentStep - 1);
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Box>AdvisorRegistrationFlow</Box>
      <Button
        onClick={handleStepBack}
        isDisabled={currentStep === 0}
        alignSelf="end"
      >
        Back
      </Button>
      {step.schema ? (
        <Form
          schema={step.schema}
          onSubmit={handleSubmit}
          props={{}}
          defaultValues={userProfile}
        ></Form>
      ) : (
        step.control
      )}
      <pre>{JSON.stringify(userProfile, null, 2)}</pre>
    </>
  );
};
