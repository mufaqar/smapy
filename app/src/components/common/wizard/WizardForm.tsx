import { Box, VStack } from "@chakra-ui/react";
import { FormHeader } from "./FormHeader";
import { Form } from "../forms/Form";
import Image from "next/image";
import React from "react";
import type { WizardControlProps } from "./useWizardFlow";
import type { TranslationFn } from "../../../utils/i18n-utils";
import { FormSideBackgroundImage } from "./FormSideBackgroundImage";
import NoSSR from "react-no-ssr";
import { Loading } from "../Loading";

interface Props<T> extends WizardControlProps {
  t: TranslationFn;

  recordData: T;

  formData: any;

  handleSubmit: (data: T) => Promise<void>;

  // preprocessField;
}

export const WizardForm = ({
  wizard,
  handleSubmit,
  recordData,
  formData,
  t,
}: Props<any>) => {
  const { schema, control, step } = wizard;

  // console.log(`muly:WizardForm render`, { wizard, recordData });

  if (recordData === undefined) {
    return <Box>Loading...</Box>;
  }

  return (
    // SSR does not work with ?step=x url parameter, it fail on refresh hydration
    // Server has no access to url parameters so it render step 0
    // Maybe we can revisit this in the future
    <NoSSR onSSR={<Loading />}>
      <VStack maxW="lg" m="auto">
        <FormHeader wizard={wizard} />
        <Box position="relative" key={step.name}>
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
              defaultValues={formData || recordData}
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

          <FormSideBackgroundImage image={step.meta.props?.image} />
        </Box>
        <pre>{JSON.stringify(recordData, null, 2)}</pre>
      </VStack>
    </NoSSR>
  );
};
