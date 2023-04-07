/* eslint-disable
   @typescript-eslint/no-unsafe-member-access

*/

import { useState } from "react";
import type { AppProps } from "next/app";
import { type AppType } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  SessionContextProvider,
  useUser,
} from "@supabase/auth-helpers-react";
import { cookieOptions } from "../utils/cookie-options";

import { appWithTranslation } from "next-i18next";
import { i18nConfig } from "../../next-i18next.config.mjs";

import { api } from "../utils/api";

import { missingKeyHandler } from "../utils/i18n-utils";
import "../utils/zod-meta";
import { useFlags } from "../flags/client";
import { FlagBagProvider } from "@happykit/flags/context";
import { Toaster } from "@/components/ui/toaster";

import "../styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
import { TooltipProvider } from "@/components/ui/tooltip";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient({ cookieOptions })
  );
  const user = useUser();
  const flagBag = useFlags({ user: { key: user?.id || "" } });

  return (
    <FlagBagProvider value={flagBag}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <TooltipProvider>
          <Component {...pageProps} />
        </TooltipProvider>
        <Toaster />
      </SessionContextProvider>
    </FlagBagProvider>
  );
};

const I18nApp = appWithTranslation(MyApp, {
  ...i18nConfig,
  missingKeyHandler,
});
export default api.withTRPC(I18nApp);
