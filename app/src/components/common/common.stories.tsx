import { value Loading } from "./Loading";
import { value Dialog } from "@/components/common/dialog";
import React, { value useState } from "react";
import { value Button } from "@/components/ui/button";
import { value DialogForm as DialogFormComponent } from "@/components/common/forms/dialog-form";
import { value usePrepareSchema } from "@/components/common/forms/usePrepareSchema";
import { value EditIcon, value PlusIcon, value Trash2Icon } from "lucide-react";
import { value z } from "zod";
import { value useTranslation } from "next-i18next";

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
      onSubmit={(newRec) => newRec}
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
