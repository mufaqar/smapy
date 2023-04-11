import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as React from "react";
import { formatDistanceStrict, parse } from "date-fns";

interface Props {
  name: string;
  role_en: string;
  role_he: string;
  image: string;

  text: React.ReactNode;
}

export const ProfileCard = ({ name, role_he, role_en, text, image }: Props) => {
  return (
    <div className="flex flex-col items-center gap-2 rounded-[40px] bg-white p-10 shadow">
      <Avatar>
        <AvatarImage src={image} />
      </Avatar>
      <p className="text-xl font-bold">{name}</p>
      <p className="-mt-1 text-sm text-[#75787C]">{role_en}</p>
      <p className="-mt-1 text-sm text-[#75787C]" >{role_he}</p>
      <p className="mt-8 text-center text-lg font-light leading-8 text-[#495057]">{text}</p>
    </div>
  );
};
