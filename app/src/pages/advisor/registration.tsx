import { type NextPage } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18nConfig } from "../../../next-i18next.config.mjs";

import { AdvisorRegistrationFlow } from "../../components/advisor/advisor-registration-flow/AdvisorRegistrationFlow";
import { i18nGetServerSideProps } from "../../utils/i18n-ssr";

export const getServerSideProps = i18nGetServerSideProps;

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Smapy</title>
        <meta name="description" content="Smapy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AdvisorRegistrationFlow />
      </main>
    </>
  );
};

export default Page;
