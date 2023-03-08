import { Box, Button, Link, Stack, Text } from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

const Home: NextPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const links = [
    { href: "/signup", title: "Advisor -> Sign up" },
    { href: "/signin", title: "Advisor -> Sign In" },
    { href: "/advisor/registration", title: "Advisor -> Registration Flow" },
    {
      href: "/advisor/new-life-insurance",
      title: "Advisor -> New Life Insurance",
    },
    { href: "/advisor/dashboard", title: "Advisor -> Dashboard" },
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
