import Link from "next/link";

interface Props {
  logo: string;
  title: string;
  linkText: string;
  href: string;
}

export const FloatingCard = ({ linkText, logo, title, href }: Props) => {
  return (
    <div className="flex flex-col rounded-md border">
      <p>{title}</p>
      <Link href={href} legacyBehavior passHref>
        <a>{linkText}</a>
      </Link>
    </div>
  );
};
