import { HowDoesItWorkCard } from "@/components/common/controls/how-does-it-work-card";
import type { WizardControlProps } from "@/components/common/wizard/useWizardFlow";
import type { ProductType } from "@/components/customer/compare/compare-flow-schema";

interface Props extends WizardControlProps {
  product: ProductType;
}

export const HowDoesItWork = ({ product, onStepNext, step, props }: Props) => {
  console.log(`muly:HowDoesItWork`, { step });

  const next = step.meta.text?.next || null;

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex grid-cols-4 flex-row flex-wrap justify-center gap-8 lg:grid">
          {[1, 2, 3, 4].map((idx) => (
            <HowDoesItWorkCard
              key={idx}
              idx={idx}
              image={`/images/how-does-it-work/${idx}.svg`}
              text={
                step.meta.text?.[
                  `text_${idx === 4 ? `${product}${idx}` : idx}`
                ] || ""
              }
            />
          ))}
        </div>
        <button
          onClick={onStepNext}
          className="mt-6 rounded-[18px] bg-gradient-to-r from-[rgba(254,5,85,1)] to-[rgba(255,135,0,1)] p-3 px-20 text-base text-white hover:bg-gradient-to-r hover:from-[#cc0d41] hover:to-[#db6c06]"
        >
          {next}
        </button>
      </div>
      
    </>
  );
};
