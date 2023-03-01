/* eslint-disable
      @typescript-eslint/no-unsafe-return,
      @typescript-eslint/no-unsafe-argument
*/

import { type NextPage } from "next";
import Head from "next/head";
import { Box, SimpleGrid } from "@chakra-ui/react";
import type { MetaInfo } from "../utils/zod-meta";
import { getZodMetaInfo } from "../utils/zod-meta";
import { AdvisorUpdateSchema } from "../components/advisor/advisor-registration-flow/advisor-registration-flow-schema";
import { map } from "rambda";
import { useTranslation } from "next-i18next";
import { i18nGetServerSideProps } from "../utils/i18n-ssr";

export const getServerSideProps = i18nGetServerSideProps(["advisor"]);

const Page: NextPage = (props, context) => {
  console.log(`muly:Page API-TEST`, { props });
  const { t } = useTranslation("advisor");

  const filterRecursive = (data: MetaInfo): any => {
    const { meta, children } = data;
    return {
      meta,
      children: children
        ? map((val: MetaInfo, key: string) => filterRecursive(val))(children)
        : undefined,
    };
  };

  let data2: any = getZodMetaInfo(AdvisorUpdateSchema);
  data2 = filterRecursive(data2);

  return (
    <>
      <Head>
        <title>Smapy</title>
        <meta name="description" content="Smapy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box maxW="7xl" mx="auto" my={12}>
          <Box>{t("test3", "Test 3 - default test")}</Box>
          <Box>{t("test.layer1.layer2", "default test")}</Box>
          <SimpleGrid columns={2}>
            <pre>{JSON.stringify(data2, null, 2)}</pre>
          </SimpleGrid>
        </Box>
      </main>
    </>
  );
};

export default Page;
