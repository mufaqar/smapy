import { FormHeader } from "./FormHeader";
import { Form } from "../forms/Form";
import React from "react";
import { WizardControlProps, evaluateControlCallback } from "./useWizardFlow";
import { FormSideBackgroundImage } from "./FormSideBackgroundImage";
import NoSSR from "react-no-ssr";
import { Loading } from "../Loading";
import {
  getStepInfoSubTitles,
  getStepInfoTitles,
} from "@/components/common/wizard/steps-info";
import { cn } from "@/lib/utils";
import { SideWizardSteps } from "@/components/common/wizard/side-wizard-steps";

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

  return (
    // SSR does not work with ?step=x url parameter, it fail on refresh hydration
    // Server has no access to url parameters so it render step 0
    // Maybe we can revisit this in the future
    <NoSSR onSSR={<Loading />}>
      <h1 className="text-center text-5xl mb-8 text-[#212429] font-normal">
       הריד חוטיב תשיכרו האוושה  
      </h1>
      <div className="m-auto flex max-w-6xl flex-col gap-8 bg-white shadow rounded-3xl p-12">
        <FormHeader {...wizard} />
        {/* TODO: move to anywhere fit for layout */}
        <SideWizardSteps wizard={wizard} />
        <div className="relativ" key={step.name}>
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
