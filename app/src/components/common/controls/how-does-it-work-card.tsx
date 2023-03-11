interface Props {
  image: string;
  idx: number;
  text: string;
}

export const HowDoesItWorkCard = ({ text, image, idx }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <img src={image} />
      <div>{idx}</div>
      <div>{text}</div>
    </div>
  );
};
