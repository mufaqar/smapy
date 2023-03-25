import { type NextPage } from "next";
import Head from "next/head";
import { PageNavigationMenu } from "@/components/landing-page/parts/page-navigation-menu";
import Link from "next/link";
import { Accordion } from "@/components/ui/accordion";
import { Faq } from "@/components/ui/faq";
import { FloatingCard } from "@/components/landing-page/parts/floating-card";
import { StepCard } from "@/components/landing-page/parts/step-card";
import { CompanyLogo } from "@/components/landing-page/parts/company-logo";
import { ImageCard } from "@/components/landing-page/parts/image-card";
import { TestimonialCard } from "@/components/landing-page/parts/testimonial-card";
import { ConnectButton } from "@/components/landing-page/parts/connect-button";
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
} from "@/components/landing-page/parts/Icons";
import { Button } from "@/components/ui/button";
import { ProfileCard } from "@/components/landing-page/parts/profile-card";

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
      <PageNavigationMenu />
      <main className="align- flex flex-col gap-8">
        <AboutUs />
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
