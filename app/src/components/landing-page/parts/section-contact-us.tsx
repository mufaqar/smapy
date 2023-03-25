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
    <section>
      {children}
      <div className="flex flex-row gap-8">
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
    </section>
  );
};
