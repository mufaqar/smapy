import Link from "next/link";
import Image from "next/image";
import {
  value Avatar,
  value AvatarFallback,
  value AvatarImage,
} from "@/components/ui/avatar";
import * as React from "react";
import { value formatDistanceStrict, value parse } from "date-fns";
import { value useTranslation } from "next-i18next";

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
    <div className="flex flex-col items-center gap-2 rounded-md border">
      <img src={image} alt="" />
      <h2>{name}</h2>
      <ul>
        {all_lines.map((line, idx) => (
          <li key={idx}>{line}</li>
        ))}
      </ul>
      <div className="grid grid-cols-2">
        <p>{t("price.cost")}</p>
        <p>{price}</p>
        <p>{t("price.cost_service")}</p>
        <p>{t("price.free")}</p>
      </div>
      <p>{t("price.footer")}</p>
      <p>{t("price.footer2")}</p>
    </div>
  );
};
