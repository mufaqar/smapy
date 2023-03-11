import React from "react";
import { useWizardFlow } from "../../common/wizard/useWizardFlow";
import { useTranslation } from "next-i18next";
import {
  compareFlowPages,
  ProductType,
} from "@/components/customer/compare/compare-flow-schema";
import { useRouter } from "next/router";
import { WizardPage } from "@/components/common/wizard/WizardPage";
import { HowToContactType } from "@/components/customer/contact-us/contact-us-schema";

export const ContactUsFlow = () => {
  const { t } = useTranslation("customer");
  const router = useRouter();
  const { howToContact } = router.query;

  const wizard = useWizardFlow(
    compareFlowPages,
    {
      translate: t,
      onCompleteUrl: "/",
    },
    { howToContact: String(howToContact) as HowToContactType }
  );

  return (
    <WizardPage
      wizard={wizard}
      handleSubmit={async (data: any) => {}}
      recordData={{}}
      formData={{}}
    />
  );
};
