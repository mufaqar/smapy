import { Checkbox } from "./checkbox";

const meta = {
  component: Checkbox,
};

export default meta;

export const Primary = {
  render: (args: any) => {
    console.log(`muly:render`, { args });
    return (
      <div className="items-top flex space-x-2">
        <Checkbox id="terms1" {...args} />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            You agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
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

export const Checked = {
  ...Primary,
  args: { checked: true },
};
