import { type NextPage } from "next";
import Head from "next/head";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Smapy v0.0.2</title>
        <meta name="description" content="Smapy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="m-12 flex flex-col gap-2"></div>
      </main>
    </>
  );
};

export default Page;
