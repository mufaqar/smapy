import { type NextPage } from "next";
import Head from "next/head";
import { AdvisorRegistrationFlow } from "../../components/advisor/advisor-registration-flow/advisor-registration-flow";
import { i18nGetServerSideProps } from "../../utils/i18n-ssr";

export const getServerSideProps = i18nGetServerSideProps(["customer"]);

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Smapy</title>
        <meta name="description" content="Smapy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>Customer registration flow, TBD</div>
      </main>
    </>
  );
};

export default Page;
