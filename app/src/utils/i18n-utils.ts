import { boolean } from "zod";
import { getServerSideProps } from "../pages/advisor/registration";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18nConfig } from "../../next-i18next.config.mjs";
import { trpcVanillaClient } from "./api";
import { callAsync } from "./call-async";
import type { MetaInfo } from "./zod-utils";

const itemSent: { [key: string]: boolean } = {};

export const missingKeyHandler = (
  lngs: readonly string[],
  ns: string,
  key: string,
  fallbackValue: string,
  updateMissing: boolean,
  options: any
) => {
  const sent = `${ns}:${key}`;
  if (!itemSent[sent]) {
    console.log(`muly:missingKeyHandler`, {
      lngs,
      ns,
      key,
      fallbackValue,
      updateMissing,
      options,
    });

    callAsync(async () => {
      await trpcVanillaClient.misc.missingLanguageTranslation.mutate({
        ns,
        key,
        fallbackValue,
      });
    })();

    itemSent[sent] = true;
  }
};

export const translateSchemaInfo = (
  metaInfo: MetaInfo,
  translate: (key: string, def?: string) => string,
  path = ""
): MetaInfo => {
  const { description, children, ...rest } = metaInfo;

  let tDesc = undefined;

  if (description) {
    const { label, placeholder, name, ...restDesc } = description;

    if (name) {
      path = path ? [path, name].join(".") : name;
    }

    tDesc = {
      ...restDesc,
      label: label && translate(`${path}.label`, label),
      placeholder: placeholder && translate(`${path}.placeholder`, placeholder),
    };
  }

  let tChildren: Record<string, MetaInfo> | undefined = undefined;
  if (children) {
    tChildren = {};

    Object.keys(children).forEach((key) => {
      const child = children[key];
      if (child && tChildren) {
        tChildren[key] = translateSchemaInfo(child, translate, path);
      }
    });
  }

  return {
    ...rest,
    description: tDesc,
    children: tChildren,
  };
};

// Dummy function, do nothing but return the string, but for i18next scan to find those strings
export const dt = (key: string, defaultString?: string) => defaultString || key;

export const declareTranslationNS = (ns: string) => {
  return;
};
