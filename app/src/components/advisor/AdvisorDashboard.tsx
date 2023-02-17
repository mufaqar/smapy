import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { Box, Button, Stack } from "@chakra-ui/react";
import { api } from "../../utils/api";

export const AdvisorDashboard = () => {
  const { data: userProfile } = api.advisor.getUserProfile.useQuery();
  const { isLoading, session, error, supabaseClient } = useSessionContext();

  const handleSignout = () => {
    supabaseClient.auth.signOut();
    console.log(`muly:handleSignout`, {});
  };

  return (
    <Stack>
      <Box>Advisor Dashboard</Box>
      <Button onClick={handleSignout}>Sign out</Button>
      <Box>USER PROFILE</Box>
      <pre>{JSON.stringify(userProfile, null, 2)}</pre>
    </Stack>
  );
};
