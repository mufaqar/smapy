import { Box, Button, Link, Stack, Text } from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

const Home: NextPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const links = [
    { href: "/signin?user=advisor", title: "Advisor -> Sign In" },
    { href: "/signin?user=advisor&debug=otp", title: "Advisor -> OTP" },
    { href: "/advisor/registration", title: "Advisor -> Registration Flow" },
    {
      href: "/advisor/new-life-insurance",
      title: "Advisor -> New Life Insurance",
    },
    { href: "/advisor", title: "Advisor -> Dashboard" },

    { href: "/contact/email", title: "Contact by Email" },
    { href: "/compare/life", title: "Compare Life Insurance" },
    { href: "/signin?user=customer", title: "Customer -> Sign In" },
    { href: "/signin?user=customer&debug=otp", title: "Customer -> OTP" },
    { href: "/customer/registration", title: "Advisor -> Registration Flow" },
    { href: "/customer", title: "Customer -> Dashboard" },

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
        <Stack gap={2} m={12}>
          {!user && <p>Not login</p>}
          {!!user && (
            <Box>
              <p>Welcome {user.id}</p>
              <Button
                onClick={() => {
                  void supabaseClient.auth.signOut();
                }}
              >
                Logout
              </Button>
            </Box>
          )}
          {links.map(({ href, title }) => (
            <Link key={href} as={NextLink} href={href}>
              <Text as="b">{title}</Text>
            </Link>
          ))}
        </Stack>
      </main>
    </>
  );
};

export default Home;
