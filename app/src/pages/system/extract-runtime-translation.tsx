import { useState } from "react";
import { extractRuntimeTranslation } from "../../server/process/extract-runtime-translation";
import { useTranslation } from "next-i18next";
import { i18nGetServerSideProps } from "../../utils/i18n-ssr";

export const getServerSideProps = i18nGetServerSideProps(["advisor"]);

const ExtractRuntimeTranslation = () => {
  const { t: advisor } = useTranslation("advisor");
  const { t: landingPage } = useTranslation("landing-page");
  const { t: customer } = useTranslation("customer");
  const { t: common } = useTranslation("common");
  const [isLoading, setIsLoading] = useState(false);

  const handleExtract = () => {
    setIsLoading(true);
    const answer = extractRuntimeTranslation({
      "landing-page": landingPage,
      advisor,
      customer,
      common,
    });
    console.log(`extractRuntimeTranslation ${answer.message}`, { answer });
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col">
      <div>ExtractRuntimeTranslation</div>
      <button onClick={() => handleExtract()}>EXTRACT</button>
    </div>
  );
};

export default ExtractRuntimeTranslation;
