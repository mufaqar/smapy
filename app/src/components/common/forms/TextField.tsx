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
import type { ChoiceType, ZodDescribeType } from "./zod-describe";

interface Props {
  choices?: ChoiceType[];
  type?: string;

  controlName?: ZodDescribeType["control"];
}

export const TextField = (
  // props: Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "value"> & {
  //   // label?: string;
  //   enumValues?: string[];
  // }
  { type, choices: choicesParams, controlName }: Props
) => {
  const { field, error } = useTsController<string>();
  const options = useDescription();
  const {
    label,
    placeholder,
    choices: choicesDescription,
    style,
  } = options || {
    label: "",
    placeholder: "",
  };

  const choices = choicesParams || choicesDescription;

  // const options = parseOptionsString(placeholder);
  // if (options.choices && !choices) {
  //   choices = parseChoices(String(options.choices));
  // }

  controlName = controlName || options?.control;

  // console.log(
  //   `muly:TextField ${field.name} label:${label}, placeholder:${placeholder}`,
  //   {
  //     choices,
  //     field,
  //     label,
  //     placeholder,
  //     options,
  //   }
  // );

  let control;
  if (!choices) {
    if (controlName === "Textarea") {
      control = (
        <Textarea
          maxW="sm"
          minH={32}
          name={field.name}
          placeholder={placeholder}
          value={field.value ? field.value + "" : ""}
          onChange={(e) => {
            field.onChange(e.target.value);
          }}
        />
      );
    } else if (controlName === "File") {
      control = (
        <input
          type="file"
          name={field.name}
          onChange={(e) => {
            let file;

            if (e.target.files) {
              file = e.target.files[0];
            }

            console.log(`muly:set file value`, { file, v: e.target.value });
            // @ts-ignore
            field.onChange(file);
          }}
        />
      );
    } else {
      control = (
        <Input
          maxW="sm"
          name={field.name}
          type={type || undefined}
          placeholder={placeholder}
          value={field.value ? field.value + "" : ""}
          onChange={(e) => {
            field.onChange(e.target.value);
          }}
        />
      );
    }
  } else if (controlName === "Checkbox") {
    const [valueFalse, valueTrue] =
      typeof choices[0] === "string" ? choices : [false, true];

    control = (
      <Checkbox
        name={field.name}
        isChecked={field.value == valueTrue}
        onChange={(e) => {
          field.onChange(
            e.target.checked ? String(valueTrue) : String(valueFalse)
          );
        }}
      >
        {label}
      </Checkbox>
    );
  } else if (controlName === "Switch") {
    const [valueFalse, valueTrue] =
      typeof choices[0] === "string" ? choices : [false, true];

    control = (
      <Switch
        name={field.name}
        isChecked={field.value == valueTrue}
        onChange={(e) => {
          field.onChange(
            e.target.checked ? String(valueTrue) : String(valueFalse)
          );
        }}
      >
        {label}
      </Switch>
    );
  } else if (controlName === "CheckboxGroup") {
    control = (
      <CheckboxGroup
        value={(field.value || "").split(",")}
        choices={choices}
        onChange={(value) => {
          console.log(`muly:onCjange`, { value });
          field.onChange(value.join(","));
        }}
      />
    );
  } else if (controlName === "RadioGroup") {
    control = (
      <RadioButtonGroup
        name={field.name}
        value={field.value ? field.value + "" : ""}
        choices={choices}
        onChange={(value) => {
          field.onChange(value);
        }}
      />
    );
  } else {
    control = (
      <Select
        maxW="sm"
        name={field.name}
        placeholder={placeholder}
        value={field.value ? field.value + "" : ""}
        onChange={(e) => {
          field.onChange(e.target.value);
        }}
      >
        {choices.map((choice, idx) => {
          const { id, title } =
            typeof choice === "string" ? { id: choice, title: choice } : choice;
          return (
            <option key={idx} value={id}>
              {title}
            </option>
          );
        })}
      </Select>
    );
  }

  return (
    <FormControl isInvalid={!!error} {...style}>
      {controlName !== "Checkbox" && controlName !== "Switch" && (
        <FormLabel mb={1}>{label}</FormLabel>
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
