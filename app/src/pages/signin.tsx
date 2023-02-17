import { type NextPage } from "next";
import Head from "next/head";

import { AdvisorAuth } from "../components/auth/AdvisorAuth";
const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Smapy</title>
        <meta name="description" content="Smapy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AdvisorAuth />
      </main>
    </>
  );
};

export default Page;
