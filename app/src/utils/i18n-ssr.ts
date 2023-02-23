import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18nConfig } from "../../next-i18next.config.mjs";

export const i18nGetServerSideProps = async ({
  locale,
}: {
  locale: string;
}) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"], i18nConfig, [
      "en",
      "he",
    ])),
  },
});
