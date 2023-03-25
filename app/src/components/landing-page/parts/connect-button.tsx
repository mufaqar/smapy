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
    <Link href={href} legacyBehavior passHref>
      <div className="flex h-32 w-32 flex-col items-center justify-center rounded-md border">
        {icon}
        <p>{text}</p>
      </div>
    </Link>
  );
};
