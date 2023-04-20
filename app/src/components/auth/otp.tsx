import { Form } from "../common/forms/Form";
import type { z } from "zod";
import { useTranslation } from "next-i18next";
import {
  evaluateFormControlCallback,
  usePrepareSchema,
} from "../common/forms/usePrepareSchema";
import type { CustomerRole } from "./user-auth-schema";
import { schemaOTP } from "./user-auth-schema";
import { FormError } from "../common/forms/useSubmitAction";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../layout/footer";

const schema = schemaOTP;
type OTPValues = z.infer<typeof schema>;

interface Props {
  role: CustomerRole;
  onVerifyOTP: (pin: string) => Promise<string | null | undefined>;
}

export const OTP = ({ role, onVerifyOTP }: Props) => {
  const { t } = useTranslation("landing-page");
  const formContext = usePrepareSchema(t, schema);

  const handleVerifyOTP = async (values: OTPValues) => {
    console.log(`muly:OTP:handleVerifyOTP A`, { values });
    const error = await onVerifyOTP(values.pin);
    console.log(`muly:OTP:handleVerifyOTP done`, { error });
    // return error;
    if (error) {
      throw new FormError({ pin: error });
    }
  };

  const {
    formMeta: {
      meta: { className, label, placeholder, text },
    },
  } = formContext;

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
      <section className="p-8" >
      <div className="flex flex-col md:flex-row bg-white shadow rounded-3xl gap-20 -mt-[300px] mx-auto max-w-[1020px] p-10 lg:p-24 items-center">

        <img
          src="/images/forms/otp.svg"
          width={364}
          className="row-span-3"
          alt=""
        />
        <div className="flex flex-col items-start">
        <h3 className="text-2xl font-light">
            {(text && text[`entry_${role}`]) || null}
          </h3>
          <h1 className="text-4xl font-semibold mb-2">
            {evaluateFormControlCallback(label)}
          </h1>
          <span className="mb-8">[PLACEHOLDER] message was sent to xxx...</span>

          <Form
            formContext={formContext}
            schema={schema}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleVerifyOTP}
            props={{}}
            formProps={{
              submit: {
                notification: false,
                text: t("otp.next") || "",
              },
            }}
          ></Form>
        </div>
      </div>
      </section>
      <div className="relative mt-80 md:mt-20">
        <Image src="/images/shape/bg-r-design.svg" className="absolute -top-40" width={130} height={100} alt="shape"/>
        <Image src="/images/faq-shape.svg" className="absolute left-0 -top-60" width={130} height={100} alt="shape"/>
      </div>
      <Footer />

    </>
  );
};
