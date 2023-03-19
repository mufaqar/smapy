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
      <main className="align- flex flex-col gap-8">
        <PageNavigationMenu />
        <section>
          <h1 className="scroll-m-20 text-6xl font-extrabold tracking-tight lg:text-6xl">
            {t("faq.header")}
          </h1>
          <p>{t("faq.text")}</p>
        </section>

        <section>
          <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
            {t("faq.questions.header")}
          </h1>

          <Accordion type="single" collapsible>
            {faq.map(({ q, a }, idx: number) => (
              <Faq key={idx} value={`${idx}`} question={q} answer={a} />
            ))}
          </Accordion>
        </section>

        <SectionContactUs>
          <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
            {t("faq.contact.header")}
          </h1>
          <p>{t("faq.contact.text")}</p>
        </SectionContactUs>
      </main>
      <Footer />
    </>
  );
};

export default FAQ;
