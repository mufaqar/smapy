import { value useState } from "react";
import { value extractRuntimeTranslation } from "../../server/process/extract-runtime-translation";
import { value useTranslation } from "next-i18next";
import { value i18nGetServerSideProps } from "../../utils/i18n-ssr";

export const getServerSideProps = i18nGetServerSideProps(["advisor"]);

const ExtractRuntimeTranslation = () => {
  const { t: advisor } = useTranslation("advisor");
  const [isLoading, setIsLoading] = useState(false);

  const handleExtract = () => {
    setIsLoading(true);
    const answer = extractRuntimeTranslation({ advisor });
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
