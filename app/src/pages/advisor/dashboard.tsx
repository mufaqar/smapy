import { type NextPage } from "next";
import Head from "next/head";
import { AdvisorDashboard } from "../../components/advisor/AdvisorDashboard";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Smapy</title>
        <meta name="description" content="Smapy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AdvisorDashboard />
      </main>
    </>
  );
};

export default Page;
