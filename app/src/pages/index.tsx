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
import { SectionContactUs } from "@/components/landing-page/section-contact-us";
import { faq } from "@/components/landing-page/faq";

export const getServerSideProps = i18nGetServerSideProps(["landing-page"]);

const Home: NextPage = () => {
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
            {t("index.header")}
          </h1>
          <p className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-3xl">
            {t("index.header_2")}
          </p>

          <div className="flex flex-col items-center gap-4">
            <FloatingCard
              icon={<LifeInsuranceIcon />}
              title={t("index.floating.1")}
              linkText={t('index.floating.link_text')}
              href="/compare/life"
            ></FloatingCard>
            <FloatingCard
              icon={<MortgageInsuranceIcon />}
              title={t("index.floating.2")}
              linkText={t('index.floating.link_text')}
              href="/compare/mortgage"
            ></FloatingCard>
            <FloatingCard
              icon={<PropertyInsuranceIcon />}
              title={t("index.floating.3")}
              linkText={t('index.floating.link_text')}
              href="/compare/property"
            ></FloatingCard>
          </div>
        </section>
        <section>
          <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
            {t('index.sections.1.header')}
          </h1>
          <p className="text-2xl font-bold tracking-tight lg:text-2xl">
            {t('index.sections.1.text.1')}
          </p>
          <p className="text-2xl lg:text-2xl">
            {t('index.sections.1.text.2')}
          </p>
        </section>
        <section>
          <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
            {t('index.sections.2.header')}
          </h1>
          <div className="flex flex-row gap-8">
            <StepCard idx={1} title={t('index.sections.2.steps.1.title')} text={t('index.sections.2.steps.1.text')} />
            <StepCard idx={2} title={t('index.sections.2.steps.2.title')} text={t('index.sections.2.steps.2.text')} />
            <StepCard idx={3} title={t('index.sections.2.steps.3.title')} text={t('index.sections.2.steps.3.text')} />
            <StepCard idx={4} title={t('index.sections.2.steps.4.title')} text={t('index.sections.2.steps.4.text')} />
          </div>
        </section>

        <section>
          <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
            {t('index.sections.3.header')}
          </h1>
          <div className="flex flex-row flex-wrap justify-center gap-8">
            <CompanyLogo name="cmp1" src="/images/company-logo/klal.png" />
            <CompanyLogo name="cmp2" src="/images/company-logo/image 6.png" />
            <CompanyLogo name="cmp3" src="/images/company-logo/image 5.png" />
            <CompanyLogo name="cmp4" src="/images/company-logo/image 4.png" />
            <CompanyLogo name="cmp5" src="/images/company-logo/image 10.png" />
            <CompanyLogo name="cmp6" src="/images/company-logo/image 2.png" />
            <CompanyLogo name="cmp7" src="/images/company-logo/image 11.png" />
          </div>
        </section>

        <section>
          <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
            {t('index.sections.4.header')}
          </h1>
          <div className="flex flex-row gap-8">
            <ImageCard
              idx={1}
              title={t('index.sections.4.reasons.1.title')}
              text={t('index.sections.4.reasons.1.text')}
              image="/images/image-card/image1.svg"
            />
            <ImageCard
              idx={2}
              title={t('index.sections.4.reasons.2.title')}
              text={t('index.sections.4.reasons.2.text')}
              image="/images/image-card/image2.svg"
            />
            <ImageCard
              idx={3}
              title={t('index.sections.4.reasons.3.title')}
              text={t('index.sections.4.reasons.3.text')}
              image="/images/image-card/image3.svg"
            />
            <ImageCard
              idx={4}
              title={t('index.sections.4.reasons.4.title')}
              text={t('index.sections.4.reasons.4.text')}
              image="/images/image-card/image4.svg"
            >
              <div className="flex flex-row">
                <Image
                  src="/images/doing-well/image19.png"
                  alt=""
                  width={95}
                  height={70}
                />
                <Image
                  src="/images/doing-well/image20.png"
                  alt=""
                  width={85}
                  height={70}
                />
                <Image
                  src="/images/doing-well/image21.png"
                  alt=""
                  width={92}
                  height={70}
                />
              </div>
            </ImageCard>
          </div>
        </section>

        <section>
          <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
            {t('index.sections.5.header')}
          </h1>
          <div className="flex flex-row gap-8">
            <TestimonialCard
              name={t('index.sections.5.cards.1.name')}
              date="2022-12-04"
              rate={5}
              image=""
            >
              <p>
                {t('index.sections.5.cards.1.text')}
              </p>
            </TestimonialCard>
            <TestimonialCard
              name={t('index.sections.5.cards.2.name')}
              date="2022-12-04"
              rate={5}
              image=""
            >
              <p>
                {t('index.sections.5.cards.2.text')}
              </p>
            </TestimonialCard>
            <TestimonialCard
              name={t('index.sections.5.cards.3.name')}
              date="2022-12-04"
              rate={5}
              image=""
            >
              <p>
                {t('index.sections.5.cards.3.text')}
              </p>
            </TestimonialCard>
            <TestimonialCard
              name={t('index.sections.5.cards.4.name')}
              date="2022-12-04"
              rate={5}
              image=""
            >
              <p>
                {t('index.sections.5.cards.4.text')}
              </p>
            </TestimonialCard>
          </div>
        </section>

        <section>
          <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
            {t('index.sections.6.header')}
          </h1>
          <Accordion type="single" collapsible>
            {faq.slice(0, 3).map(({ q, a }, idx: number) => (
              <Faq key={idx} value={`${idx}`} question={q} answer={a} />
            ))}
          </Accordion>

          <Link href="/faq" legacyBehavior passHref>
            <a>{t('index.sections.6.more_faqs')}</a>
          </Link>
        </section>

        <SectionContactUs>
          <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
            {t('index.sections.7.header')}
          </h1>
          <span>{t('index.sections.7.text')}</span>
        </SectionContactUs>
      </main>
      <Footer />
    </>
  );
};

export default Home;
