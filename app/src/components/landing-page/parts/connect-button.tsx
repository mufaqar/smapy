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
        <Link href={href} legacyBehavior passHref>
          <div className="contact-icon flex cursor-pointer flex-col items-center justify-center transition duration-300 ease-in-out hover:scale-105 md:h-24 md:w-24">
            <i>{icon}</i>
            <p className="mt-2 text-sm text-maingray">{text}</p>
          </div>
        </Link>
      </div>
      <div className="flex flex-col items-center md:hidden">
        <Link href={href} legacyBehavior passHref className="md:hidden">
          <div className="contact-icon flex h-20 w-20 scale-75 cursor-pointer flex-col items-center justify-center">
            <i>{icon}</i>
          </div>
        </Link>
        <p className=" text-sm text-maingray">{text}</p>
      </div>
    </>
  );
};
