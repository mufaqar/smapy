import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { PhoneIcon } from "@/components/landing-page/parts/Icons";
import { SmapyLogo } from "@/components/layout/SmapyLogo";
import { useTranslation } from "next-i18next";
import MobileNavMenu from "./MobileNavMenu";
import Image from "next/image";
import { useState } from "react";

export const PageNavigationMenu = () => {
  const { t } = useTranslation("landing-page");
  const [openMobileNav, setOpenMobileNav] = useState(false);
  return (
    <>
      <NavigationMenu className="m-top relative z-10 m-auto hidden py-2 lg:block">
        <div className=" inset-0  bg-white/10 blur-[5px]" />
        <section className="group container z-10 mx-auto flex flex-1 list-none items-center justify-center rtl:flex-row-reverse">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={`mt-5 ${navigationMenuTriggerStyle()}`}
              >
                <SmapyLogo />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/about-us" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {t("nav.about")}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/faq" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {t("nav.faqData")}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/prices" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {t("nav.price")}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/security-privacy" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {t("nav.security")}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <div className="grow"></div>

          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink
                className={`p-0 pt-4 ${navigationMenuTriggerStyle()}`}
              >
                <PhoneIcon />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="mx-2">
            <Link href="/customer" legacyBehavior passHref>
              <NavigationMenuLink>
                <Button variant="default">
                  {t("nav.customer_entry")}
                </Button>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="mx-2">
            <Link href="/advisor" legacyBehavior passHref>
              <NavigationMenuLink>
                <Button variant="secondaryBorder">
                  {t("nav.agent_entry")}
                </Button>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </section>
      </NavigationMenu>
      <MobileNavMenu>
        <div className="lg:hidden">
          <button
            className="absolute top-0 left-0"
            onClick={() => setOpenMobileNav(true)}
          >
            <Image
              src="/images/mobile-menu.svg"
              alt="menu"
              width={110}
              height={100}
            />
          </button>
          <Link href="/" className="absolute top-4 right-4">
            <Image
              src="/images/mobile-logo.svg"
              alt="logo"
              width={220}
              height={100}
            />
          </Link>
        </div>
        {openMobileNav && (
          <nav className="fixed inset-0 z-50 bg-white lg:hidden">
            <button
              className="absolute top-4 right-4 z-50 cursor-pointer"
              onClick={() => setOpenMobileNav(false)}
            >
              <Image src="/images/x.svg" alt="menu" width={30} height={100} />
            </button>
            <Image
              src="/images/open-nav-icon.svg"
              alt="menu"
              width={135}
              height={100}
              className="absolute top-0 left-0"
            />

            <NavigationMenu>
              <section>
                <div className="mt-20 flex list-none flex-col gap-3 text-center">
                  <NavigationMenuItem>
                    <Link href="/about-us" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {t("nav.about")}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/faq" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {t("nav.faqData")}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/prices" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {t("nav.price")}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/security-privacy" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {t("nav.security")}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </div>
                <div className="mt-6 flex list-none flex-col items-center justify-center gap-5">
                  <NavigationMenuItem className="mx-2">
                    <Link href="/customer" legacyBehavior passHref>
                      <NavigationMenuLink>
                        <Button variant="secondary">
                          {t("nav.customer_entry")}
                        </Button>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="mx-2">
                    <Link href="/advisor" legacyBehavior passHref>
                      <NavigationMenuLink>
                        <Button variant="primary">
                          {t("nav.agent_entry")}
                        </Button>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </div>
                <div className="mt-10 flex list-none items-center justify-center border-t-[1px] border-gray-200 pt-10 ">
                  <NavigationMenuItem>
                    <Link href="/about-us" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        <Image
                          src="/images/Facebook.svg"
                          alt="faceboook"
                          width={42}
                          height={42}
                        />
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/about-us" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        <Image
                          src="/images/Linkedin-ico.svg"
                          alt="faceboook"
                          width={42}
                          height={42}
                        />
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/about-us" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        <Image
                          src="/images/Google+ico.svg"
                          alt="faceboook"
                          width={42}
                          height={42}
                        />
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </div>
                <div className="mt-5 flex list-none flex-col gap-3 text-center">
                  <NavigationMenuItem>
                    <Link href="/about-us" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        <span className="font-normal text-[#495057]">
                          שומיש יאנת
                        </span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/about-us" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        <span className="font-normal text-[#495057]">
                          תויטרפ תוינידמ
                        </span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/about-us" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        <span className="font-normal text-[#495057]">
                          תודוא
                        </span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </div>
              </section>
            </NavigationMenu>
          </nav>
        )}
      </MobileNavMenu>
    </>
  );
};
