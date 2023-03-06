import { type NextPage } from "next";
import Head from "next/head";

import { AdvisorAuth } from "../components/auth/AdvisorAuth";
import { i18nGetServerSideProps } from "../utils/i18n-ssr";

export const getServerSideProps = i18nGetServerSideProps(["advisor"]);

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Affiliates create account</title>
        <meta name="description" content="Affiliates Creative Materials" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AdvisorAuth register />
      </main>
    </>
  );
};

export default Page;
