import { WizardControlProps } from "@/components/common/wizard/useWizardFlow";

export const SendLinksHeader = ({ wizard }: { wizard: WizardControlProps }) => {
  return (
    <div>
      <div className="flex flex-row gap-36">
        <div className="flex flex-col">
          <div>Image 1</div>
          <div>{wizard.step.meta.text?.imageTitle1 || null}</div>
        </div>
        <div className="flex flex-col">
          <div>Image 2</div>
          <div>{wizard.step.meta.text?.imageTitle2 || null}</div>
        </div>
      </div>
      <div>{wizard.step.meta.text?.subTitle2 || null}</div>
    </div>
  );
};
