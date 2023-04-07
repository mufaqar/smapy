import { type NextPage } from "next";
import Head from "next/head";
import {
  value useUser,
  value useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home: NextPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const links = [
    { href: "/signin?user=advisor", title: "Advisor -> Sign In" },
    { href: "/signin?user=advisor&debug=otp", title: "Advisor -> OTP" },
    { href: "/advisor/registration", title: "Advisor -> Registration Flow" },
    {
      href: "/advisor/life-insurance",
      title: "Advisor -> Life Insurance",
      auth: true,
    },
    { href: "/advisor", title: "Advisor -> Dashboard", auth: true },

    { href: "/contact/email", title: "Contact by Email" },
    { href: "/compare/life", title: "Compare Life Insurance" },
    { href: "/signin?user=customer", title: "Customer -> Sign In" },
    { href: "/signin?user=customer&debug=otp", title: "Customer -> OTP" },
    { href: "/customer/registration", title: "Customer -> Registration Flow" },
    { href: "/customer", title: "Customer -> Dashboard", auth: true },

    { href: "/blog/sample-blog-post", title: "Blog (Style:Square)" },
    { href: "/blog/sample-blog-polygon-style", title: "Blog (Style:Polygon)" },
  ];

  return (
    <>
      <Head>
        <title>Smapy v0.0.2</title>
        <meta name="description" content="Smapy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="m-12 flex flex-col gap-2">
          {!user && <p>Not login</p>}
          {!!user && (
            <div>
              <p>Welcome {user.id}</p>
              <Button
                onClick={() => {
                  void supabaseClient.auth.signOut();
                }}
              >
                Logout
              </Button>
            </div>
          )}
          {links.map(({ href, title, auth }) => (
            <Link
              className={cn({ "pointer-events-none": auth && !user?.id })}
              key={href}
              href={href}
            >
              <div>{title}</div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
