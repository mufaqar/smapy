import { useTranslation } from "next-i18next";
import { PriceCard } from "@/components/landing-page/parts/price-card";
import { SectionContactUs } from "@/components/landing-page/parts/section-contact-us";
import React from "react";

export const Prices = () => {
  const { t } = useTranslation("landing-page");

  return (
    <>
      {" "}
      <section>
        <h1 className="scroll-m-20 text-6xl font-extrabold tracking-tight lg:text-6xl">
          {t("price.header")}
        </h1>
        <p>{t("price.text")}</p>
      </section>
      <section>
        <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
          {t("price.header2")}
        </h1>
        <div className="flex flex-row">
          <PriceCard
            name={t("price.1.name")}
            price={t("price.1.price")}
            image="/images/product/life-mortgage.svg"
          />
          <PriceCard
            name={t("price.2.name")}
            price={t("price.2.price")}
            image="/images/product/property-mortgage.svg"
          />
          <PriceCard
            name={t("price.3.name")}
            price={t("price.3.price")}
            lines={[t("price.3.extra_line")]}
            image="/images/product/life.svg"
          />
        </div>
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
