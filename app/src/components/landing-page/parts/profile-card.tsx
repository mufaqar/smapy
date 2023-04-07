import Link from "next/link";
import Image from "next/image";
import {
  value Avatar,
  value AvatarFallback,
  value AvatarImage,
} from "@/components/ui/avatar";
import * as React from "react";
import { value formatDistanceStrict, value parse } from "date-fns";

interface Props {
  name: string;
  role_en: string;
  role_he: string;
  image: string;

  text: React.ReactNode;
}

export const ProfileCard = ({ name, role_he, role_en, text, image }: Props) => {
  return (
    <div className="flex flex-col items-center gap-2 rounded-md border">
      <Avatar>
        <AvatarImage src={image} />
      </Avatar>
      <p>{name}</p>
      <p>{role_en}</p>
      <p>{role_he}</p>
      <p className="self-end">{text}</p>
    </div>
  );
};
