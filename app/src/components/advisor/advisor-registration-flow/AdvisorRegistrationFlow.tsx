import type { z } from "zod";
import { Box, VStack } from "@chakra-ui/react";
import { api } from "../../../utils/api";
import { AdvisorUpdateSchema } from "./advisor-registration-flow-schema";
import React, { useState } from "react";
import { Form } from "../../common/forms/Form";
import { useWizardFlow } from "../../common/wizard/useWizardFlow";
import type { UseFormReturn } from "react-hook-form";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { FormHeader } from "../../common/wizard/FormHeader";
import { WizardForm } from "../../common/wizard/WizardForm";

type RecordType = z.infer<typeof AdvisorUpdateSchema>;

export const AdvisorRegistrationFlow = () => {
  const { t } = useTranslation("advisor");
  // const { data: sampleBankList } = api.advisor.sampleBankList.useQuery();

  const wizard = useWizardFlow(AdvisorUpdateSchema, {
    translate: t,
    onCompleteUrl: "/advisor/dashboard",
  });

  const { setStepRange, onStepNext, control, step, schema } = wizard;
  const [recordData, setRecordData] = useState<RecordType>();

  const { data, isLoading } = api.advisor.getUserProfile.useQuery(undefined, {
    onSuccess: (data) => {
      if (data) {
        // @ts-ignore
        setRecordData(data);
      }
      if (data?.first_name && data?.last_name) {
        setStepRange(1, undefined);
      }
    },
  });

  const updateUserProfile = api.advisor.updateUserProfile.useMutation();

  const handleSubmit = async (values: RecordType) => {
    const answer = await updateUserProfile.mutateAsync(values);
    // @ts-ignore
    setRecordData(answer);
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

  return (
    <WizardForm
      t={t}
      wizard={wizard}
      handleSubmit={handleSubmit}
      recordData={recordData}
    />
  );
};
