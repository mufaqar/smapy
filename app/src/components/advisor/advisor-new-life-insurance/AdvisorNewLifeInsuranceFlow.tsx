import { api } from "../../../utils/api";
import React, { useState } from "react";
import { useWizardFlow } from "../../common/wizard/useWizardFlow";
import { useTranslation } from "next-i18next";
import { AdvisorNewLifeInsurancePages } from "./advisor-new-life-insurance-schema";
import { useQueryState } from "next-usequerystate";
import { WizardForm } from "../../common/wizard/WizardForm";
import type { LifeInsuranceType } from "../../../server/api/routers/advisor/life-insurance";

export const AdvisorNewLifeInsuranceFlow = () => {
  const { t } = useTranslation("advisor");
  const [id, setId] = useQueryState<string>("id", {
    history: "replace",
    parse: String,
  });

  const [recordData, setRecordData] = useState<LifeInsuranceType | null>(null);

  // we enable query also for new empty id, solve hydration issue
  const { data, isLoading } = api.advisor.getLifeInsurance.useQuery(id, {
    onSuccess: (data) => setRecordData(data || null),
  });

  const wizard = useWizardFlow(AdvisorNewLifeInsurancePages, {
    recordData,
    translate: t,
    onCompleteUrl: "/advisor/dashboard",
  });

  const { onStepNext, control, step, schema } = wizard;

  const updateLifeInsurance = api.advisor.updateLifeInsurance.useMutation();
  const createLifeInsurance = api.advisor.createLifeInsurance.useMutation();

  let formData;
  const regexCustomer = /customer(\d)/gm;
  const matchCustomer = regexCustomer.exec(step.name);
  const idxCustomer = matchCustomer ? Number(matchCustomer[1]) : 0;
  let lifeInsuranceCustomer = recordData?.lifeInsuranceCustomer;

  const regexTrack = /track(\d)/gm;
  const matchTrack = regexTrack.exec(step.name);
  const idxTrack = matchTrack ? Number(matchTrack[1]) : 0;
  let loan_tracks = recordData?.loan_tracks;

  const matchSendLinks = step.name === "sendLinksToComplete";

  if (matchCustomer && recordData) {
    if (!lifeInsuranceCustomer) {
      lifeInsuranceCustomer = [];
    }

    formData = lifeInsuranceCustomer[idxCustomer]?.customer || {
      birthDate: new Date(),
    };
  } else if (matchTrack && recordData) {
    if (!loan_tracks) {
      loan_tracks = [];
    }

    formData = loan_tracks[idxTrack] || {};
  } else if (matchSendLinks && recordData && recordData.lifeInsuranceCustomer) {
    formData = {
      email_customer1: recordData.lifeInsuranceCustomer[0]?.customer.email,
      phone_customer1: recordData.lifeInsuranceCustomer[0]?.customer.phone,
      email_customer2: recordData.lifeInsuranceCustomer[1]?.customer.email,
      phone_customer2: recordData.lifeInsuranceCustomer[1]?.customer.phone,
      number_of_customers: recordData.number_of_customers,
      details_approval: recordData.details_approval,
    };
  } else {
    formData = recordData;
  }

  const handleSubmit = async (values: any) => {
    console.log(`muly:handleSubmit`, { values });
    let answer;
    if (step.name === "numberOfCustomers" && !recordData) {
      answer = await createLifeInsurance.mutateAsync(values);
    } else {
      if (!recordData) {
        throw new Error(`Invalid state, missing recordData`);
      }

      let data;
      if (matchCustomer && lifeInsuranceCustomer) {
        lifeInsuranceCustomer[idxCustomer] = {
          ...lifeInsuranceCustomer[idxCustomer],
          sort: idxCustomer,
          customer: {
            ...lifeInsuranceCustomer[idxCustomer]?.customer,
            ...values,
          },
        };

        data = {
          ...recordData,
          lifeInsuranceCustomer,
        };
      } else if (matchTrack && loan_tracks) {
        loan_tracks[idxTrack] = {
          ...loan_tracks[idxTrack],
          ...values,
        };

        data = {
          ...recordData,
          loan_tracks,
        };
      } else if (matchSendLinks && recordData.lifeInsuranceCustomer) {
        if (recordData.lifeInsuranceCustomer[0]?.customer) {
          recordData.lifeInsuranceCustomer[0].customer.phone =
            values.phone_customer1;
          recordData.lifeInsuranceCustomer[0].customer.email =
            values.email_customer1;
        }
        if (recordData.lifeInsuranceCustomer[1]?.customer) {
          recordData.lifeInsuranceCustomer[1].customer.phone =
            values.phone_customer2;
          recordData.lifeInsuranceCustomer[1].customer.email =
            values.email_customer2;
        }

        data = {
          ...recordData,
          details_approval: values.details_approval,
        };
      } else {
        data = {
          ...recordData,
          ...values,
        };
      }

      console.log(`muly:handleSubmit BEFORE`, { values, recordData, data });
      answer = await updateLifeInsurance.mutateAsync(data);
    }

    if (answer.id !== id) {
      await setId(answer.id);
    }
    setRecordData(answer);
    await onStepNext(answer);
  };

  // const preprocessField = (name: string, form: UseFormReturn, props: any) => {
  //   // console.log(`muly:preprocessField ${name}`, { form, props });
  //   // if (props.description.after) {
  //   //   props.afterElement = map(name);
  //   // }
  // };

  console.log(`muly:AdvisorNewLifeInsuranceFlow isLoading:${isLoading}`, {
    recordData,
    formData,
    wizard,
  });

  return (
    <WizardForm
      wizard={wizard}
      handleSubmit={handleSubmit}
      recordData={recordData}
      formData={formData}
    />
  );
};
