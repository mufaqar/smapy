import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as React from "react";
import { formatDistanceStrict, parse } from "date-fns";

interface Props {
  name: string;
  date: string;
  rate: number;
  image: string;

  children: React.ReactNode;
}

export const TestimonialCard = ({
  rate,
  date,
  image,
  name,
  children,
}: Props) => {
  const now = new Date();
  const duration = formatDistanceStrict(
    parse(date, "yyyy-MM-dd", new Date()),
    now,
    { addSuffix: true }
  );

  const initials = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

  return (
    <div className="flex flex-col items-center gap-2 rounded-md border">
      <Avatar>
        <AvatarImage src={image} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <p>{rate}</p>
      {children}
      <p className="self-end">{name}</p>
      <p className="self-end">{duration}</p>
    </div>
  );
};
