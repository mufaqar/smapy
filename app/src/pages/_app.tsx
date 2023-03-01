/* eslint-disable
   @typescript-eslint/no-unsafe-member-access

*/

import { useState } from "react";
import type { AppProps } from "next/app";
import { type AppType } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { appWithTranslation } from "next-i18next";
import { i18nConfig } from "../../next-i18next.config.mjs";

import { api } from "../utils/api";
import { ChakraProvider } from "@chakra-ui/react";

import "../styles/globals.css";

import { theme } from "../components/chakra-ui-theme";
import { cookieOptions } from "../utils/cookie-options";
import { missingKeyHandler } from "../utils/i18n-utils";
import "../utils/zod-meta";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient({ cookieOptions })
  );

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionContextProvider>
  );
};

const I18nApp = appWithTranslation(MyApp, {
  ...i18nConfig,
  missingKeyHandler,
});
export default api.withTRPC(I18nApp);
