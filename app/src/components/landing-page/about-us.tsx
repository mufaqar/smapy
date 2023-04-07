import { useTranslation } from "next-i18next";
import { Button } from "@/components/ui/button";
import { ProfileCard } from "@/components/landing-page/parts/profile-card";
import React from "react";

export const AboutUs = () => {
  const { t } = useTranslation("landing-page");

  return (
    <>
      {" "}
      <section>
        <h1 className="scroll-m-20 text-6xl font-extrabold tracking-tight lg:text-6xl">
          {t("about.header")}
        </h1>
        <Button variant="primary">{t("about.buy")}</Button>
      </section>
      <section>
        <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
          {t("about.tech.header")}
        </h1>
        <p className="text-2xl font-bold tracking-tight lg:text-2xl">
          {t("about.tech.text")}
        </p>
      </section>
      <section>
        <h2 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
          {t("about.vision.header")}
        </h2>
        <h3 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
          {t("about.vision.header_2")}
        </h3>
        <p className="text-2xl font-bold tracking-tight lg:text-2xl">
          {t("about.vision.text")}
        </p>
      </section>
      <section>
        <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
          {t("about.about_us.header")}
        </h1>
        <div className="flex flex-row flex-wrap justify-center gap-8">
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
