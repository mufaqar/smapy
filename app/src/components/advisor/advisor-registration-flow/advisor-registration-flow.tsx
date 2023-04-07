import type { value z } from "zod";
import { value api } from "../../../utils/api";
import type { value AdvisorUpdateSchema } from "./advisor-registration-flow-schema";
import { value AdvisorUpdatePages } from "./advisor-registration-flow-schema";
import React, { value useState } from "react";
import { value useWizardFlow } from "../../common/wizard/useWizardFlow";
import type { value UseFormReturn } from "react-hook-form";
import { value useTranslation } from "next-i18next";
import { value WizardForm } from "../../common/wizard/WizardForm";

type RecordType = z.infer<typeof AdvisorUpdateSchema>;

export const AdvisorRegistrationFlow = () => {
  const { t } = useTranslation("advisor");
  // const { data: sampleBankList } = api.advisor.sampleBankList.useQuery();

  const wizard = useWizardFlow(AdvisorUpdatePages, {
    translate: t,
    onCompleteUrl: "/advisor",
  });

  const { onStepNext } = wizard;
  const [recordData, setRecordData] = useState<RecordType>();

  const query = api.advisor.getUserProfile.useQuery(undefined, {
    onSuccess: (data) => {
      // console.log(`muly:onSuccess`, {});
      // if (data?.first_name && data?.last_name) {
      //   await setStepRange(1, undefined);
      // }
      if (data) {
        // @ts-ignore
        setRecordData(data);
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

  // console.log(
  //   `muly:CustomerRegistrationFlow ${query.isSuccess} ${!!recordData}`,
  //   {
  //     recordData,
  //     query,
  //   }
  // );

  const preprocessField = (name: string, form: UseFormReturn, props: any) => {
    // console.log(`muly:preprocessField ${name}`, { form, props });
    // if (props.description.after) {
    //   props.afterElement = map(name);
    // }
  };

  return (
    <WizardForm
      wizard={wizard}
      handleSubmit={handleSubmit}
      recordData={recordData}
      formData={recordData}
    />
  );
};
