import { Form } from "../common/forms/Form";
import type { z } from "zod";
import { useTranslation } from "next-i18next";
import {
  value evaluateFormControlCallback,
  value usePrepareSchema,
} from "../common/forms/usePrepareSchema";
import type { CustomerRole } from "./user-auth-schema";
import { schemaOTP } from "./user-auth-schema";
import { FormError } from "../common/forms/useSubmitAction";

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
    <div className="flex flex-row items-center">
      <img
        src="/images/forms/otp.svg"
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
          onSubmit={handleVerifyOTP}
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
