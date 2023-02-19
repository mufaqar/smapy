import { useDescription, useTsController } from "../../libs/react-ts-form";
import {
  Input,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Switch,
  Checkbox,
  Textarea,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { RadioButtonGroup } from "./RadioButtonGroup";
import { CheckboxGroup } from "./CheckboxGroup";
import { parseChoices, parseOptionsString } from "./parse-option-string";
import type { ZodDescribeType } from "./zod-describe";
import { ChoiceType } from "./zod-describe";

interface Props {
  controlName?: ZodDescribeType["control"];
}

export const DateField = (
  // props: Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "value"> & {
  //   // label?: string;
  //   enumValues?: string[];
  // }
  { controlName }: Props
) => {
  const { field, error } = useTsController<Date>();
  const options = useDescription();
  const { label, placeholder } = options || {
    label: "",
    placeholder: "",
  };

  controlName = controlName || options?.control;

  console.log(
    `muly:DateField ${field.name} label:${label}, placeholder:${placeholder}`,
    {
      field,
      label,
      placeholder,
      options,
    }
  );

  let control;
  if (controlName === "Checkbox") {
    control = (
      <Checkbox
        name={field.name}
        isChecked={!!field.value?.getTime()}
        onChange={(e) => {
          field.onChange(e.target.checked ? new Date() : undefined);
        }}
      >
        {label}
      </Checkbox>
    );
  }

  return (
    <FormControl isInvalid={!!error} my={5}>
      {controlName !== "Checkbox" && controlName !== "Switch" && (
        <FormLabel mb={1} whiteSpace="nowrap">
          {label}
        </FormLabel>
      )}
      {control}
      {!error ? null : (
        // <FormHelperText>
        //   Enter the email you'd like to receive the newsletter on.
        // </FormHelperText>
        <FormErrorMessage>{error?.errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  );
};
