import type { z } from "zod";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { useFlagBag } from "@/flags/client";
import type { CustomerRole, LoginValues } from "./user-auth-schema";
import { schemaLogin } from "./user-auth-schema";
import { OTP } from "./otp";
import { UserId } from "@/components/auth/user-id";
import { FormError } from "@/components/common/forms/useSubmitAction";
import { useTranslation } from "next-i18next";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";

const backdoorEmailLogin = "mulyoved@gmail.com";
const backdoorPhonePrefix = "+972 52 307 7666";

export const UserAuth = () => {
  const { t } = useTranslation("landing-page");

  const formContext = usePrepareSchema(t, schemaLogin);
  const {
    formMeta: {
      meta: { text },
    },
  } = formContext;

  const router = useRouter();
  const { user, debug } = router.query;
  const isAdvisor = user === "advisor";
  const role: CustomerRole = isAdvisor ? "advisor" : "customer";

  const { flags, settled } = useFlagBag();
  const enableBackdoorLogin = flags?.enableBackdoorLogin;

  const [authValues, setAuthValues] = useState<LoginValues | null>(null);
  const { isLoading, session, error, supabaseClient } = useSessionContext();
  const { refetch: advisorRefetch } =
    api.advisor.getUserProfileCheckComplete.useQuery(undefined, {
      enabled: false,
    });
  const { refetch: customerRefetch } =
    api.customer.getUserProfileCheckComplete.useQuery(undefined, {
      enabled: false,
    });

  const preLoginCheckInfo = api.advisor.preLoginCheckInfo.useMutation();

  const checkUserInfo = async () => {
    const refetch = isAdvisor ? advisorRefetch : customerRefetch;
    const userProfile = await refetch();
    console.log(`muly:onVerifyOTP`, { userProfile });

    const url =
      userProfile.data && userProfile.data.inCompleteStep >= 0
        ? {
            pathname: `/${role}/registration`,
            query: {
              step: userProfile.data.inCompleteStep,
              redirectedFrom: router.query.redirectedFrom,
            },
          }
        : String(router.query.redirectedFrom || "");

    await router.replace(url || `/${role}`);
  };

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
      await checkUserInfo();
      return null;
    } else {
      return error?.message;
    }
  };

  const backdoorLogin = async () => {
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

    await checkUserInfo();
    // await router.replace(String(router.query.redirectedFrom) || "/");
  };

  const handleSubmit = async (values: LoginValues) => {
    console.log(`muly:handleSubmit`, { values });

    const checkAnswer = await preLoginCheckInfo.mutateAsync({
      id_card_number: values.id_card_number,
      phone: values.phone,
    });

    console.log(`muly:handleSubmit:checkAnswer`, { checkAnswer });
    if (checkAnswer.error === "mismatch") {
      throw new FormError({
        phone: text?.error_mismatch || "",
      });
    }

    const { data, error } = await supabaseClient.auth.signInWithOtp({
      phone: values.phone,
    });

    console.log("muly:phoneSignIn", { data, error, values });
    if (!error) {
      setAuthValues(values);
      console.log(`muly:phoneSignIn:handleSubmit success`, {});
    } else {
      throw new FormError({ phone: error.message });
    }
  };

  if (authValues || debug?.includes("otp")) {
    return <OTP onVerifyOTP={onVerifyOTP} role={role} />;
  } else {
    return (
      <div>
        <UserId onSubmit={handleSubmit} role={role} />
        {!!enableBackdoorLogin && (
          <button onClick={backdoorLogin}>backdoor</button>
        )}
      </div>
    );
  }
};
