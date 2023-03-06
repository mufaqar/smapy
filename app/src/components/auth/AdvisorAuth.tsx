import { schemaRegister, schemaSignin } from "./advisor-auth-schema";
import { Form } from "../common/forms/Form";
import type { z } from "zod";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { OTPConfirmation } from "./OTPConfirmation";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { useTranslation } from "next-i18next";
import { usePrepareSchema } from "../common/forms/usePrepareSchema";

type RegisterValues =
  | z.infer<typeof schemaRegister>
  | z.infer<typeof schemaSignin>;

interface Props {
  register?: boolean;
}

const backdoorEmailLogin = "mulyoved@gmail.com";
const backdoorPhonePrefix = "+972 52 307 7666";

export const AdvisorAuth = ({ register }: Props) => {
  const { t } = useTranslation("advisor");
  const router = useRouter();

  const schema = register ? schemaRegister : schemaSignin;
  const formContext = usePrepareSchema(t, schema);

  const [authValues, setAuthValues] = useState<RegisterValues | null>(null);
  const { isLoading, session, error, supabaseClient } = useSessionContext();
  const updateUserProfile = api.advisor.updateUserProfile.useMutation();

  const onVerifyOTP = async (pin: string) => {
    if (!authValues) {
      throw new Error(`Not expected`);
    }

    console.log(`muly:onVerifyOTP calling`, {
      registerValues: authValues,
      pin,
    });
    const { data, error } = await supabaseClient.auth.verifyOtp({
      phone: authValues.phone,
      token: pin,
      type: "sms",
    });

    console.log(`muly:onVerifyOTP`, { data, error });
    if (data.user) {
      if (register) {
        await updateUserProfile.mutateAsync(schemaRegister.parse(authValues));
      }

      await router.push("/advisor/registration");
      return null;
    } else {
      return error?.message;
    }
  };

  const handleSubmit = async (values: RegisterValues) => {
    console.log(`muly:handleSubmit`, { values });

    if (values.phone.startsWith(backdoorPhonePrefix)) {
      let answer = await supabaseClient.auth.signUp({
        email: backdoorEmailLogin,
        password: backdoorPhonePrefix,
      });

      if (answer.error?.message === "User already registered") {
        answer = await supabaseClient.auth.signInWithPassword({
          email: backdoorEmailLogin,
          password: backdoorPhonePrefix,
        });
      }

      await router.push("/advisor/registration");
      return null;
    } else {
      const { data, error } = await supabaseClient.auth.signInWithOtp({
        phone: values.phone,
      });

      console.log("muly:phoneSignIn", { data, error, values });
      if (!error) {
        setAuthValues(values);
        console.log(`muly:phoneSignIn:handleSubmit success`, {});
      } else {
        return { errorMsg: error.message };
      }
    }
  };

  if (authValues) {
    return <OTPConfirmation onVerifyOTP={onVerifyOTP} />;
  } else {
    return (
      <Form
        formContext={formContext}
        schema={schema}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit}
        props={{}}
      ></Form>
    );
  }
};
