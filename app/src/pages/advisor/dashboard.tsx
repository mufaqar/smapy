import { type NextPage } from "next";
import Head from "next/head";
import { AdvisorDashboard } from "../../components/advisor/AdvisorDashboard";
import { i18nGetServerSideProps } from "../../utils/i18n-ssr";

export const getServerSideProps = i18nGetServerSideProps(["advisor"]);

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
