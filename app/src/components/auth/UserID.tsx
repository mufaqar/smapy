import { Form } from "../common/forms/Form";
import type { z } from "zod";
import { useSessionContext } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { useTranslation } from "next-i18next";
import {
  evaluateFormControlCallback,
  usePrepareSchema,
} from "../common/forms/usePrepareSchema";
import { useFlagBag } from "@/flags/client";
import type { CustomerRole } from "./user-auth-schema";
import { schemaLogin } from "./user-auth-schema";
import { OTP } from "./OTP";
import { evaluateControlCallback } from "@/components/common/wizard/useWizardFlow";

const schema = schemaLogin;
type LoginValues = z.infer<typeof schema>;

interface Props {
  onSubmit: (values: LoginValues) => Promise<void>;
  role: CustomerRole;
}

export const UserID = ({ onSubmit, role }: Props) => {
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
