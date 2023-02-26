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
import type { ZodMetaDataItem } from "../../../utils/zod-meta";

interface Props {
  controlName?: ZodMetaDataItem["control"];
}

export const DateField = (
  // props: Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "value"> & {
  //   // label?: string;
  //   enumValues?: string[];
  // }
  { controlName }: Props
) => {
  const { field, error, formContext } = useTsController<Date>();
  const options = useMeta();
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
      {!error?.errorMessage ? null : (
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
