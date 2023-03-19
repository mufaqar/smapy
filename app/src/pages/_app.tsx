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
  Session,
} from "@supabase/auth-helpers-react";
import { appWithTranslation } from "next-i18next";
import { i18nConfig } from "../../next-i18next.config.mjs";

import { api } from "../utils/api";
import { ChakraProvider } from "@chakra-ui/react";

import "../styles/globals.css";

import { theme } from "../components/chakra-ui-theme";
import { cookieOptions } from "../utils/cookie-options";
import { missingKeyHandler } from "../utils/i18n-utils";
import "../utils/zod-meta";
import { useFlags } from "../flags/client";
import { FlagBagProvider } from "@happykit/flags/context";

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
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionContextProvider>
    </FlagBagProvider>
  );
};

const I18nApp = appWithTranslation(MyApp, {
  ...i18nConfig,
  missingKeyHandler,
});
export default api.withTRPC(I18nApp);
