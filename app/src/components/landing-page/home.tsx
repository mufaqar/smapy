import { useTranslation } from "next-i18next";
import { FloatingCard } from "@/components/landing-page/parts/floating-card";
import {
  LifeInsuranceIcon,
  MortgageInsuranceIcon,
  PropertyInsuranceIcon,
} from "@/components/landing-page/parts/Icons";
import { StepCard } from "@/components/landing-page/parts/step-card";
import { CompanyLogo } from "@/components/landing-page/parts/company-logo";
import { ImageCard } from "@/components/landing-page/parts/image-card";
import Image from "next/image";
import { TestimonialCard } from "@/components/landing-page/parts/testimonial-card";
import { Accordion } from "@/components/ui/accordion";
import { faqData } from "@/components/landing-page/parts/faq-data";
import { Faq } from "@/components/ui/faq";
import Link from "next/link";
import { SectionContactUs } from "@/components/landing-page/parts/section-contact-us";
import React from "react";
import Slider from "react-slick";

export const Home = () => {
  const { t } = useTranslation("landing-page");

  interface Settings {
    dots: boolean;
    infinite: boolean;
    arrows: boolean;
    speed: number;
    slidesToShow: number;
    slidesToScroll: number;
    initialSlide: number;
    responsive: {
      breakpoint: number;
      settings: {
        slidesToShow: number;
        slidesToScroll: number;
        infinite: boolean;
      };
    }[];
  }

  const settings: Settings = {
    dots: true,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1380,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const slider = React.useRef<Slider>(null);

  return (
    <>
      <section className="h-screen bg-[url('/images/mobile-main.png')] bg-cover bg-right-bottom bg-no-repeat lg:-mt-28 lg:bg-[url('/images/main.png')]">
        <div className="container mx-auto flex h-full flex-col items-end justify-center lg:justify-end">
          <div className="mb-24 w-full px-4 pr-[50%] text-right lg:px-0 lg:pr-[12%] 2xl:pr-[7%]">
            <h1 className="text-shadow mb-4 max-w-[600px] scroll-m-20 text-[30px] font-extrabold leading-[38px]  tracking-tight text-white sm:text-5xl sm:leading-[60px] lg:mb-0 lg:text-6xl lg:leading-[75px]">
              {t("index.header")}
            </h1>
            <p className="text-shadow max-w-[550px] scroll-m-20 text-xl font-bold tracking-tight text-white md:text-3xl lg:text-3xl">
              {t("index.header_2")}
            </p>
          </div>
        </div>

        <div className="container relative mx-auto flex flex-col items-center gap-4">
          <FloatingCard
            icon={<LifeInsuranceIcon />}
            title={t("index.floating.1")}
            linkText={t("index.floating.link_text")}
            href="/compare/life"
            whitebg="/images/blob-white-1.png"
            colorbg="/images/blob-color-1.png"
            id="1"
            className="absolute -left-6 scale-75 sm:scale-90 md:scale-100 lg:-top-[480px] lg:left-[100px] xl:left-[270px] 2xl:-top-[610px]"
          ></FloatingCard>
          <FloatingCard
            icon={<MortgageInsuranceIcon />}
            title={t("index.floating.2")}
            linkText={t("index.floating.link_text")}
            href="/compare/mortgage"
            whitebg="/images/blob-white-2.png"
            colorbg="/images/blob-color-2.png"
            id="2"
            className="_left absolute -top-28 scale-[0.8] sm:scale-100 lg:-top-[220px] lg:left-[180px] xl:left-[280px] 2xl:-top-[320px]"
          ></FloatingCard>
          <FloatingCard
            icon={<PropertyInsuranceIcon />}
            title={t("index.floating.3")}
            linkText={t("index.floating.link_text")}
            href="/compare/property"
            whitebg="/images/blob-white-3.png"
            colorbg="/images/blob-color-3.png"
            id="3"
            className="absolute -top-60 -left-4 scale-90 md:left-0 md:scale-95 lg:top-0 lg:scale-100 xl:-top-[90px] xl:left-[20px]"
          ></FloatingCard>
        </div>
      </section>

      <section className="relative mt-40 px-4 lg:mt-0 lg:px-0">
        <div className="container mx-auto mt-12 max-w-5xl text-center">
          <h1 className="main-heading">{t("index.sections.1.header")}</h1>
          <p className="mb-6 mt-4 text-lg font-bold tracking-tight lg:text-2xl">
            {t("index.sections.1.text.1")}
          </p>
          <p className="text-base md:text-2xl">
            {t("index.sections.1.text.2")}
          </p>
        </div>
        <Image
          src="/images/orange-shape.png"
          alt="shape"
          width={140}
          height={100}
          className="absolute left-0 -z-[1] mt-20 md:mt-0 lg:top-0"
        />
        <Image
          src="/images/blue-shape.png"
          alt="shape"
          width={140}
          height={100}
          className="absolute right-0 -top-20 -z-[1]"
        />
      </section>

      <section className="relative">
        <div className="container mx-auto mt-12 px-4 text-center lg:px-0">
          <h1 className="main-heading mb-6">{t("index.sections.2.header")}</h1>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <StepCard
              idx={1}
              title={t("index.sections.2.steps.1.title")}
              text={t("index.sections.2.steps.1.text")}
            />
            <StepCard
              idx={2}
              title={t("index.sections.2.steps.2.title")}
              text={t("index.sections.2.steps.2.text")}
            />
            <StepCard
              idx={3}
              title={t("index.sections.2.steps.3.title")}
              text={t("index.sections.2.steps.3.text")}
            />
            <StepCard
              idx={4}
              title={t("index.sections.2.steps.4.title")}
              text={t("index.sections.2.steps.4.text")}
            />
          </div>
        </div>
        <Image
          src="/images/mbl-r-shape.svg"
          alt="shape"
          className="absolute bottom-20 right-0 md:hidden"
          width={120}
          height={200}
        />
      </section>

      <section className="mt-10 bg-[#E7F3F3] px-4 py-10 text-center md:mt-16 md:bg-transparent lg:mt-24 lg:px-0">
        <h1 className="main-heading mb-8">{t("index.sections.3.header")}</h1>
        <div className="container mx-auto flex flex-row flex-wrap justify-center gap-3 md:gap-5 lg:gap-8">
          <CompanyLogo name="cmp1" src="/images/company-logo/klal.png" />
          <CompanyLogo name="cmp2" src="/images/company-logo/image 6.png" />
          <CompanyLogo name="cmp3" src="/images/company-logo/image 5.png" />
          <CompanyLogo name="cmp4" src="/images/company-logo/image 4.png" />
          <CompanyLogo name="cmp5" src="/images/company-logo/image 10.png" />
          <CompanyLogo name="cmp6" src="/images/company-logo/image 2.png" />
          <CompanyLogo name="cmp7" src="/images/company-logo/image 11.png" />
        </div>
      </section>

      <section className="relative mt-20">
        <h1 className="main-heading mb-10 text-center">
          {t("index.sections.4.header")}
        </h1>
        <div className="container mx-auto grid gap-8 sm:grid-cols-2 md:px-16">
          <ImageCard
            idx={1}
            title={t("index.sections.4.reasons.1.title")}
            text={t("index.sections.4.reasons.1.text")}
            image="/images/image-card/image1.svg"
            imageMbl="/images/image-card/mbl-1.svg"
            imageWidth="320"
          />
          <ImageCard
            idx={2}
            title={t("index.sections.4.reasons.2.title")}
            text={t("index.sections.4.reasons.2.text")}
            image="/images/image-card/image2.svg"
            imageMbl="/images/image-card/mbl-2.svg"
            imageWidth="230"
          />
          <ImageCard
            idx={3}
            title={t("index.sections.4.reasons.3.title")}
            text={t("index.sections.4.reasons.3.text")}
            image="/images/image-card/image3.svg"
            imageMbl="/images/image-card/mbl-3.svg"
            imageWidth="470"
          />
          <ImageCard
            idx={4}
            title={t("index.sections.4.reasons.4.title")}
            text={t("index.sections.4.reasons.4.text")}
            image="/images/image-card/image4.svg"
            imageMbl="/images/image-card/mbl-4.svg"
            imageWidth="500"
          >
            <div className="mt-7  flex flex-row justify-center gap-6">
              <Image
                src="/images/doing-well/image19.png"
                alt=""
                width={70}
                height={40}
              />
              <Image
                src="/images/doing-well/image20.png"
                alt=""
                width={75}
                height={70}
              />
              <Image
                src="/images/doing-well/image21.png"
                alt=""
                width={72}
                height={70}
              />
            </div>
          </ImageCard>
        </div>
        <img
          src="/images/bg-1.png"
          alt="background"
          className="absolute -top-5 right-0 -z-10 hidden w-[35%] md:block "
        />
        <img
          src="/images/outline-bg-2.svg"
          alt="background"
          className="absolute -bottom-72 right-0 hidden w-[210px]  md:block "
        />
        <img
          src="/images/bg-2.svg"
          alt="background"
          className="absolute top-40 left-0 -z-10 hidden w-[150px] md:block "
        />
      </section>

      <section className=" _testimonial mt-10 overflow-x-hidden bg-[#E7F3F3] py-10 px-4 pb-16 text-center md:px-0 lg:mt-20">
        <h1 className="main-heading mb-6">{t("index.sections.5.header")}</h1>
        <div className="container relative mx-auto gap-8">
          <Slider ref={slider} {...settings}>
            <TestimonialCard
              name={t("index.sections.5.cards.1.name")}
              date="2022-12-04"
              rate={5}
              image="/images/profile/1.png"
            >
              <p>{t("index.sections.5.cards.1.text")}</p>
            </TestimonialCard>
            <TestimonialCard
              name={t("index.sections.5.cards.2.name")}
              date="2022-12-04"
              rate={4}
              image="/images/profile/2.png"
            >
              <p>{t("index.sections.5.cards.2.text")}</p>
            </TestimonialCard>
            <TestimonialCard
              name={t("index.sections.5.cards.3.name")}
              date="2022-12-04"
              rate={5}
              image="/images/profile/2.png"
            >
              <p>{t("index.sections.5.cards.3.text")}</p>
            </TestimonialCard>
            <TestimonialCard
              name={t("index.sections.5.cards.4.name")}
              date="2022-12-04"
              rate={5}
              image="/images/profile/1.png"
            >
              <p>{t("index.sections.5.cards.4.text")}</p>
            </TestimonialCard>
            <TestimonialCard
              name={t("index.sections.5.cards.4.name")}
              date="2022-12-04"
              rate={5}
              image="/images/profile/1.png"
            >
              <p>{t("index.sections.5.cards.4.text")}</p>
            </TestimonialCard>
          </Slider>
          <button
            onClick={() => slider?.current?.slickPrev()}
            className="absolute top-1/2 -left-6 hidden -translate-y-1/2 cursor-pointer md:block"
          >
            <Image
              src="/images/left-arrow.svg"
              alt="arrow"
              width={15}
              height={30}
            />
          </button>
          <button
            onClick={() => slider?.current?.slickNext()}
            className="absolute top-1/2 -right-6 hidden -translate-y-1/2 cursor-pointer md:block"
          >
            <Image
              src="/images/right-arrow.svg"
              alt="arrow"
              width={15}
              height={30}
            />
          </button>
          {/* <renderDots/> */}
        </div>
      </section>

      <section className="relative mt-10 mb-20 px-4 lg:mt-20 lg:px-0">
        <div className="container mx-auto">
          <h1 className="main-heading mb-6 text-center">
            {t("index.sections.6.header")}
          </h1>
          <Accordion type="single" collapsible>
            {faqData.slice(0, 3).map(({ q, a }, idx: number) => (
              <Faq key={idx} value={`${idx}`} question={q} answer={a} />
            ))}
          </Accordion>
          <div className="mt-4 w-full text-base underline rtl:text-left lg:text-[22px]">
            <Link href="/faq" legacyBehavior passHref>
              <a>{t("index.sections.6.more_faqs")}</a>
            </Link>
          </div>
        </div>
        <Image
          src="/images/faq-shape.svg"
          alt="shape"
          className="absolute left-0 mt-10 hidden lg:block"
          width={150}
          height={100}
        />
      </section>

      <SectionContactUs>
        <h1 className="main-heading">{t("index.sections.7.header")}</h1>
        <span className="mt-2">{t("index.sections.7.text")}</span>
      </SectionContactUs>
    </>
  );
};
