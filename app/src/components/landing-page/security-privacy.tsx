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
      <div className="mx-auto max-w-[900px] px-4 lg:px-0">
        <h1 className="mb-8 scroll-m-20 text-center text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
        {t("security.header2")}
          </h1>
        <p className="text-xl font-light leading-8 text-[#495057]">{t("security.text1")}</p>
        <div className="mt-6 text-xl font-light leading-8 text-[#495057]">
        <Image src="/images/_logo.svg" alt="logo" className="ml-2 inline-block" width={80} height={15}/>
        {t("security.text2")}
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
            src="/images/shape/blue-right.svg"
            alt="shape"
            width={90}
            height={100}
            className="absolute right-0 bottom-[600px] top-20 -z-[1] md:hidden "
          />
      </section>
      

      <section className="mx-auto mb-80 w-full max-w-[900px] rounded-3xl shadow md:my-10 md:mb-20">
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
