import { useTranslation } from "next-i18next";
import { CompanyLogo } from "@/components/landing-page/parts/company-logo";
import React from "react";
import PageBanner from "./page-banner";
import Image from "next/image";

export const SecurityPrivacy = () => {
  const { t } = useTranslation("landing-page");

  return (
    <>
      
      <PageBanner 
        heading={t("security.header")}
        subheading={``}
        image="/images/security-and-privacy.png"
        mobileImage="/images/security-and-privacy-mobile.png"
      />

      <section className="relative">
      <div className="max-w-[900px] px-4 lg:px-0 mx-auto">
        <h1 className="mb-8 scroll-m-20 text-center text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
        {t("security.header2")}
          </h1>
        <p className="font-light text-xl leading-8 text-[#495057]">{t("security.text1")}</p>
        <div className="font-light text-xl leading-8 mt-6 text-[#495057]">
        <Image src="/images/_logo.svg" alt="logo" className="inline-block ml-2" width={80} height={15}/>
        {t("security.text2")}
        </div>
      </div>
      <Image
            src="/images/shape/bg-r-design.svg"
            alt="shape"
            width={150}
            height={100}
            className="absolute right-0 -z-[1] top-[1000px] md:-top-40"
          />
          <Image
            src="/images/shape/bg-l-orange.svg"
            alt="shape"
            width={150}
            height={100}
            className="absolute left-0 top-0 -z-[1] hidden md:block lg:-top-40"
          />
          <Image
            src="/images/shape/blue-right.svg"
            alt="shape"
            width={90}
            height={100}
            className="absolute right-0 bottom-[600px] md:hidden -z-[1] top-20 "
          />
      </section>
      

      <section className="shadow max-w-[900px] w-full mx-auto rounded-3xl md:my-10 mb-80 md:mb-20">
        <div className="flex flex-row flex-wrap justify-center gap-8 py-6">
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
    </>
  );
};
