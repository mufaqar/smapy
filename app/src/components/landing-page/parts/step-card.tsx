import Link from "next/link";

interface Props {
  idx: number;
  title: string;
  text: string;
}

export const StepCard = ({ idx, text, title }: Props) => {
  const timeLine =
    idx === 1
      ? "bg-secondary"
      : idx === 2
      ? "bg-[#EF5C1E]"
      : idx === 3
      ? "bg-primary"
      : "bg-primary";

  const line =
    idx === 1
      ? "bg-secondary absolute lg:h-[6px] -z-[1] h-[80%] sm:h-[80%] w-[6px] lg:w-[50%] bottom-0 left-0 lg:top-1/2 lg:transform lg:-translate-y-1/2"
      : idx === 2
      ? "lg:bg-gradient-to-l bg-gradient-to-b from-secondary sm:h-[80%] to-primary sm:bottom-0 absolute h-[100%] w-[6px]  lg:h-[6px] -z-[1] lg:w-[100%] left-0 lg:top-1/2 lg:transform lg:-translate-y-1/2"
      : idx === 3
      ? "bg-primary absolute lg:h-[6px] -z-[1] h-[100%] sm:h-[80%] w-[6px] sm:bottom-0 lg:w-[100%] left-0 lg:top-1/2 lg:transform lg:-translate-y-1/2"
      : "bg-primary absolute lg:h-[6px] h-[20%] sm:h-[80%] w-[6px] -z-[1] sm:bottom-0 lg:w-[50%] lg:right-0 right-[17px] lg:top-1/2 lg:transform lg:-translate-y-1/2";

  return (
    <div className="z-[2] flex flex-1 rounded-[40px] bg-white pr-4 shadow lg:mt-4 lg:flex-col lg:py-10 lg:pr-0">
      <div className="relative flex lg:justify-center">
        <p
          className={`z-[3] -ml-[17px] mt-6 inline-flex h-[40px] w-[40px] flex-col items-center justify-center rounded-full p-2 text-white shadow lg:mt-0 lg:ml-0 ${timeLine}`}
        >
          {idx}
        </p>
        <div className={line} />
      </div>
      <div className="py-12 pl-10 md:mt-10 md:px-8 md:pt-0 lg:mt-2 lg:pb-0">
        <p className="mt-5 pr-6 text-right text-lg font-bold md:pr-0 md:text-xl lg:text-center">
          {title}
        </p>
        <p className="mt-1 px-4 pr-5 text-right text-sm text-maingray md:mt-4 md:pr-0 md:text-lg lg:text-center">
          {text}
        </p>
      </div>
    </div>
  );
};
