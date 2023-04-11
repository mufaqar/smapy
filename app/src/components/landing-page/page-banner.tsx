import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "../ui/button";

const PageBanner = ({ heading, subheading, image, mobileImage, btnText }: any) => {
  const [width, setWidth] = useState<any>();
  useLayoutEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
  
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <section
      className="flex h-[800px] flex-col items-center justify-center bg-cover bg-right-bottom bg-no-repeat px-4 lg:-mt-28 lg:h-[600px] lg:px-0 xl:h-[650px] 2xl:h-[800px]"
      style={{
        backgroundImage: `url("${width >= 768 ? image : mobileImage}")`,
      }}
    >
      <div className="text-shadow container mx-auto mt-20 flex flex-col items-end justify-center text-white md:-mt-60 lg:-mt-20">
        <h1 className="max-w-[250px] scroll-m-20 text-3xl font-extrabold tracking-tight md:max-w-[580px] md:text-5xl lg:text-6xl">
          {heading}
        </h1>
        <p className="mt-2 max-w-[250px] text-right text-xl md:max-w-[580px] lg:text-3xl">
          {subheading}
        </p>
        {btnText && <div className="mt-4 w-full max-w-[250px] md:max-w-[580px] "> <Button variant="primary">{btnText}</Button> </div> }
      </div>
      
    </section>
  );
};

export default PageBanner;
