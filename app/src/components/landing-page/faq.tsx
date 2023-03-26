import { useTranslation } from "next-i18next";
import { Accordion } from "@/components/ui/accordion";
import { faqData } from "@/components/landing-page/parts/faq-data";
import { Faq } from "@/components/ui/faq";
import { SectionContactUs } from "@/components/landing-page/parts/section-contact-us";
import React from "react";

export const FAQPage = () => {
  const { t } = useTranslation("landing-page");

  return (
    <>
      {" "}
      <section>
        <h1 className="scroll-m-20 text-6xl font-extrabold tracking-tight lg:text-6xl">
          {t("faqData.header")}
        </h1>
        <p>{t("faqData.text")}</p>
      </section>
      <section>
        <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
          {t("faqData.questions.header")}
        </h1>

        <Accordion type="single" collapsible>
          {faqData.map(({ q, a }, idx: number) => (
            <Faq key={idx} value={`${idx}`} question={q} answer={a} />
          ))}
        </Accordion>
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
