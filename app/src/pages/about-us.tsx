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

export const getServerSideProps = i18nGetServerSideProps(["landing-page"]);

const AboutUs: NextPage = () => {
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
            {t("about.header")}
          </h1>
          <Button variant="primary">{t("about.buy")}</Button>
        </section>

        <section>
          <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
            {t("about.tech.header")}
          </h1>
          <p className="text-2xl font-bold tracking-tight lg:text-2xl">
            {t("about.tech.text")}
          </p>
        </section>
        <section>
          <h2 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
            {t("about.vision.header")}
          </h2>
          <h3 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
            {t("about.vision.header_2")}
          </h3>
          <p className="text-2xl font-bold tracking-tight lg:text-2xl">
            {t("about.vision.text")}
          </p>
        </section>

        <section>
          <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
            {t("about.aboutus.header")}
          </h1>
          <div className="flex flex-row flex-wrap justify-center gap-8">
            <ProfileCard
              name={t("about.profile.1.name")}
              role_en={t("about.profile.1.role_en")}
              role_he={t("about.profile.1.role_he")}
              text={t("about.profile.1.text")}
              image="/images/profile/1.png"
            />
            <ProfileCard
              name={t("about.profile.2.name")}
              role_en={t("about.profile.2.role_en")}
              role_he={t("about.profile.2.role_he")}
              text={t("about.profile.2.text")}
              image="/images/profile/2.png"
            />
            <ProfileCard
              name={t("about.profile.3.name")}
              role_en={t("about.profile.3.role_en")}
              role_he={t("about.profile.3.role_he")}
              text={t("about.profile.3.text")}
              image="/images/profile/3.png"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
