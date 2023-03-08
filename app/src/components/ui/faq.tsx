import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  value: string;
  question: string;
  answer: string;
}

export const Faq = ({ value, question, answer }: Props) => {
  return (
    <AccordionItem value="item-1">
      <AccordionTrigger>{question}</AccordionTrigger>
      <AccordionContent>{answer}</AccordionContent>
    </AccordionItem>
  );
};
