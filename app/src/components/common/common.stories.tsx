import { Loading } from "./Loading";
import { Dialog } from "@/components/common/dialog";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogForm as DialogFormComponent } from "@/components/common/forms/dialog-form";
import { usePrepareSchema } from "@/components/common/forms/usePrepareSchema";
import { EditIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { z } from "zod";
import { useTranslation } from "next-i18next";

const meta = {
  component: Loading,
};

export default meta;

export const Component = {
  render: () => <Loading />,
  name: "Loading",
};

const schema = z.object({
  first_name: z.string().describe("First Name // place holder..."),
  not_required: z.string().optional().describe("First Name // place holder..."),
});

// export const Test2 = {
//   render: () => <DateRangeSelect />,
//   name: "DateRangeSelect",
// };

const SampleDialog = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
  return (
    <Dialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={
        <Button>
          <EditIcon className="mr-2 h-4 w-4" />
          Trigger
        </Button>
      }
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

export const DialogForm = () => {
  const { t } = useTranslation("customer");

  const formContext = usePrepareSchema(t, schema);
  return (
    <DialogFormComponent
      formContext={formContext}
      schema={schema}
      onSubmit={(newRec) => {
        console.log(`muly:Submit`, { newRec });
      }}
      formProps={{
        trigger: (
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add
          </Button>
        ),
        title: "Title",
        actionName: "Add",
      }}
    />
  );
};
