import { FormHeader } from "./FormHeader";
import { Form } from "../forms/Form";
import React from "react";
import type { WizardControlProps } from "./useWizardFlow";
import { FormSideBackgroundImage } from "./FormSideBackgroundImage";
import NoSSR from "react-no-ssr";
import { Loading } from "../Loading";
import {
  getStepInfoSubTitles,
  getStepInfoTitles,
} from "@/components/common/wizard/steps-info";
import { cn } from "@/lib/utils";

interface Props<T> {
  wizard: WizardControlProps;
  recordData: T;

  formData: any;

  handleSubmit: (data: T) => Promise<void> | void;

  // preprocessField;
}

export const WizardForm = ({
  wizard,
  handleSubmit,
  recordData,
  formData,
}: Props<any>) => {
  const { schema, control, step, formContext } = wizard;

  if (recordData === undefined) {
    return <Loading />;
  }

  // console.log(`muly:WizardForm`, { stepsInfo: wizard.stepsInfo });
  const stepTitles = getStepInfoTitles(wizard.stepsInfo, wizard.stepCode);

  return (
    // SSR does not work with ?step=x url parameter, it fail on refresh hydration
    // Server has no access to url parameters so it render step 0
    // Maybe we can revisit this in the future
    <NoSSR onSSR={<Loading />}>
      <div className="m-auto flex max-w-6xl flex-col gap-8">
        <FormHeader {...wizard} />
        {stepTitles.length > 0 && (
          <div>
            STEPS{" "}
            <div className="flex flex-row gap-2">
              {stepTitles.map(({ title, status }) => (
                <div
                  key={title}
                  className={cn([
                    { "font-bold": status === "done" },
                    { "text-red-300": status === "next" },
                  ])}
                >
                  {title}
                </div>
              ))}
            </div>
          </div>
        )}
        <div>
          SUB STEPS{" "}
          <div className="flex flex-row gap-2">
            {getStepInfoSubTitles(wizard.stepsInfo, wizard.stepCode).map(
              ({ title, status }) => (
                <div
                  key={title}
                  className={cn([
                    { "font-bold": status === "done" },
                    { "text-gray-300": status === "next" },
                  ])}
                >
                  {title}
                </div>
              )
            )}
          </div>
        </div>
        <div className="relative" key={step.name}>
          {!!control ? (
            control(wizard)
          ) : (
            <Form
              formContext={{ ...formContext, flowContext: wizard }}
              schema={schema}
              onSubmit={handleSubmit}
              // preprocessField={preprocessField}
              // props={{
              //   bank_name: {
              //     choices: sampleBankList,
              //   },
              // }}
              defaultValues={formData || recordData}
              formProps={{
                submit: {
                  notification: false,
                  text: "Next",
                },
              }}
            />
          )}

          <FormSideBackgroundImage image={step.meta.props?.image} />
        </div>
        {/*<pre>{JSON.stringify(recordData, null, 2)}</pre>*/}
      </div>
    </NoSSR>
  );
};
