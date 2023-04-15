import { Input } from "./input";
import { EditIcon, PlusIcon, Trash2Icon } from "lucide-react";

const meta = {
  component: Input,
};

export default meta;

export const Default = {
  render: () => <Input />,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=4-3503&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};

export const Error = {
  render: () => <Input error="Error" />,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/sAvmr55UwcNhZNAJ9XGpA6/smapy-landing-page?node-id=4-3503&t=Omiw4Kd4jROxXo3N-4",
    },
  },
};

// TODO: See password input
export const WithRightButton = {
  render: () => <Input rightIcon={<EditIcon />} />,
};

export const WithLeftIcon = { render: () => <Input leftIcon={<EditIcon />} /> };

// Left side search icon, right side clear icon type="search"
export const Search = { render: () => <Input type="search" /> };
