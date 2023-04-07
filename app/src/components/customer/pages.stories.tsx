import { CustomerDashboardUi } from "@/components/customer/dashboard/customer-dashboard-ui";
import { pause } from "@/utils/pause";

const meta = {
  component: CustomerDashboardUi,
};

export default meta;

export const DashboardUI = {
  render: () => (
    <CustomerDashboardUi
      userProfile={{}}
      handleSignout={async () => {
        await pause(2000);
        console.log(`muly:AdvisorDashboardUi`);
      }}
    />
  ),
};
