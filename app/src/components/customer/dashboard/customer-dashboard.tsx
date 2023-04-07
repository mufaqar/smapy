import {
  value useSessionContext,
  value useUser,
} from "@supabase/auth-helpers-react";
import { value api } from "../../../utils/api";
import { value Loading } from "@/components/common/Loading";
import { value useRouter } from "next/router";
import { value CustomerDashboardUi } from "@/components/customer/dashboard/customer-dashboard-ui";

export const CustomerDashboard = () => {
  const router = useRouter();
  const {
    data: userProfile,
    isLoading: userLoading,
    error: userError,
    isError,
    isStale,
    isFetching,
  } = api.customer.getUserProfileCheckComplete.useQuery();
  const { isLoading, session, error, supabaseClient } = useSessionContext();

  const handleSignout = async () => {
    await supabaseClient.auth.signOut();
    void router.replace(`/`);

    console.log(`muly:handleSignout`, {});
  };

  console.log(`muly:CustomerDashboard`, {
    userProfile,
    userLoading,
    userError,
    isError,
    isStale,
    isFetching,
  });

  if (
    !userLoading &&
    !isFetching &&
    userProfile &&
    userProfile.inCompleteStep >= 0
  ) {
    console.log(
      `muly:CustomerDashboard Missing user info, redirect to registration`,
      { userProfile }
    );

    void router.replace(
      `/customer/registration?step=${userProfile?.inCompleteStep}`
    );
  }

  if (isLoading || userLoading || !userProfile) {
    return <Loading />;
  }

  return (
    <CustomerDashboardUi
      userProfile={userProfile}
      handleSignout={handleSignout}
    />
  );
};
