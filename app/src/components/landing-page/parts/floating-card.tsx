import Link from "next/link";
import * as React from "react";

interface Props {
  icon: React.ReactNode;

  title: string;
  linkText: string;
  href: string;
}

export const FloatingCard = ({ linkText, icon, title, href }: Props) => {
  return (
    <Link href={href} legacyBehavior passHref>
      <div className="flex flex-col items-center rounded-md border bg-blue-400 p-8">
        {icon}
        <p>{title}</p>
        <a>{linkText}</a>
      </div>
    </Link>
  );
};
