import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Props {
  idx: number;
  title: string;
  text: string;
  image: string;
  imageWidth: any;
  imageMbl: string;
  children?: React.ReactNode;
}

export const ImageCard = ({
  idx,
  image,
  title,
  text,
  children,
  imageWidth,
  imageMbl,
}: Props) => {
  const content =
    idx === 1
      ? "lg:pt-12"
      : idx === 2
      ? "lg:pt-16"
      : idx === 3
      ? "lg:-mt-10"
      : "lg:mt-10";
  const wrapper = idx === 1 ? "" : idx === 2 ? "lg:pt-32" : idx === 3 ? "" : "";
  const imageWrapper =
    idx === 1
      ? ""
      : idx === 2
      ? ""
      : idx === 3
      ? "lg:-mt-32 xl:-mt-28"
      : "lg:mt-5";

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center gap-6 rounded-md px-4 text-center sm:justify-start lg:flex-row lg:items-start lg:px-0 lg:text-right ${wrapper}`}
      >
        <figure className={`${imageWrapper}`}>
          <img
            src={image}
            alt=""
            width={imageWidth}
            className={`hidden pl-16 lg:block lg:pl-0 ${
              idx === 4 && "pl-0 lg:scale-125"
            } ${idx === 3 && "lg:scale-105"}`}
            height={250}
          />
          <Image
            src={imageMbl}
            alt=""
            width={`300`}
            className={`pl-16 lg:hidden lg:pl-0 ${
              idx === 4 && "pl-0 lg:scale-125"
            } ${idx === 3 && "lg:scale-105"}`}
            height={250}
          />
        </figure>
        <div
          className={`lg:min-w-[350px] lg:max-w-[350px] ${
            idx === 3 && "lg:-ml-16"
          } ${content}`}
        >
          <h2 className="mt-6 justify-center gap-4 text-[26px] font-medium sm:mt-0 lg:flex lg:justify-start">
            <span className="hidden lg:block">{idx}</span> <span>{title}</span>
          </h2>
          <p className="text-maingray mt-4 text-[18px]">{text}</p>
          {children}
        </div>
      </div>
    </>
  );
};
