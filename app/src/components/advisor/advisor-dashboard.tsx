import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { api } from "../../utils/api";
import { Loading } from "@/components/common/Loading";
import { getUserProfileCheckComplete } from "@/server/api/routers/advisor/account";
import { useRouter } from "next/router";
import { AdvisorPendingRequest } from "./advisor-pending-request";
import { Button } from "@/components/ui/button";

export const AdvisorDashboard = () => {
  const router = useRouter();
  const {
    data: userProfile,
    isLoading: userLoading,
    error: userError,
    isError,
    isStale,
    isFetching,
  } = api.advisor.getUserProfileCheckComplete.useQuery();
  const { isLoading, session, error, supabaseClient } = useSessionContext();

  const handleSignout = async () => {
    await supabaseClient.auth.signOut();
    void router.replace(`/`);

    console.log(`muly:handleSignout`, {});
  };

  console.log(`muly:AdvisorDashboard`, {
    isLoading,
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
      `muly:AdvisorDashboard Missing user info, redirect to registration`,
      { userProfile }
    );

    void router.replace(
      `/advisor/registration?step=${userProfile?.inCompleteStep}`
    );
  }

  if (isLoading || userLoading || !userProfile?.user) {
    return <Loading />;
  }

  if (userProfile.user.advisor_status !== "approved") {
    return <AdvisorPendingRequest />;
  }

  return (
    <div>
      <div>Advisor Dashboard</div>
      <Button onClick={handleSignout}>Sign out</Button>
      <div>USER PROFILE</div>
      <pre>{JSON.stringify(userProfile, null, 2)}</pre>
    </div>
  );
};
