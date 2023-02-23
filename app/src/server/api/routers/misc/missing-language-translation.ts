import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { env } from "../../../../env.mjs";
import { TRPCError } from "@trpc/server";
import { callAsync } from "../../../../utils/call-async";
import { forEach, map, uniq, uniqBy } from "rambda";
import PMap from "../../../../utils/p-map";
import fs from "fs";
import { promises as fsp } from "fs";

const translationSchema = z.object({
  ns: z.string(),
  key: z.string(),
  fallbackValue: z.string().optional(),
});

type TranslationData = string | { [key: string]: TranslationData };
type translationSchemaType = z.infer<typeof translationSchema>;

let queue: translationSchemaType[] = [];
let timeout: ReturnType<typeof setTimeout> | undefined;

const updateMissing = async () => {
  const loadNSData = async (lang: string, ns: string) => {
    // console.log(`muly:loadNSData ${`./public/locales/${lang}/${ns}.json`}`, {
    //   pwd: process.cwd(),
    //   file: await fsp.readFile(`./public/locales/${lang}/${ns}.json`, "utf8"),
    //   ex: fs.existsSync(`./public/locales/${lang}/${ns}.json`),
    // });
    return JSON.parse(
      await fsp.readFile(`./public/locales/${lang}/${ns}.json`, "utf8")
    ) as TranslationData;
  };
  const saveNSData = async (
    lang: string,
    ns: string,
    nsData: TranslationData
  ) => {
    console.log(`muly:saveNSData`, { nsData });
    await fsp.writeFile(
      `./public/locales/${lang}/${ns}.json`,
      JSON.stringify(nsData, null, 2)
    );
  };

  const appendMissingTranslation = (
    nsData: TranslationData,
    item: translationSchemaType,
    lang: string
  ) => {
    const path: string[] = item.key.split(".");
    let obj: TranslationData = nsData;
    // console.log(`muly:appendMissingTranslation`, {
    //   nsData,
    //   item,
    //   path,
    //   sli: path.slice(0, path.length - 1),
    // });
    path.slice(0, path.length - 1).forEach((key) => {
      if (typeof obj !== "string") {
        if (!obj[key]) {
          obj[key] = {};
        }
        // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
        obj = obj[key]!;
      } else {
        throw new Error(
          `Invalid translation key in ${lang} ${item.ns} ${item.key}`
        );
      }
    });

    const tail = path[path.length - 1];
    if (tail) {
      // @ts-ignore
      obj[tail] = item.fallbackValue;
    }

    // console.log(`muly:ADD`, { tail, path, key: item.key, obj });
  };

  const q = [...queue];
  queue = [];
  const langs = ["en", "he"];

  const pairs: { ns: string; lang: string }[] = [];
  forEach((ns) => {
    forEach((lang) => {
      pairs.push({ ns, lang });
    }, langs);
  }, uniq(map(({ ns }) => ns, q)));

  await PMap(pairs, async ({ ns, lang }) => {
    const nsData = await loadNSData(lang, ns);
    q.filter((item) => item.ns === ns).forEach((item) =>
      appendMissingTranslation(nsData, item, lang)
    );
    await saveNSData(lang, ns, nsData);
  });
};

export const missingLanguageTranslation = publicProcedure
  .input(translationSchema)
  .mutation(({ ctx, input }) => {
    if (env.NODE_ENV !== "development") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    queue.push(input);
    clearTimeout(timeout);
    timeout = setTimeout(callAsync(updateMissing), 5000);
  });
