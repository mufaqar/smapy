import path from "path";

/** @type {import("next-i18next").UserConfig} */
export const i18nConfig = {
  debug: process.env.NODE_ENV === "development",
  reloadOnPrerender: process.env.NODE_ENV === "development",
  i18n: {
    locales: ["en", "he", "zz"],
    defaultLocale: process.env.NODE_ENV === "development" ? "en" : "he",
  },
  // ns: ['common'],
  localePath: path.resolve("./public/locales"),
  saveMissing: true,
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
