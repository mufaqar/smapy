import { Home as HomePage } from "./home";
import { AboutUs } from "@/components/landing-page/about-us";
import { FAQPage } from "@/components/landing-page/faq";
import { Prices as PricesPage } from "./prices";
import { SecurityPrivacy as SecurityPrivacyPage } from "@/components/landing-page/security-privacy";

const meta = {
  component: HomePage,
};

export default meta;

export const Home = {
  render: () => <HomePage />,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=601-214&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};

export const About = {
  render: () => <AboutUs />,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=803-2217&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};

export const FAQ = {
  render: () => <FAQPage />,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=908-1717&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};

export const Prices = {
  render: () => <PricesPage />,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=922-1990&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};

export const SecurityPrivacy = {
  render: () => <SecurityPrivacyPage />,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=942-6780&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
