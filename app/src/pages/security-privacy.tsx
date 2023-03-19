import { type NextPage } from "next";
import Head from "next/head";
import { PageNavigationMenu } from "@/components/landing-page/page-navigation-menu";
import Link from "next/link";
import { Accordion } from "@/components/ui/accordion";
import { Faq } from "@/components/ui/faq";
import { FloatingCard } from "@/components/landing-page/floating-card";
import { StepCard } from "@/components/landing-page/step-card";
import { CompanyLogo } from "@/components/landing-page/company-logo";
import { ImageCard } from "@/components/landing-page/image-card";
import { TestimonialCard } from "@/components/landing-page/testimonial-card";
import { ConnectButton } from "@/components/landing-page/connect-button";
import { i18nGetServerSideProps } from "@/utils/i18n-ssr";
import { useTranslation } from "next-i18next";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";
import React from "react";
import {
  EmailIcon,
  LifeInsuranceIcon,
  MortgageInsuranceIcon,
  PhoneOutlineIcon,
  PropertyInsuranceIcon,
  WhatsappIcon,
} from "@/components/landing-page/Icons";
import { Button } from "@/components/ui/button";
import { ProfileCard } from "@/components/landing-page/profile-card";
import { faq } from "@/components/landing-page/faq";
import { SectionContactUs } from "@/components/landing-page/section-contact-us";
import { PriceCard } from "@/components/landing-page/price-card";

export const getServerSideProps = i18nGetServerSideProps(["landing-page"]);

const Security: NextPage = () => {
  const { t } = useTranslation("landing-page");

  return (
    <>
      <Head>
        <title>Smapy</title>
        <meta name="description" content="Smapy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="align- flex flex-col gap-8">
        <PageNavigationMenu />
        <section>
          <h1 className="scroll-m-20 text-6xl font-extrabold tracking-tight lg:text-6xl">
            {t("security.header")}
          </h1>
          <p>{t("security.text")}</p>
        </section>

        <section>
          <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
            {t("security.header2")}
          </h1>
          <p>{t("security.text1")}</p>
          <p>{t("security.text2")}</p>
        </section>

        <section>
          <div className="flex flex-row flex-wrap justify-center gap-8">
            <CompanyLogo
              name={t("security.logo.1")}
              src="/images/security/1.png"
            />
            <CompanyLogo
              name={t("security.logo.2")}
              src="/images/security/2.png"
            />
            <CompanyLogo
              name={t("security.logo.3")}
              src="/images/security/3.png"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Security;
