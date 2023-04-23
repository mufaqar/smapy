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
import PageBanner from "../landing-page/page-banner";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../layout/footer";

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
    <>
      <section
        className="flex h-[450px] flex-col items-center justify-start bg-cover bg-right-bottom bg-no-repeat px-4 "
        style={{
          backgroundImage: `url("/images/rectangle-26.png")`,
        }}
      >
        <div className="container mx-auto pt-10">
          <Link href="/">
            <Image
              src="/images/mobile-logo.svg"
              width={250}
              height={100}
              alt="logo"
            />
          </Link>
        </div>
      </section>
      <section className="p-8">
        <div className="mx-auto -mt-[300px] flex max-w-[1020px] flex-col items-center gap-20 rounded-3xl bg-white p-10 shadow md:flex-row lg:p-20">
          <img
            src="/images/forms/login.svg"
            width={364}
            className="row-span-3"
            alt=""
          />
          <div className="flex flex-col items-start">
            <h3 className="text-2xl font-light">
              {(text && text[`entry_${role}`]) || null}
            </h3>
            <h1 className="mb-8 text-4xl font-semibold">
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
      </section>
      <div className="relative mt-80 md:mt-20">
        <Image
          src="/images/shape/bg-r-design.svg"
          className="absolute -top-40"
          width={130}
          height={100}
          alt="shape"
        />
        <Image
          src="/images/faq-shape.svg"
          className="absolute left-0 -top-60"
          width={130}
          height={100}
          alt="shape"
        />
      </div>
      <Footer />
    </>
  );
};
