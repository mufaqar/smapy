import Link from "next/link";
import Image from "next/image";

interface Props {
  name: string;
  src: string;
}

export const CompanyLogo = ({ name, src }: Props) => {
  return (
    <div className="flex h-20 w-20 md:h-32 md:w-32 lg:w-40 lg:h-40 bg-white flex-col items-center justify-center rounded-2xl shadow">
      <Image
        src={src || "/images/company-logo/klal.png"}
        alt={name}
        width={124}
        height={152}
        className="p-1"
      />
    </div>
  );
};

/*
    <div className="min-w-40 flex h-40 w-40 flex-col justify-items-center drop-shadow-lg">
      <div
        className="h-[58px] w-[130px] rounded-2xl bg-cover bg-center"
        style={{ backgroundImage: `url(${src})` }}
      ></div>
    </div>

 */
