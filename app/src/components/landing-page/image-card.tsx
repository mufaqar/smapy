import Link from "next/link";
import Image from "next/image";

interface Props {
  idx: number;
  title: string;
  text: string;
  image: string;
}

export const ImageCard = ({ idx, image, title, text }: Props) => {
  return (
    <div className="rounded-md border">
      <h2>
        {idx} {title}
      </h2>
      <p>{text}</p>
      <Image
        src={image || "/images/company-logo/klal.png"}
        alt=""
        width={250}
        height={250}
      />
    </div>
  );
};
