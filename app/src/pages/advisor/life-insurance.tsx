import { type NextPage } from "next";
import Head from "next/head";

import { i18nGetServerSideProps } from "../../utils/i18n-ssr";
import { AdvisorLifeInsuranceFlow } from "../../components/advisor/advisor-life-insurance/advisor-life-insurance-flow";

export const getServerSideProps = i18nGetServerSideProps(["advisor"]);

const Page: NextPage = (props) => {
  console.log(`muly:Page`, { props });

  return (
    <>
      <Head>
        <title>Smapy</title>
        <meta name="description" content="Smapy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AdvisorLifeInsuranceFlow />
      </main>
    </>
  );
};

export default Page;
