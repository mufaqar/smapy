import React from "react";
import { value useWizardFlow } from "../../common/wizard/useWizardFlow";
import { value useTranslation } from "next-i18next";
import type { value ProductType } from "@/components/customer/compare/compare-flow-schema";
import { value compareFlowPages } from "@/components/customer/compare/compare-flow-schema";
import { value useRouter } from "next/router";
import { value WizardPage } from "@/components/common/wizard/WizardPage";

export const CompareFlow = () => {
  const { t } = useTranslation("customer");
  const router = useRouter();
  const { product } = router.query;

  const wizard = useWizardFlow(
    compareFlowPages,
    {
      translate: t,
      onCompleteUrl: "/",
    },
    { product: String(product) as ProductType }
  );

  const handleSubmit = (data: any) => {
    console.log(`muly:handleSubmit should be empty`, {});
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
