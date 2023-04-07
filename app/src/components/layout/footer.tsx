import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="relative z-10 -mt-72 bg-[url('/images/mobile-footer-g.png')] bg-cover bg-no-repeat pt-20 sm:pb-20 md:-mt-2 md:bg-[#C4E4E8] md:bg-[url('/images/main-f-bg.png')]">
      <div className=" grid w-full grid-cols-1 gap-6 px-8 text-white sm:grid-cols-2 lg:grid-cols-6 lg:px-20">
        <div>
          <h2 className="text-xl md:text-2xl">אתנכשמ חוטיב</h2>
          <ul className="mt-2 flex flex-col gap-2 text-sm font-light md:text-base">
            <li>
              <Link href="#">חוטיב</Link>
            </li>
            <li>
              <Link href="#">אתנכשמ חוטיב תאוושה</Link>
            </li>
            <li>
              <Link href="#">ץעוי םע תוצעייתה - אתנכשמ ץועיי</Link>
            </li>
            <li>
              <Link href="#">החמומ תואתנכשמ</Link>
            </li>
            <li>
              <Link href="#"> ישילש דצל הבחרה :אתנכשמ חוטיב</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl">אתנכשמ חוטיב</h2>
          <ul className="mt-2 flex flex-col gap-2 text-sm font-light md:text-base">
            <li>
              <Link href="#">חוטיב</Link>
            </li>
            <li>
              <Link href="#">אתנכשמ חוטיב תאוושה</Link>
            </li>
            <li>
              <Link href="#">ץעוי םע תוצעייתה - אתנכשמ ץועיי</Link>
            </li>
            <li>
              <Link href="#">החמומ תואתנכשמ</Link>
            </li>
            <li>
              <Link href="#"> ישילש דצל הבחרה :אתנכשמ חוטיב</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl">אתנכשמ חוטיב</h2>
          <ul className="mt-2 flex flex-col gap-2 text-sm font-light md:text-base">
            <li>
              <Link href="#">חוטיב</Link>
            </li>
            <li>
              <Link href="#">אתנכשמ חוטיב תאוושה</Link>
            </li>
            <li>
              <Link href="#">ץעוי םע תוצעייתה - אתנכשמ ץועיי</Link>
            </li>
            <li>
              <Link href="#">החמומ תואתנכשמ</Link>
            </li>
            <li>
              <Link href="#"> ישילש דצל הבחרה :אתנכשמ חוטיב</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl">אתנכשמ חוטיב</h2>
          <ul className="mt-2 flex flex-col gap-2 text-sm font-light md:text-base">
            <li>
              <Link href="#">חוטיב</Link>
            </li>
            <li>
              <Link href="#">אתנכשמ חוטיב תאוושה</Link>
            </li>
            <li>
              <Link href="#">ץעוי םע תוצעייתה - אתנכשמ ץועיי</Link>
            </li>
            <li>
              <Link href="#">החמומ תואתנכשמ</Link>
            </li>
            <li>
              <Link href="#"> ישילש דצל הבחרה :אתנכשמ חוטיב</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl md:text-2xl">אתנכשמ חוטיב</h2>
          <ul className="mt-2 flex flex-col gap-2 text-sm font-light md:text-base">
            <li>
              <Link href="#">חוטיב</Link>
            </li>
            <li>
              <Link href="#">אתנכשמ חוטיב תאוושה</Link>
            </li>
            <li>
              <Link href="#">ץעוי םע תוצעייתה - אתנכשמ ץועיי</Link>
            </li>
            <li>
              <Link href="#">החמומ תואתנכשמ</Link>
            </li>
            <li>
              <Link href="#"> ישילש דצל הבחרה :אתנכשמ חוטיב</Link>
            </li>
          </ul>
        </div>
        <div className="order-first flex flex-col items-center sm:items-start md:items-center md:justify-center lg:order-last">
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
              תונכוס יפאמס © Smapy-ל תורומש תויוכזה לכ (516248580 :ןוישיר) מ"עב
              חוטיבל
            </p>
          </div>
        </div>
      </div>
      <p className="mt-10 pb-5 text-center text-sm font-light text-white sm:hidden">
        תונכוס יפאמס © Smapy-ל תורומש תויוכזה לכ (516248580 :ןוישיר) מ"עב חוטיבל
      </p>
    </footer>
  );
};
