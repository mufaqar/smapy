import { Form } from "../common/forms/Form";
import type { z } from "zod";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import {
  evaluateFormControlCallback,
  usePrepareSchema,
} from "../common/forms/usePrepareSchema";
import type { CustomerRole, LoginValues } from "./user-auth-schema";
import { schemaLogin } from "./user-auth-schema";

const schema = schemaLogin;

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
          {evaluateFormControlCallback(label, formContext)}
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
              text: t("user_id.next") || "",
            },
          }}
        ></Form>
      </div>
    </div>
  );
};
