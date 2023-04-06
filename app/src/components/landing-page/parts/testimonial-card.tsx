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

  const rating = [];
  for (let i = 0; i < rate; i++) {
    rating.push(i);
  }

  return (
    <section className="p-3">
      <div className=" flex-1 gap-2 rounded-2xl border bg-gradient-to-l from-[#4AB4B7] to-[#315CA6] p-4">
        <div className="mt-12 flex min-h-[270px] flex-col items-center rounded-2xl bg-white p-3  px-4">
          <div className="-mt-12">
            <Avatar>
              <AvatarImage src={image} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </div>
          <ul className="item-center my-6 flex gap-1">
            {rating.map((item, idx) => {
              return (
                <li key={idx}>
                  <Image
                    src="/images/star.svg"
                    alt="star"
                    width={20}
                    height={20}
                  />
                </li>
              );
            })}
          </ul>
          <div className="mb-4 text-sm text-[#050505] rtl:text-right md:text-base">
            {children}
          </div>
          <div className="flex w-full justify-between">
            <Image src="/images/google.svg" alt="star" width={30} height={30} />
            <div>
              <p className="text-end text-xs font-semibold md:text-sm">
                {name}
              </p>
              <p className="text-end text-xs">{duration}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
