import { useTranslation } from "next-i18next";
import { Button } from "@/components/ui/button";
import { ProfileCard } from "@/components/landing-page/parts/profile-card";
import React from "react";
import PageBanner from "./page-banner";
import Image from "next/image";

export const AboutUs = () => {
  const { t } = useTranslation("landing-page");

  return (
    <>
      <PageBanner
        heading={t("about.header")}
        subheading={``}
        image="/images/about-image.png"
        mobileImage="/images/about-image-mobile.png"
        btnText={t("about.buy")}
      />
      <section className="relative">
        <div className="container relative mx-auto px-4 xl:px-0">
          <h1 className="mb-8 scroll-m-20 text-center text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {t("about.tech.header")}
          </h1>
          <p className="text-xl font-light leading-8 text-[#495057]">
            {t("about.tech.text")}
          </p>
        </div>
        <Image
          src="/images/shape/bg-r-design.svg"
          alt="shape"
          width={150}
          height={100}
          className="absolute right-0 -top-40 -z-[1] hidden md:block"
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
          className="absolute right-0 top-20 -z-[1] md:hidden"
        />
      </section>

      <section className="relative px-4 lg:px-0">
        <div className="container mx-auto mt-10 rounded-[40px] bg-white p-8 shadow md:p-12">
          <h2 className="gradient-text mb-2 scroll-m-20 text-center text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {t("about.vision.header")}
          </h2>
          <h3 className="mb-8 scroll-m-20 text-center text-2xl tracking-tight">
            {t("about.vision.header_2")}
          </h3>
          <p className="text-center text-xl font-light leading-8 text-[#495057]">
            {t("about.vision.text")}
          </p>
          <div className="gradient-text mt-10 flex w-full items-center justify-center">
            <Button variant="primary">ונלש תורישה לע דוע</Button>
          </div>
        </div>
        <Image
          src="/images/shape/orange-diamond.svg"
          alt="shape"
          width={160}
          height={100}
          className="absolute left-0 top-60 -z-[1] md:hidden"
        />
        <Image
          src="/images/shape/orange-line-2 .png"
          alt="shape"
          width={150}
          height={100}
          className="absolute right-0 top-80 -z-[1] hidden md:block"
        />
      </section>

      <section className="container mx-auto mt-10 mb-96 px-4 md:mb-20 lg:px-0">
        <h1 className="mb-8 scroll-m-20 text-center text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          {t("about.about_us.header")}
        </h1>
        <div className="grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
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
    </>
  );
};
