import type { Configuration } from "@happykit/flags/config";

// You can replace this with your exact flag types
export type AppFlags = {
  enableBackdoorLogin: boolean;
};

export const config: Configuration<AppFlags> = {
  envKey: process.env.NEXT_PUBLIC_FLAGS_ENV_KEY!,

  // You can provide defaults flag values here
  defaultFlags: {
    enableBackdoorLogin: false,
  },
};
