import { Box, Button, SimpleGrid, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { extractRuntimeTranslation } from "../../server/process/extract-runtime-translation";
import { useTranslation } from "next-i18next";
import { i18nGetServerSideProps } from "../../utils/i18n-ssr";

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
    <VStack>
      <Box>ExtractRuntimeTranslation</Box>
      <Button isLoading={isLoading} onClick={() => handleExtract()}>
        EXTRACT
      </Button>
    </VStack>
  );
};

export default ExtractRuntimeTranslation;
