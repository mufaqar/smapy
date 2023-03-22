/* eslint-disable
       @typescript-eslint/require-await
*/

import { UserId } from "@/components/auth/user-id";
import { OTP } from "@/components/auth/otp";

const meta = {
  component: UserId,
};

export default meta;

export const Customer = {
  render: () => (
    <UserId
      onSubmit={async (values: any) => {
        console.log(`muly`, { values });
      }}
      role="customer"
    />
  ),
};

export const Advisor = {
  render: () => (
    <UserId
      onSubmit={async (values: any) => {
        console.log(`muly`, { values });
      }}
      role="advisor"
    />
  ),
};

export const OTPS = {
  render: () => (
    <OTP
      onVerifyOTP={async (pin: string) => {
        console.log(`muly:`, { pin });
        return null;
      }}
      role="customer"
    />
  ),
  name: "OTP",
};
