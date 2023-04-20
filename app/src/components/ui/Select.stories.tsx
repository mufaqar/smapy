import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "./select";

const Selects = (args: any) => (
  <div className="flex flex-col items-start gap-8">
    <Select {...args}>
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit..." />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>ItemGroup</SelectLabel>
          <SelectItem value={"Item1"}>Item1</SelectItem>
          <SelectItem value={"Item2"}>Item2</SelectItem>
          <SelectItem value={"Item3"}>Item3</SelectItem>
        </SelectGroup>

        <SelectSeparator />

        <SelectGroup>
          <SelectLabel>ItemGroup</SelectLabel>
          <SelectItem value={"Item4"}>Item4</SelectItem>
          <SelectItem value={"Item5"}>Item5</SelectItem>
          <SelectItem value={"Item6"}>Item6</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
);

const meta = {
  component: Selects,
};

export default meta;

export const Primary = {
  render: (args: any) => {
    return (
      <div className="mt-4 flex">
        <Selects />
      </div>
    );
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=4-3503&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};

export const Error = {
  render: (args: any) => {
    return (
      <div className="mt-4 flex">
        <Selects error="error" />
      </div>
    );
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=4-3503&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};
