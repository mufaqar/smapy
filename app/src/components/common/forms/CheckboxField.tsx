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
import { ChoiceType, ZodDescribeType } from "./zod-describe";

export const CheckboxField = () => {
  const { field, error } = useTsController<boolean>();
  const options = useDescription();
  const { label } = options || {
    label: "",
  };

  const controlName = options?.control;

  return (
    <FormControl isInvalid={!!error} my={5}>
      {controlName !== "Checkbox" && controlName !== "Switch" && (
        <FormLabel mb={1}>{label}</FormLabel>
      )}
      <Checkbox
        name={field.name}
        isChecked={!!field.value}
        onChange={(e) => {
          field.onChange(e.target.checked);
        }}
      >
        {label}
      </Checkbox>
      {!error ? null : (
        // <FormHelperText>
        //   Enter the email you'd like to receive the newsletter on.
        // </FormHelperText>
        <FormErrorMessage>{error?.errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  );
};
