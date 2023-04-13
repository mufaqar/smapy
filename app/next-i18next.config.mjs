import path from "path";

const isDev = process.env.NODE_ENV === "development";

/** @type {import("next-i18next").UserConfig} */
export const i18nConfig = {
  debug: isDev,
  reloadOnPrerender: isDev,
  i18n: {
    locales: isDev ? ["en", "he", "zz"] : ["he"],
    defaultLocale: isDev ? "en" : "he",
  },
  // ns: ['common'],
  localePath: path.resolve("./public/locales"),
  updateMissing: isDev,
  saveMissing: isDev,
  saveMissingTo: "all",
  // missingKeyHandler: (lngs, ns, key, fallbackValue, updateMissing, options) => {
  //   console.log(`muly:missingKeyHandler`, {
  //     lngs,
  //     ns,
  //     key,
  //     fallbackValue,
  //     updateMissing,
  //     options,
  //   });
  // },
  fallbackLng: false,
  serializeConfig: false,
};
