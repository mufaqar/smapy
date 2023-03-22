import { type NextPage } from "next";
import Head from "next/head";

import { UserAuth } from "../components/auth/user-auth";
import { i18nGetServerSideProps } from "../utils/i18n-ssr";

export const getServerSideProps = i18nGetServerSideProps(["landing-page"]);

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Smapy</title>
        <meta name="description" content="Smapy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <UserAuth />
      </main>
    </>
  );
};

export default Page;
