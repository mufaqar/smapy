import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
export const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <footer className="relative z-10 -mt-72 bg-[url('/images/mobile-footer-g.png')] bg-cover bg-no-repeat pt-20 sm:pb-20 md:-mt-2 md:bg-[#C4E4E8] md:bg-[url('/images/main-f-bg.png')]">
      <div className=" grid w-full grid-cols-1 gap-6 px-8 text-white sm:grid-cols-2 lg:grid-cols-6 lg:px-20">
        <div>
          <h2 className="text-xl md:text-2xl">
            {t("footer.structure_ins.header")}
          </h2>
          <ul className="mt-2 flex flex-col gap-2 text-sm font-light md:text-base">
            <li>
              <Link href="#">{t("footer.structure_ins.list.1")}</Link>
            </li>
            <li>
              <Link href="#">{t("footer.structure_ins.list.2")}</Link>
            </li>
            <li>
              <Link href="#">{t("footer.structure_ins.list.3")}</Link>
            </li>
            <li>
              <Link href="#">{t("footer.structure_ins.list.4")}</Link>
            </li>
            <li>
              <Link href="#">{t("footer.structure_ins.list.5")}</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl">
            {t("footer.mortgage_struct_ins.header")}
          </h2>
          <ul className="mt-2 flex flex-col gap-2 text-sm font-light md:text-base">
            <li>
              <Link href="#">{t("footer.mortgage_struct_ins.list.1")}</Link>
            </li>
            <li>
              <Link href="#">{t("footer.mortgage_struct_ins.list.2")}</Link>
            </li>
            <li>
              <Link href="#">{t("footer.mortgage_struct_ins.list.3")}</Link>
            </li>
            <li>
              <Link href="#">{t("footer.mortgage_struct_ins.list.4")}</Link>
            </li>
            <li>
              <Link href="#">{t("footer.mortgage_struct_ins.list.5")}</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl">
            {t("footer.mortgage_life_ins.header")}
          </h2>
          <ul className="mt-2 flex flex-col gap-2 text-sm font-light md:text-base">
            <li>
              <Link href="#">{t("footer.mortgage_life_ins.list.1")}</Link>
            </li>
            <li>
              <Link href="#">{t("footer.mortgage_life_ins.list.2")}</Link>
            </li>
            <li>
              <Link href="#">{t("footer.mortgage_life_ins.list.3")}</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl">{t("footer.life_ins.header")}</h2>
          <ul className="mt-2 flex flex-col gap-2 text-sm font-light md:text-base">
            <li>
              <Link href="#">{t("footer.life_ins.list.1")}</Link>
            </li>
            <li>
              <Link href="#">{t("footer.life_ins.list.2")}</Link>
            </li>
            <li>
              <Link href="#">{t("footer.life_ins.list.3")}</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl">{t("footer.info.header")}</h2>
          <ul className="mt-2 flex flex-col gap-2 text-sm font-light md:text-base">
            <li>
              <Link href="#">{t("footer.info.list.1")}</Link>
            </li>
            <li>
              <Link href="#">{t("footer.info.list.2")}</Link>
            </li>
            <li>
              <Link href="#">{t("footer.info.list.3")}</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl">{t("footer.map.header")}</h2>
          <ul className="mt-2 flex flex-col gap-2 text-sm font-light md:text-base">
            <li>
              <Link href="#">{t("footer.map.list.1")}</Link>
            </li>
            <li>
              <Link href="#">{t("footer.map.list.2")}</Link>
            </li>
            <li>
              <Link href="#">{t("footer.map.list.3")}</Link>
            </li>
            <li>
              <Link href="#">{t("footer.map.list.4")}</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl">{t("footer.help.header")}</h2>
          <ul className="mt-2 flex flex-col gap-2 font-light">
            <li>
              <Link href="#">{t("footer.help.list.1")}</Link>
            </li>
            <li>
              <Link href="#">{t("footer.help.list.2")}</Link>
            </li>
          </ul>
        </div>
        <div className="md:item-center order-first flex flex-col items-center sm:items-start md:order-last md:justify-center">
          <Link href="/">
            <Image
              src="/images/white-logo.svg"
              alt="logo"
              width={150}
              height={100}
            />
          </Link>
          <div className="flex flex-col justify-between  lg:items-center">
            <ul className="mt-4 flex items-center gap-3">
              <li className="cursor-pointer transition duration-300 ease-in-out hover:scale-110">
                <Link href="#">
                  <Image
                    src="/images/fb.svg"
                    alt="facebook"
                    width={30}
                    height={30}
                  />
                </Link>
              </li>
              <li className="cursor-pointer transition duration-300 ease-in-out hover:scale-110">
                <Link href="#">
                  <Image
                    src="/images/LinkedIN.svg"
                    alt="facebook"
                    width={30}
                    height={30}
                  />
                </Link>
              </li>
              <li className="cursor-pointer transition duration-300 ease-in-out hover:scale-110">
                <Link href="#">
                  <Image
                    src="/images/Google+.svg"
                    alt="facebook"
                    width={30}
                    height={30}
                  />
                </Link>
              </li>
            </ul>
            <p className="mt-5 hidden text-sm font-light sm:block lg:text-center">
              {t("footer.copyright")}
            </p>
          </div>
        </div>
      </div>
      <p className="mt-10 pb-5 text-center text-sm font-light text-white sm:hidden">
        {t("footer.copyright")}
      </p>
    </footer>
  );
};
