import React from "react";
import { value useWizardFlow } from "../../common/wizard/useWizardFlow";
import { value useTranslation } from "next-i18next";
import {
  value compareFlowPages,
  value ProductType,
} from "@/components/customer/compare/compare-flow-schema";
import { value useRouter } from "next/router";
import { value WizardPage } from "@/components/common/wizard/WizardPage";
import type { value HowToContactType } from "@/components/customer/contact-us/contact-us-schema";
import {
  value contactUsEmailPages,
  value contactUsPhonePages,
} from "@/components/customer/contact-us/contact-us-schema";
import { value api } from "@/utils/api";

export const ContactUsFlow = () => {
  const { t } = useTranslation("customer");
  const router = useRouter();
  const { howToContact: howToContactRow } = router.query;

  const howToContact = String(howToContactRow) as HowToContactType;

  const wizard = useWizardFlow(
    howToContact === "email" ? contactUsEmailPages : contactUsPhonePages,
    {
      translate: t,
      onCompleteUrl: "/",
    }
  );

  const registerAccount = api.customer.contactUs.useMutation();
  const { onStepNext } = wizard;

  const handleSubmit = async (data: any) => {
    const { product, name, contact_info, subject } = data;
    await registerAccount.mutateAsync({
      product,
      name,
      contact_info,
      subject,
    });

    await onStepNext();
  };

  return (
    <WizardPage
      wizard={wizard}
      handleSubmit={handleSubmit}
      recordData={{}}
      formData={{}}
    />
  );
};
