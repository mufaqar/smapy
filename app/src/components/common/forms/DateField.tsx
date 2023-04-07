import { value useMeta, value useTsController } from "../../libs/react-ts-form";
import type { value ZodMetaDataItem } from "../../../utils/zod-meta";
import { value maybeConvertChild } from "../wizard/useWizardFlow";
import { value Checkbox } from "@/components/ui/checkbox";
import { value clsx } from "clsx";
import { value FormControl } from "@/components/common/forms/FormControl";
import DatePicker from "react-datepicker";

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

  // console.log(
  //   `muly:DateField ${field.name} label:${label}, placeholder:${placeholder}`,
  //   {
  //     field,
  //     label,
  //     placeholder,
  //     options,
  //   }
  // );

  let control;
  if (controlName === "Checkbox") {
    control = (
      <div className="flex items-center space-x-2">
        <Checkbox
          className={clsx(["checkbox", { error: "checkbox-error" }])}
          id={field.name}
          name={field.name}
          checked={!!field.value?.getTime()}
          onCheckedChange={(checked) => {
            field.onChange(checked ? new Date() : undefined);
          }}
        />
        <label
          htmlFor={field.name}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {maybeConvertChild(label)}
        </label>
      </div>
    );
  } else {
    control = (
      <DatePicker
        name={field.name}
        onChange={(date: Date | null) => field.onChange(date || undefined)}
        selected={field.value}
      />
    );
  }

  return (
    <FormControl
      showLabel={controlName !== "Checkbox" && controlName !== "Switch"}
    >
      {control}
    </FormControl>
  );
};
