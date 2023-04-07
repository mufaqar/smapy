import { AdvisorPendingRequest } from "@/components/advisor/advisor-pending-request";
import { AdvisorDashboardUi } from "@/components/advisor/dashboard/advisor-dashboard-ui";
import { pause } from "@/utils/pause";

const meta = {
  component: AdvisorDashboardUi,
};

export default meta;

export const DashboardUI = {
  render: () => (
    <AdvisorDashboardUi
      userProfile={{}}
      handleSignout={async () => {
        await pause(2000);
        console.log(`muly:AdvisorDashboardUi`);
      }}
    />
  ),
};

export const PendingRequest = {
  render: () => <AdvisorPendingRequest />,
};
