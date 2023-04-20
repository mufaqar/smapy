import { type NextPage } from "next";
import Head from "next/head";

import { i18nGetServerSideProps } from "../../utils/i18n-ssr";
import { AdvisorLifeInsuranceFlow } from "../../components/advisor/advisor-life-insurance/advisor-life-insurance-flow";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/layout/footer";

export const getServerSideProps = i18nGetServerSideProps(["advisor"]);

const Page: NextPage = (props) => {
  console.log(`muly:Page`, { props });

  return (
    <>
      <Head>
        <title>Smapy</title>
        <meta name="description" content="Smapy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section
        className="flex h-[650px] flex-col items-center justify-start bg-cover bg-right-bottom bg-no-repeat px-4 "
        style={{
          backgroundImage: `url("/images/rectangle-28.png")`,
        }}
      >
        <div className="container mx-auto pt-10">
          <Link href="/">
            <Image
              src="/images/mobile-logo.svg"
              width={250}
              height={100}
              alt="logo"
            />
          </Link>
        </div>
      </section>
      <main className="-mt-[500px] p-8 lg:p-0">
        <AdvisorLifeInsuranceFlow />
      </main>
      <div className="relative mt-80 md:mt-28">
        <Image
          src="/images/shape/bg-r-design.svg"
          className="absolute -top-40"
          width={130}
          height={100}
          alt="shape"
        />
        <Image
          src="/images/shape/vector-5.svg"
          className="absolute left-0 -top-[480px] -z-10"
          width={130}
          height={100}
          alt="shape"
        />
      </div>
      <Footer />
    </>
  );
};

export default Page;
