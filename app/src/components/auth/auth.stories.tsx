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
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-27563&t=Omiw4Kd4jROxXo3N-4",
    },
  },
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
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-44593&t=Omiw4Kd4jROxXo3N-4",
    },
  },
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
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-27645&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
