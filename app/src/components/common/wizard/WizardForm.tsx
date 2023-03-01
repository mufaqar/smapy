import { Box, VStack } from "@chakra-ui/react";
import { FormHeader } from "./FormHeader";
import { Form } from "../forms/Form";
import Image from "next/image";
import React from "react";
import type { WizardControlProps } from "./useWizardFlow";
import type { TranslationFn } from "../../../utils/i18n-utils";

interface Props<T> extends WizardControlProps {
  t: TranslationFn;

  recordData: T;

  handleSubmit: (data: T) => Promise<void>;

  // preprocessField;
}

export const WizardForm = ({
  wizard,
  handleSubmit,
  recordData,
  t,
}: Props<any>) => {
  const { schema, control, step } = wizard;

  console.log(`muly:WizardForm render`, { wizard, recordData });

  if (!recordData) {
    return <Box>Loading...</Box>;
  }

  return (
    <VStack maxW="lg" m="auto">
      <FormHeader wizard={wizard} />
      <Box position="relative">
        {!!control ? (
          control({ wizard })
        ) : (
          <Form
            formContext={{ t }}
            schema={schema}
            onSubmit={handleSubmit}
            // preprocessField={preprocessField}
            // props={{
            //   bank_name: {
            //     choices: sampleBankList,
            //   },
            // }}
            defaultValues={recordData}
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

        {!!step.meta.props?.image && (
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
              src={step.meta.props.image}
              alt=""
            ></Image>
          </Box>
        )}
      </Box>
      <pre>{JSON.stringify(recordData, null, 2)}</pre>
    </VStack>
  );
};
