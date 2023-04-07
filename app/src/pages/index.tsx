import { type NextPage } from "next";
import Head from "next/head";
import { PageNavigationMenu } from "@/components/landing-page/parts/page-navigation-menu";
import { i18nGetServerSideProps } from "@/utils/i18n-ssr";
import { Footer } from "@/components/layout/footer";
import React from "react";
import { Home } from "@/components/landing-page/home";

export const getServerSideProps = i18nGetServerSideProps(["landing-page"]);

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Smapy</title>
        <meta name="description" content="Smapy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageNavigationMenu />
      <main className="flex flex-col gap-8">
        <Home />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
