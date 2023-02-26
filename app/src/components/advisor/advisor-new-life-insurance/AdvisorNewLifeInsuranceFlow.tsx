import type { z } from "zod";
import { Box, VStack } from "@chakra-ui/react";
import { api } from "../../../utils/api";
import React, { useState } from "react";
import { Form } from "../../common/forms/Form";
import { useWizardFlow } from "../../common/wizard/useWizardFlow";
import type { UseFormReturn } from "react-hook-form";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { FormHeader } from "../../common/wizard/FormHeader";
import { AdvisorNewLifeInsuranceSchema } from "./advisor-new-life-insurance-schema";
import { WelcomePage } from "./WelcomePage";
import { queryTypes, useQueryState, useQueryStates } from "next-usequerystate";
import { WizardForm } from "../../common/wizard/WizardForm";

type RecordType = z.infer<typeof AdvisorNewLifeInsuranceSchema>;

export const AdvisorNewLifeInsuranceFlow = () => {
  const { t } = useTranslation("advisor");
  const [id, setId] = useQueryState<string>("id", {
    history: "replace",
    parse: String,
  });

  const wizard = useWizardFlow(AdvisorNewLifeInsuranceSchema, {
    translate: t,
    onCompleteUrl: "/advisor/dashboard",
  });

  const { onStepNext, control, step, schema } = wizard;
  const [recordData, setRecordData] = useState<RecordType>();

  // we enable query also for new empty id, solve hydration issue
  const { data, isLoading } = api.advisor.getLifeInsurance.useQuery(id, {
    onSuccess: setRecordData,
  });

  const updateUserProfile = api.advisor.updateLifeInsurance.useMutation();

  const handleSubmit = async (values: RecordType) => {
    console.log(`muly:handleSubmit`, { values });
    const answer = await updateUserProfile.mutateAsync({ id, values });
    if (answer.id !== id) {
      await setId(answer.id);
    }
    setRecordData(answer);
    await onStepNext();
  };

  if (isLoading) {
    return null;
  }

  // const preprocessField = (name: string, form: UseFormReturn, props: any) => {
  //   // console.log(`muly:preprocessField ${name}`, { form, props });
  //   // if (props.description.after) {
  //   //   props.afterElement = map(name);
  //   // }
  // };

  console.log(`muly:AdvisorNewLifeInsuranceFlow`, { recordData });

  return (
    <WizardForm
      t={t}
      wizard={wizard}
      handleSubmit={handleSubmit}
      recordData={recordData}
    />
  );
};
