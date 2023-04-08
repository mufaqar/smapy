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
      <section className="hidden overflow-x-hidden md:block lg:mt-40 2xl:mt-24">
        <img
          src="/images/footer-bg.png"
          alt="img"
          className="hidden h-full w-full md:block"
        />
        <div className="container relative mx-auto flex h-full flex-col items-end justify-end">
          <div className="absolute bottom-20 lg:left-40 2xl:bottom-60 2xl:left-60">
            {children}
            <div className="mt-8 flex flex-row gap-8">
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
      <section
        className="h-[950px] overflow-hidden bg-cover bg-no-repeat md:hidden"
        style={{ backgroundImage: `url("/images/mbl-footer-bg.png")` }}
      >
        '
        <div className="container relative mx-auto flex h-full flex-col items-end justify-end">
          <div className="mb-[350px] w-full px-4">
            {children}
            <div className="-mr-2 mt-2 flex flex-row gap-2 lg:mt-8 lg:gap-8">
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
