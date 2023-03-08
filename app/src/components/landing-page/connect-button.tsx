import Link from "next/link";
import Image from "next/image";

interface Props {
  text: string;
  icon: string;

  href: string;
}

export const ConnectButton = ({ href, text, icon }: Props) => {
  return (
    <Link href={href} legacyBehavior passHref>
      <div className="flex h-32 w-32 flex-col items-center justify-center rounded-md border">
        <Image
          src={icon || "/images/company-logo/klal.png"}
          alt=""
          width={30}
          height={30}
          className="p-1"
        />
        <p>{text}</p>
      </div>
    </Link>
  );
};
