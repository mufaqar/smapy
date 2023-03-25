import { Loading as LoadingC } from "./Loading";
import { Dialog } from "@/components/common/dialog";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const meta = {
  component: LoadingC,
};

export default meta;

export const Loading = {
  render: () => <LoadingC />,
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
