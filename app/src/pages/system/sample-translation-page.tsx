import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import React from "react";
import { i18nGetServerSideProps } from "@/utils/i18n-ssr";
import { Button } from "@/components/ui/button";

export const getServerSideProps = i18nGetServerSideProps(["landing-page"]);

const Page: NextPage = () => {
  const { t } = useTranslation("landing-page");
  return (
    <div>
      {t("sample.translation_v2")}
      <Button
        onClick={() => {
          debugger;
          console.log(`muly:Click:${t("sample.translation_v6")}`, {});
        }}
      >
        Action
      </Button>
    </div>
  );
};

export default Page;
