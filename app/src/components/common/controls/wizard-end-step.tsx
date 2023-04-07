import { value ProductType } from "@/components/customer/compare/compare-flow-schema";
import type { value WizardControlProps } from "@/components/common/wizard/useWizardFlow";
import { value evaluateControlCallback } from "@/components/common/wizard/useWizardFlow";
import React from "react";
import { value useTranslation } from "next-i18next";

interface Props {
  children?: React.ReactNode;
  wizard: WizardControlProps;
}

export const WizardEndStep = ({ children, wizard }: Props) => {
  const { onStepNext, step } = wizard;
  const { t } = useTranslation("common");

  const title = evaluateControlCallback(step.meta.label, wizard);
  const subTitle = step.meta.placeholder || null;
  const text1 = step.meta.text?.text1 || null;
  const text2 = step.meta.text?.text2 || null;

  return (
    <div className="flex flex-col items-center text-2xl">
      <div
        className="flex flex-col items-center"
        style={{
          background: "linear-gradient(90deg, #FF8700 0%, #FE0555 100%)",
        }}
      >
        <h2 className="text-center text-4xl font-bold">{title}</h2>
        <h3 className="text-center text-4xl font-light">{subTitle}</h3>
        <p>{text1}</p>
        <img src="/images/end.svg" alt="" />
      </div>
      <p>{text2}</p>
      {children}
      <button onClick={onStepNext}>{t("wizard.end.button", "End")}</button>
    </div>
  );
};
