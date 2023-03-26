import { type NextPage } from "next";
import Head from "next/head";
import { AdvisorDashboard } from "../../components/advisor/dashboard/advisor-dashboard";
import { i18nGetServerSideProps } from "../../utils/i18n-ssr";
import { CustomerDashboard } from "@/components/customer/dashboard/customer-dashboard";

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
        <CustomerDashboard />
      </main>
    </>
  );
};

export default Page;
