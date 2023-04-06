import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer
      className="-mt-72 z-10 relative bg-cover bg-no-repeat pt-20 sm:pb-20 bg-[url('/images/mobile-footer-g.png')] md:bg-[#C4E4E8] md:bg-[url('/images/main-f-bg.png')]"
    >
      <div className=" w-full px-8 lg:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 text-white">
        <div>
          <h2 className="text-2xl">אתנכשמ חוטיב</h2>
          <ul className="mt-2 flex flex-col gap-2 font-light">
            <li><Link href="#">חוטיב</Link></li>
            <li><Link href="#">אתנכשמ חוטיב תאוושה</Link></li>
            <li><Link href="#">ץעוי םע תוצעייתה - אתנכשמ ץועיי</Link></li>
            <li><Link href="#">החמומ תואתנכשמ</Link></li>
            <li><Link href="#"> ישילש דצל הבחרה :אתנכשמ חוטיב</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl">אתנכשמ חוטיב</h2>
          <ul className="mt-2 flex flex-col gap-2 font-light">
            <li><Link href="#">חוטיב</Link></li>
            <li><Link href="#">אתנכשמ חוטיב תאוושה</Link></li>
            <li><Link href="#">ץעוי םע תוצעייתה - אתנכשמ ץועיי</Link></li>
            <li><Link href="#">החמומ תואתנכשמ</Link></li>
            <li><Link href="#"> ישילש דצל הבחרה :אתנכשמ חוטיב</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl">אתנכשמ חוטיב</h2>
          <ul className="mt-2 flex flex-col gap-2 font-light">
            <li><Link href="#">חוטיב</Link></li>
            <li><Link href="#">אתנכשמ חוטיב תאוושה</Link></li>
            <li><Link href="#">ץעוי םע תוצעייתה - אתנכשמ ץועיי</Link></li>
            <li><Link href="#">החמומ תואתנכשמ</Link></li>
            <li><Link href="#"> ישילש דצל הבחרה :אתנכשמ חוטיב</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl">אתנכשמ חוטיב</h2>
          <ul className="mt-2 flex flex-col gap-2 font-light">
            <li><Link href="#">חוטיב</Link></li>
            <li><Link href="#">אתנכשמ חוטיב תאוושה</Link></li>
            <li><Link href="#">ץעוי םע תוצעייתה - אתנכשמ ץועיי</Link></li>
            <li><Link href="#">החמומ תואתנכשמ</Link></li>
            <li><Link href="#"> ישילש דצל הבחרה :אתנכשמ חוטיב</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl">אתנכשמ חוטיב</h2>
          <ul className="mt-2 flex flex-col gap-2 font-light">
            <li><Link href="#">חוטיב</Link></li>
            <li><Link href="#">אתנכשמ חוטיב תאוושה</Link></li>
            <li><Link href="#">ץעוי םע תוצעייתה - אתנכשמ ץועיי</Link></li>
            <li><Link href="#">החמומ תואתנכשמ</Link></li>
            <li><Link href="#"> ישילש דצל הבחרה :אתנכשמ חוטיב</Link></li>
          </ul>
        </div>
        <div className="flex flex-col order-first md:order-last md:item-center items-center md:justify-center sm:items-start md:item-center">
          <Link href="/"><Image src="/images/white-logo.svg" alt="logo" width={150} height={100} /></Link>
          <div className="flex flex-col justify-between  lg:items-center">
            <ul className="flex items-center gap-3 mt-4">
              <li className="hover:scale-110 cursor-pointer transition duration-300 ease-in-out"><Link href="#"><Image src="/images/fb.svg" alt="facebook" width={30} height={30}/></Link></li>
              <li className="hover:scale-110 cursor-pointer transition duration-300 ease-in-out"><Link href="#"><Image src="/images/LinkedIN.svg" alt="facebook" width={30} height={30}/></Link></li>
              <li className="hover:scale-110 cursor-pointer transition duration-300 ease-in-out"><Link href="#"><Image src="/images/Google+.svg" alt="facebook" width={30} height={30}/></Link></li>
            </ul>
            <p className="lg:text-center mt-5 hidden sm:block text-sm font-light">תונכוס יפאמס © Smapy-ל תורומש תויוכזה לכ
            (516248580 :ןוישיר) מ"עב חוטיבל</p>
          </div>
        </div>
      </div>
      <p className="text-center sm:hidden text-sm font-light text-white mt-10 pb-5">תונכוס יפאמס © Smapy-ל תורומש תויוכזה לכ
(516248580 :ןוישיר) מ"עב חוטיבל</p>
    </footer>
  );
};
