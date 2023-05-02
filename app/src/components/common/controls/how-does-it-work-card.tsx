interface Props {
  image: string;
  idx: number;
  text: string;
}

export const HowDoesItWorkCard = ({ text, image, idx }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <img src={image} alt="" />
      <h6 className="font-normal -mt-12 text-3xl">{idx}</h6>
      <p className="text-center mt-8">{text}</p>
    </div>
  );
};
