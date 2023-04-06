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
    <div className="flex flex-1 lg:flex-col z-[2] rounded-[40px] bg-white pr-4 lg:pr-0 lg:py-10 shadow lg:mt-4">
      <div className="flex relative lg:justify-center">
        <p
          className={`inline-flex h-[40px] -ml-[17px] mt-6 lg:mt-0 lg:ml-0 shadow z-[3] w-[40px] flex-col items-center justify-center rounded-full p-2 text-white ${timeLine}`}
        >
          {idx}
        </p>
        <div className={line}/>
      </div>
      <div className="pb-6 lg:pb-0 md:mt-10 pt-12 md:pt-0 lg:mt-2 md:px-8">
        <p className="mt-5 text-right pr-6 md:pr-0 lg:text-center text-lg md:text-xl font-bold">{title}</p>
        <p className="mt-1 md:mt-4 text-right pr-5 md:pr-0 lg:text-center text-sm md:text-lg px-4 text-maingray">{text}</p>
      </div>
    </div>
  );
};
