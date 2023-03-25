import Link from "next/link";
import Image from "next/image";
import React from "react";

interface Props {
  idx: number;
  title: string;
  text: string;
  image: string;

  children?: React.ReactNode;
}

export const ImageCard = ({ idx, image, title, text, children }: Props) => {
  return (
    <div className="rounded-md border">
      <h2>
        {idx} {title}
      </h2>
      <p>{text}</p>
      <Image src={image} alt="" width={250} height={250} />
      {children}
    </div>
  );
};
