import { ConnectButton } from "@/components/landing-page/parts/connect-button";
import {
  EmailIcon,
  PhoneOutlineIcon,
  WhatsappIcon,
} from "@/components/landing-page/parts/Icons";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export const SectionContactUs = ({ children }: Props) => {
  return (
    <>
    <section className="lg:mt-40 2xl:mt-24 overflow-x-hidden hidden md:block">
      <img src="/images/footer-bg.png" alt="img" className="hidden md:block h-full w-full" />
      <div className="container relative mx-auto flex h-full flex-col items-end justify-end">
        <div className="absolute bottom-20 lg:left-40 2xl:bottom-60 2xl:left-60">
          {children}
          <div className="flex flex-row gap-8 mt-8">
            <ConnectButton
              icon={<WhatsappIcon />}
              text="Whatsapp"
              href="/contact/whatsapp"
            />
            <ConnectButton
              icon={<EmailIcon />}
              text="email"
              href="/contact/email"
            />
            <ConnectButton
              icon={<PhoneOutlineIcon />}
              text="Phone"
              href="/contact/phone"
            />
          </div>
        </div>
      </div>
    </section>
    <section className="h-[950px] overflow-hidden bg-no-repeat bg-cover md:hidden" style={{backgroundImage: `url("/images/mbl-footer-bg.png")`}}>'
    <div className="container relative mx-auto flex h-full flex-col items-end justify-end">
      <div className="px-4 w-full mb-[350px]">
        {children}
        <div className="flex -mr-2 flex-row gap-2 lg:gap-8 mt-2 lg:mt-8">
          <ConnectButton
            icon={<WhatsappIcon />}
            text="Whatsapp"
            href="/contact/whatsapp"
          />
          <ConnectButton
            icon={<EmailIcon />}
            text="email"
            href="/contact/email"
          />
          <ConnectButton
            icon={<PhoneOutlineIcon />}
            text="Phone"
            href="/contact/phone"
          />
        </div>
      </div>
    </div>
  </section>
  </>
  );
};
