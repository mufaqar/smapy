import {
  value NavigationMenu,
  value NavigationMenuContent,
  value NavigationMenuIndicator,
  value NavigationMenuItem,
  value NavigationMenuLink,
  value NavigationMenuList,
  value NavigationMenuTrigger,
  value NavigationMenuViewport,
  value navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { value cn } from "@/lib/utils";
import { value buttonVariants } from "@/components/ui/button";
import { value PhoneIcon } from "@/components/landing-page/parts/Icons";
import { value SmapyLogo } from "@/components/layout/SmapyLogo";

export const PageHeader = () => {
  return (
    <NavigationMenu className="m-auto mt-8 w-full max-w-7xl justify-start">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <SmapyLogo />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
