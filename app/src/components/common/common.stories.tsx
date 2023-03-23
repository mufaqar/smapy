import { Loading } from "./Loading";
import { Dialog } from "@/components/common/dialog";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { pause } from "@/utils/pause";
import { DialogForm as DialogFormComponent } from "@/components/common/forms/dialog-form";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";
import { t } from "../../../.storybook/stories-utils";

const meta = {
  component: Loading,
};

export default meta;

export const Component = {
  render: () => <Loading />,
  name: "Loading",
};

const SampleDialog = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(props.isOpen);
  return (
    <Dialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={<Button>Trigger</Button>}
      title="Dialog Title"
      description="Dialog Description"
    >
      Body
    </Dialog>
  );
};

export const Test3 = {
  render: () => <SampleDialog />,
  name: "Dialog",
};

export const Test4 = {
  render: () => <SampleDialog isOpen />,
  name: "Open Dialog",
};
