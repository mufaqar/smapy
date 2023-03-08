import { Box, Button, Card, Stack, Text } from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";
import { PageNavigationMenu } from "@/components/landing-page/page-navigation-menu";
import Link from "next/link";
import { Accordion } from "@/components/ui/accordion";
import { Faq } from "@/components/ui/faq";
import { FloatingCard } from "@/components/landing-page/floating-card";
import { StepCard } from "@/components/landing-page/step-card";
import { CompanyLogo } from "@/components/landing-page/company-logo";
import { ImageCard } from "@/components/landing-page/image-card";
import { TestimonialCard } from "@/components/landing-page/testimonial-card";
import { ConnectButton } from "@/components/landing-page/connect-button";
import { i18nGetServerSideProps } from "@/utils/i18n-ssr";
import { useTranslation } from "next-i18next";

export const getServerSideProps = i18nGetServerSideProps(["landing-page"]);

const Home: NextPage = () => {
  const { t } = useTranslation("landing-page");

  return (
    <>
      <Head>
        <title>Smapy</title>
        <meta name="description" content="Smapy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col gap-8">
        <PageNavigationMenu />
        <section>
          <h1 className="scroll-m-20 text-6xl font-extrabold tracking-tight lg:text-6xl">
            Check our prices
          </h1>
          <p className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-3xl">
            We get best prices
          </p>

          <div className="flex flex-col gap-4">
            <FloatingCard
              logo=""
              title="Life insurance"
              linkText="compare & buy"
              href="/buy/life-insurance"
            ></FloatingCard>
            <FloatingCard
              logo=""
              title="Mortgage insurance"
              linkText="compare & buy"
              href="/buy/mortgage-insurance"
            ></FloatingCard>
            <FloatingCard
              logo=""
              title="Property insurance"
              linkText="compare & buy"
              href="/buy/property-insurance"
            ></FloatingCard>
          </div>
        </section>
        <section>
          <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
            Advance platform
          </h1>
          <p className="text-2xl font-bold tracking-tight lg:text-2xl">
            Smapy is advance
          </p>
          <p className="text-2xl lg:text-2xl">
            Smapy is a platform based on AI
          </p>
        </section>
        <section>
          <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
            How does it work
          </h1>
          <div className="flex flex-row gap-8">
            <StepCard idx={1} title="Personal info" text="fill details" />
            <StepCard idx={2} title="Personal info" text="fill details" />
            <StepCard idx={3} title="Personal info" text="fill details" />
            <StepCard idx={4} title="Personal info" text="fill details" />
          </div>
        </section>

        <section>
          <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
            Platforms for your choice
          </h1>
          <div className="flex flex-row flex-wrap justify-center gap-8">
            <CompanyLogo name="cmp1" src="/images/company-logo/klal.png" />
            <CompanyLogo name="cmp2" src="/images/company-logo/image 6.png" />
            <CompanyLogo name="cmp3" src="/images/company-logo/image 5.png" />
            <CompanyLogo name="cmp4" src="/images/company-logo/image 4.png" />
            <CompanyLogo name="cmp5" src="/images/company-logo/image 10.png" />
            <CompanyLogo name="cmp6" src="/images/company-logo/image 2.png" />
            <CompanyLogo name="cmp7" src="/images/company-logo/image 11.png" />
          </div>
        </section>

        <section>
          <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
            Four reason to choose smapy
          </h1>
          <div className="flex flex-col gap-8">
            <ImageCard
              idx={1}
              title={t("reason.title.1")}
              text={t("reason.text.1")}
              image=""
            />
            <ImageCard
              idx={2}
              title={t("reason.title.2")}
              text={t("reason.text.2")}
              image=""
            />
            <ImageCard
              idx={3}
              title={t("reason.title.3")}
              text={t("reason.text.3")}
              image=""
            />
            <ImageCard
              idx={4}
              title={t("reason.title.4")}
              text={t("reason.text.4")}
              image=""
            />
          </div>
        </section>

        <section>
          <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
            What they say about us
          </h1>
          <div className="flex flex-row gap-8">
            <TestimonialCard
              name="Ms. Tony Rutherford"
              date="2022-12-04"
              rate={5}
              image=""
            >
              <p>
                Everyone’s on the same page. Many of our people are not very
                organized naturally, so Pharps is a godsend!
              </p>
            </TestimonialCard>
            <TestimonialCard
              name="Ms. Tony Rutherford"
              date="2022-12-04"
              rate={5}
              image=""
            >
              <p>
                Everyone’s on the same page. Many of our people are not very
                organized naturally, so Pharps is a godsend!
              </p>
            </TestimonialCard>
            <TestimonialCard
              name="Ms. Tony Rutherford"
              date="2022-12-04"
              rate={5}
              image=""
            >
              <p>
                Everyone’s on the same page. Many of our people are not very
                organized naturally, so Pharps is a godsend!
              </p>
            </TestimonialCard>
            <TestimonialCard
              name="Ms. Tony Rutherford"
              date="2022-12-04"
              rate={5}
              image=""
            >
              <p>
                Everyone’s on the same page. Many of our people are not very
                organized naturally, so Pharps is a godsend!
              </p>
            </TestimonialCard>
          </div>
        </section>

        <section>
          <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
            FAQ
          </h1>
          <Accordion type="single" collapsible>
            <Faq value="q1" question="q1" answer="a1" />
            <Faq value="q2" question="q1" answer="a1" />
            <Faq value="q3" question="q1" answer="a1" />
          </Accordion>

          <Link href="/faq" legacyBehavior passHref>
            <a>More FAQ</a>
          </Link>
        </section>

        <section>
          <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-5xl">
            Will love to help
          </h1>
          <div className="flex flex-row gap-8">
            <ConnectButton icon="" text="Whatsapp" href="" />
            <ConnectButton icon="" text="email" href="" />
            <ConnectButton icon="" text="Phone" href="" />
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
