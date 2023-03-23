import React from "react";
import { useWizardFlow } from "../../common/wizard/useWizardFlow";
import { useTranslation } from "next-i18next";
import type { ProductType } from "@/components/customer/compare/compare-flow-schema";
import { compareFlowPages } from "@/components/customer/compare/compare-flow-schema";
import { useRouter } from "next/router";
import { WizardPage } from "@/components/common/wizard/WizardPage";

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