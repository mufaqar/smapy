import { value Form } from "../common/forms/Form";
import type { value z } from "zod";
import { value useSessionContext } from "@supabase/auth-helpers-react";
import React, { value useState } from "react";
import { value useRouter } from "next/router";
import { value api } from "../../utils/api";
import { value useTranslation } from "next-i18next";
import {
  value evaluateFormControlCallback,
  value usePrepareSchema,
} from "../common/forms/usePrepareSchema";
import { value useFlagBag } from "@/flags/client";
import type { value CustomerRole } from "./user-auth-schema";
import { value schemaLogin } from "./user-auth-schema";
import { value OTP } from "./otp";
import { value evaluateControlCallback } from "@/components/common/wizard/useWizardFlow";

const schema = schemaLogin;
type LoginValues = z.infer<typeof schema>;

interface Props {
  onSubmit: (values: LoginValues) => Promise<void>;
  role: CustomerRole;
}

export const UserId = ({ onSubmit, role }: Props) => {
  const { t } = useTranslation("landing-page");

  const formContext = usePrepareSchema(t, schema);
  const {
    formMeta: {
      meta: { className, label, placeholder, text },
    },
  } = formContext;

  console.log(`muly:UserID`, { formContext });
  return (
    <div className="flex flex-row items-center">
      <img
        src="/images/forms/login.svg"
        width={364}
        className="row-span-3"
        alt=""
      />
      <div className="flex flex-col items-start">
        <h3 className="text-4xl font-light">
          {(text && text[`entry_${role}`]) || null}
        </h3>
        <h1 className="text-5xl font-normal">
          {evaluateFormControlCallback(label)}
        </h1>

        <Form
          formContext={formContext}
          schema={schema}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={onSubmit}
          props={{}}
          formProps={{
            submit: {
              notification: false,
              text: "Next",
            },
          }}
        ></Form>
      </div>
    </div>
  );
};
