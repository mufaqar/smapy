import { Footer as FooterC } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { SmapyLogo } from "@/components/layout/SmapyLogo";
import { PageNavigationMenu } from "@/components/landing-page/parts/page-navigation-menu";

const meta = {
  component: FooterC,
};

export default meta;

export const LandingPageHeader = {
  render: () => <PageNavigationMenu />,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=994-2698&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};

export const Header = {
  render: () => <PageHeader />,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-45113&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};

export const Footer = {
  render: () => <FooterC />,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-45002&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};

export const Logo = {
  render: () => <SmapyLogo />,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=294-45113&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
