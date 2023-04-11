import { type NextPage } from "next";
import Head from "next/head";
import { PageNavigationMenu } from "@/components/landing-page/parts/page-navigation-menu";
import { i18nGetServerSideProps } from "@/utils/i18n-ssr";
import { useTranslation } from "next-i18next";
import { Footer } from "@/components/layout/footer";
import React from "react";
import { FAQPage } from "@/components/landing-page/faq";

export const getServerSideProps = i18nGetServerSideProps(["landing-page"]);

const FAQ: NextPage = () => {
  const { t } = useTranslation("landing-page");

  return (
    <>
      <Head>
        <title>Smapy</title>
        <meta name="description" content="Smapy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageNavigationMenu />
      <main className="align-flex  flex-col gap-8">
        <FAQPage />
      </main>
      <Footer />
    </>
  );
};

export default FAQ;
