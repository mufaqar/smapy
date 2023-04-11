import { useTranslation } from "next-i18next";
import { Accordion } from "@/components/ui/accordion";
import { faqData } from "@/components/landing-page/parts/faq-data";
import { Faq } from "@/components/ui/faq";
import { SectionContactUs } from "@/components/landing-page/parts/section-contact-us";
import React from "react";
import Image from "next/image";
import PageBanner from './page-banner';

export const FAQPage = () => {
  const { t } = useTranslation("landing-page");

  return (
    <>
      <PageBanner heading={t("faqData.header")} subheading={t("faqData.text")} image="/images/faq-bg.png" mobileImage="/images/faq-mobile.png"/>
      <section className="relative px-4 lg:px-0">
        <div className="container mx-auto ">
        <h1 className="mb-8 scroll-m-20 text-center text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          {t("faqData.questions.header")}
        </h1>

        <Accordion type="single" collapsible>
          {faqData.map(({ q, a }, idx: number) => (
            <Faq key={idx} value={`${idx}`} question={q} answer={a} />
          ))}
        </Accordion>
        </div>

        <Image
          src="/images/shape/bg-r-design.svg"
          alt="shape"
          width={150}
          height={100}
          className="absolute right-0 -top-20 -z-[1] hidden md:-top-40 md:block"
        />
        <Image
          src="/images/shape/bg-l-orange.svg"
          alt="shape"
          width={150}
          height={100}
          className="absolute left-0 top-0 -z-[1] hidden md:block lg:-top-40"
        />
        <Image
          src="/images/shape/right-l-orange.svg"
          alt="shape"
          width={120}
          height={100}
          className="absolute right-0 bottom-[600px] -z-[1] opacity-40 md:-bottom-20 md:opacity-100"
        />
       <Image
          src="/images/shape/left-l-green.svg"
          alt="shape"
          width={100}
          height={100}
          className="absolute left-0 bottom-60 -z-[1] opacity-40  md:-bottom-60  md:opacity-100"
        />
      </section>
      <SectionContactUs>
        <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
          {t("faqData.contact.header")}
        </h1>
        <p>{t("faqData.contact.text")}</p>
      </SectionContactUs>
      
    </>
  );
};
