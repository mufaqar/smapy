import Link from "next/link";
import Image from "next/image";
import * as React from "react";

interface Props {
  text: string;
  icon: React.ReactNode;
  href: string;
}

export const ConnectButton = ({ href, text, icon }: Props) => {
  return (
    <>
    <div className="hidden md:block">
    <Link href={href} legacyBehavior passHref >
      <div className="flex md:h-24 md:w-24 flex-col cursor-pointer hover:scale-105 items-center transition duration-300 ease-in-out justify-center contact-icon">
        <i>{icon}</i>
        <p className="mt-2 text-maingray text-sm">{text}</p>
      </div>
    </Link>
    </div>
    <div className="md:hidden flex flex-col items-center">
    <Link href={href} legacyBehavior passHref className="md:hidden">
      <div className="flex h-20 w-20 scale-75 flex-col cursor-pointer items-center justify-center contact-icon">
        <i>{icon}</i>
      </div>
    </Link>
      <p className=" text-maingray text-sm">{text}</p>
    </div>
    </>
  );
};
