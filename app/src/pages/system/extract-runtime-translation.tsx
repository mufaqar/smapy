import { Box, Button, SimpleGrid, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { extractRuntimeTranslation } from "../../server/process/extract-runtime-translation";
import { useTranslation } from "next-i18next";

const ExtractRuntimeTranslation = () => {
  const { t: advisor } = useTranslation("advisor");
  const [isLoading, setIsLoading] = useState(false);

  const handleExtract = async () => {
    setIsLoading(true);
    await extractRuntimeTranslation({ advisor });
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
