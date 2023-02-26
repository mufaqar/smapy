import { useMeta, useTsController } from "../../libs/react-ts-form";
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

export const CheckboxField = () => {
  const { field, error, formContext } = useTsController<boolean>();
  const meta = useMeta();
  const { label, style } = meta || {
    label: "",
  };

  const controlName = meta?.control;

  return (
    <FormControl isInvalid={!!error} {...style}>
      {/*{controlName !== "Checkbox" && controlName !== "Switch" && (*/}
      {/*  <FormLabel mb={1}>{label}</FormLabel>*/}
      {/*)}*/}
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
        <FormErrorMessage>
          {formContext.t(error?.errorMessage)}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
