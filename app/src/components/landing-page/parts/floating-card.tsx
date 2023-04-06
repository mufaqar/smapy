import Image from "next/image";
import Link from "next/link";
import * as React from "react";

interface Props {
  icon: React.ReactNode;

  title: string;
  linkText: string;
  href: string;
  whitebg: string;
  colorbg: string;
  id: any;
  className: any;
}

export const FloatingCard = ({
  linkText,
  icon,
  id,
  title,
  href,
  whitebg,
  colorbg,
  className,
}: Props) => {
  const blob =
    id === "1"
      ? "absolute top-10 w-[210px] right-16"
      : id === "2"
      ? "absolute top-10 w-[210px] right-16"
      : "absolute top-8 w-[230px] right-[52px]";

  return (
    <div className={className}>
      <picture className={`relative`}>
        <Image src={whitebg} alt="blob" width={334} height={305} className="" />
        <img src={colorbg} alt="blob" height={210} className={blob} />
        <Link href={href} legacyBehavior passHref>
          <div className="items-cente absolute top-12 right-20 flex flex-col justify-center p-8 text-center text-white">
            <i>{icon}</i>
            <p className="mt-1">{title}</p>
            <a>{linkText}</a>
          </div>
        </Link>
      </picture>
    </div>
  );
};
