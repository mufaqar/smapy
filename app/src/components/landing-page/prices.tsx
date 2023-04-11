import { useTranslation } from "next-i18next";
import { PriceCard } from "@/components/landing-page/parts/price-card";
import { SectionContactUs } from "@/components/landing-page/parts/section-contact-us";
import React from "react";
import PageBanner from "./page-banner";
import Image from "next/image";

export const Prices = () => {
  const { t } = useTranslation("landing-page");

  return (
    <>
      <PageBanner
        heading={t("price.header")}
        subheading={t("price.text")}
        image="/images/prices-banner.png"
        mobileImage="/images/prices-mobile-bg.svg"
      />

      <section className="relative">
        <div className="container relative mx-auto">
        <h1 className="mb-8 scroll-m-20 text-center text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {t("price.header2")}
          </h1>

          <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 lg:px-0">
            <PriceCard
              name={t("price.1.name")}
              price={t("price.1.price")}
              image="/images/price-table-icon-3.svg"

            />
            <PriceCard
              name={t("price.2.name")}
              price={t("price.2.price")}
              image="/images/price-table-icon-2.svg"
            />
            <PriceCard
              name={t("price.3.name")}
              price={t("price.3.price")}
              lines={[t("price.3.extra_line")]}
              image="/images/price-table-icon-1.svg"
            />
          </div>
        </div>
        <Image
            src="/images/shape/bg-r-design.svg"
            alt="shape"
            width={150}
            height={100}
            className="absolute right-0 top-[1000px] -z-[1] md:-top-40"
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
            className="absolute right-0 bottom-[600px] top-20 -z-[1] md:hidden "
          />
          <Image
            src="/images/shape/left-l-green.svg"
            alt="shape"
            width={100}
            height={100}
            className="absolute inset-y-60 left-0 -z-[1] md:hidden"
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
