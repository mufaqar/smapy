import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as React from "react";
import { formatDistanceStrict, parse } from "date-fns";
import { useTranslation } from "next-i18next";

interface Props {
  name: string;
  price: string;
  lines?: string[];
  image: string;
}

export const PriceCard = ({ name, price, lines, image }: Props) => {
  const { t } = useTranslation("landing-page");

  const all_lines = [
    t("price.0.1"),
    t("price.0.2"),
    t("price.0.3"),
    t("price.0.4"),
    t("price.0.5"),
    ...(lines || []),
  ];
  return (
    <div className="relative mb-5 flex flex-col items-center justify-between gap-2 rounded-[40px] bg-gradient-to-l from-[#16D1C6] to-[#0E5D89] p-1 lg:mb-0">
      <div className="mt-4 flex flex-col items-center">
        <img src={image} alt="" className="h-12 w-12" />
        <h2 className="my-3 text-center text-2xl font-medium text-white">
          {name}
        </h2>
      </div>

      <div className="flex h-full w-full flex-col justify-between gap-6 rounded-[40px] bg-white p-6">
        <ul className="border-b-[1px] border-gray-200 pb-4">
          {all_lines.map((line, idx) => (
            <li
              key={idx}
              className="mt-2 flex items-start gap-2 space-x-3 font-light text-[#495057] sm:whitespace-nowrap"
            >
              <Image
                src="/images/tick.svg"
                alt="tick"
                width={15}
                height={15}
                className="mt-[6px]"
              />{" "}
              <span className="m-0 p-0">{line}</span>{" "}
            </li>
          ))}
        </ul>
        <div>
          <div className="flex items-center gap-7">
            <p className="font-light text-[#495057]">{t("price.cost")}</p>
            <p className="font-bold text-[#495057]">{price}</p>
          </div>
          <div className="mt-2 mb-6 flex items-center gap-5">
            <p className="font-light text-[#495057]">{t("price.cost_service")}</p>
            <p className="font-bold text-[#495057]">{t("price.free")}</p>
          </div>
          <p className="text-center font-light text-[#495057]">{t("price.footer")}</p>
          <p className="mb-5 text-center text-sm font-light text-[#495057]">{t("price.footer2")}</p>
        </div>
      </div>
      <Link className="absolute -bottom-4 rounded-xl bg-gradient-to-l from-[#FF8700] to-[#FE0555] p-2 px-8 text-white" href="#">חוטיב תשיכרל</Link>
    </div>
  );
};
