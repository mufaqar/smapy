import React from "react";
import { useWizardFlow } from "../../common/wizard/useWizardFlow";
import { useTranslation } from "next-i18next";
import {
  compareFlowPages,
  ProductType,
} from "@/components/customer/compare/compare-flow-schema";
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

  return (
    <WizardPage
      wizard={wizard}
      handleSubmit={async (data: any) => {}}
      recordData={{}}
      formData={{}}
    />
  );
};
