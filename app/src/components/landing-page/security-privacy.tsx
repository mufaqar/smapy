import { useTranslation } from "next-i18next";
import { CompanyLogo } from "@/components/landing-page/parts/company-logo";
import React from "react";

export const SecurityPrivacy = () => {
  const { t } = useTranslation("landing-page");

  return (
    <>
      <section>
        <h1 className="scroll-m-20 text-6xl font-extrabold tracking-tight lg:text-6xl">
          {t("security.header")}
        </h1>
      </section>

      <section>
        <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
          {t("security.header2")}
        </h1>
        <p>{t("security.text1")}</p>
        <p>{t("security.text2")}</p>
      </section>

      <section>
        <div className="flex flex-row flex-wrap justify-center gap-8">
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
