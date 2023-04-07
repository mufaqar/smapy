import { value Button } from "@/components/ui/button";

interface Props {
  handleSignout: () => Promise<void>;
  userProfile: any;
}

export const CustomerDashboardUi = ({ userProfile, handleSignout }: Props) => {
  return (
    <div>
      <div>TBD - Customer Dashboard</div>
      <Button onClick={handleSignout}>Sign out</Button>
      <div>USER PROFILE</div>
      <pre>{JSON.stringify(userProfile, null, 2)}</pre>
    </div>
  );
};
