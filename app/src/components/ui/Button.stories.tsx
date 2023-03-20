import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "./button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Design/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Sample Button</Button>
);

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "default",
};

export const Loading = Template.bind({});
Loading.args = {
  variant: "primary",
  isLoading: true,
};
