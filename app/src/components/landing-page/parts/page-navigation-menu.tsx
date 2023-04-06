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
import { buttonVariants } from "@/components/ui/button";
import { PhoneIcon } from "@/components/landing-page/parts/Icons";
import { SmapyLogo } from "@/components/layout/SmapyLogo";
import { useTranslation } from "next-i18next";

export const PageNavigationMenu = () => {
  const { t } = useTranslation("landing-page");
  return (
    <NavigationMenu className="m-top relative z-10 m-auto hidden py-2 lg:block">
      <div className="absolute inset-0  bg-white/10 blur-[5px]"/>
      <section className="group container z-10 mx-auto flex flex-1 list-none items-center justify-center rtl:flex-row-reverse">
        
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={`mt-5 ${navigationMenuTriggerStyle()}`}>
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
            <NavigationMenuLink className={`p-0 pt-9 ${navigationMenuTriggerStyle()}`}>
              <PhoneIcon />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="mx-2">
          <Link href="/customer" legacyBehavior passHref>
            <NavigationMenuLink className={cn(buttonVariants())}>
              {t("nav.customer_entry")}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="mx-2">
          <Link href="/advisor" legacyBehavior passHref>
            <NavigationMenuLink className={`border-[#16D1C6] ${cn(buttonVariants())}`}>
              {t("nav.agent_entry")}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </section>
    </NavigationMenu>
  );
};
