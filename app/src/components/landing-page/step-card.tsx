import Link from "next/link";

interface Props {
  idx: number;
  title: string;
  text: string;
}

export const StepCard = ({ idx, text, title }: Props) => {
  return (
    <div className="flex flex-col rounded-md border">
      <p>{idx}</p>
      <p>{title}</p>
      <p>{text}</p>
    </div>
  );
};
