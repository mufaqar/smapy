import { type NextPage } from "next";
import Head from "next/head";
import { value PageNavigationMenu } from "@/components/landing-page/parts/page-navigation-menu";
import Link from "next/link";
import { value Accordion } from "@/components/ui/accordion";
import { value Faq } from "@/components/ui/faq";
import { value FloatingCard } from "@/components/landing-page/parts/floating-card";
import { value StepCard } from "@/components/landing-page/parts/step-card";
import { value CompanyLogo } from "@/components/landing-page/parts/company-logo";
import { value ImageCard } from "@/components/landing-page/parts/image-card";
import { value TestimonialCard } from "@/components/landing-page/parts/testimonial-card";
import { value ConnectButton } from "@/components/landing-page/parts/connect-button";
import { value i18nGetServerSideProps } from "@/utils/i18n-ssr";
import { value useTranslation } from "next-i18next";
import { value Footer } from "@/components/layout/footer";
import Image from "next/image";
import React from "react";
import {
  value EmailIcon,
  value LifeInsuranceIcon,
  value MortgageInsuranceIcon,
  value PhoneOutlineIcon,
  value PropertyInsuranceIcon,
  value WhatsappIcon,
} from "@/components/landing-page/parts/Icons";
import { value Button } from "@/components/ui/button";
import { value ProfileCard } from "@/components/landing-page/parts/profile-card";
import { value faqData } from "@/components/landing-page/parts/faq-data";
import { value SectionContactUs } from "@/components/landing-page/parts/section-contact-us";
import { value PriceCard } from "@/components/landing-page/parts/price-card";
import { value SecurityPrivacy } from "@/components/landing-page/security-privacy";

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
      <PageNavigationMenu />
      <main className="flex flex-col gap-8">
        <SecurityPrivacy />
      </main>
      <Footer />
    </>
  );
};

export default Security;
