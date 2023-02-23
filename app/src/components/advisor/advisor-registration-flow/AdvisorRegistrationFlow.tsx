import type { z } from "zod";
import { useUser } from "@supabase/auth-helpers-react";
import { Box, Button, Heading, HStack, Stack, VStack } from "@chakra-ui/react";
import { api } from "../../../utils/api";
import { AdvisorUpdateSchema } from "./advisor-registration-flow-schema";
import { WelcomeText } from "./WelcomeText";
import React, { useState } from "react";
import { Form } from "../../common/forms/Form";
import { useWizardFlow } from "../../common/wizard/useWizardFlow";
import { Terms } from "./Terms";
import type { UseFormReturn } from "react-hook-form";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { missingKeyHandler } from "../../../utils/i18n-utils";
import { getZodMetaInfo } from "../../../utils/zod-utils";

export const AdvisorRegistrationFlow = () => {
  const { t } = useTranslation("advisor");
  // const { data: sampleBankList } = api.advisor.sampleBankList.useQuery();

  const { onStepBack, onStepNext, control, step, currentStep, schema } =
    useWizardFlow(AdvisorUpdateSchema, {
      translate: t,
      onCompleteUrl: "/advisor/dashboard",
      customControlsMap: {
        WelcomeText: () => <WelcomeText />,
        Terms: () => <Terms />,
        EmptyCell: () => <Box>EMPTY</Box>,
      },
    });

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

  const preprocessField = (name: string, form: UseFormReturn, props: any) => {
    // console.log(`muly:preprocessField ${name}`, { form, props });
    // if (props.description.after) {
    //   props.afterElement = map(name);
    // }
  };

  console.log(`muly:AdvisorRegistrationFlow`, {
    metaInfo: getZodMetaInfo(AdvisorUpdateSchema),
  });

  return (
    <VStack maxW="lg" m="auto">
      <Box>
        {t(
          "AdvisorRegistrationFlow2",
          "DEF AdvisorRegistrationFlow",
          "DEF desc"
        )}
      </Box>
      <Box width="100%" position="relative">
        <VStack px={12}>
          <Heading as="h1" size="xl" flexGrow={1}>
            {t(step.description?.label || "")}
          </Heading>
          <Heading as="h2" size="md" flexGrow={1}>
            {t(step.description?.placeholder || "")}
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
      <Box position="relative">
        {!!control ? (
          control()
        ) : (
          <Form
            schema={schema}
            onSubmit={handleSubmit}
            preprocessField={preprocessField}
            // props={{
            //   bank_name: {
            //     choices: sampleBankList,
            //   },
            // }}
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

        {!!step.description?.props?.image && (
          <Box
            width="100%"
            m={10}
            position={["relative", "absolute"]}
            left={[0, -120]}
            bottom={[0, -20]}
            zIndex={-1}
          >
            <Image
              width="240"
              height="186"
              src={step.description.props.image}
              alt=""
            ></Image>
          </Box>
        )}
      </Box>
      {/*<pre>{JSON.stringify(userProfile, null, 2)}</pre>*/}
    </VStack>
  );
};
