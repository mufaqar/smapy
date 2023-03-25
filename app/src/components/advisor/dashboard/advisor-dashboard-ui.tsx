import { Button } from "@/components/ui/button";

interface Props {
  handleSignout: () => Promise<void>;
  userProfile: any;
}

export const AdvisorDashboardUi = ({ userProfile, handleSignout }: Props) => {
  return (
    <div>
      <div>Advisor Dashboard</div>
      <Button onClick={handleSignout}>Sign out</Button>
      <div>USER PROFILE</div>
      <pre>{JSON.stringify(userProfile, null, 2)}</pre>
    </div>
  );
};
