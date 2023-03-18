import React from "react";
import { useWizardFlow } from "../../common/wizard/useWizardFlow";
import { useTranslation } from "next-i18next";
import {
  compareFlowPages,
  ProductType,
} from "@/components/customer/compare/compare-flow-schema";
import { useRouter } from "next/router";
import { WizardPage } from "@/components/common/wizard/WizardPage";
import {
  contactUsEmailPages,
  contactUsPhonePages,
  HowToContactType,
} from "@/components/customer/contact-us/contact-us-schema";
import { api } from "@/utils/api";

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
