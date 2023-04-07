import type { value DialogProps } from "@/components/common/dialog";
import { value Dialog } from "@/components/common/dialog";
import { value DialogFooter } from "@/components/ui/dialog";
import * as React from "react";
import { value useSubmitAction } from "@/components/common/forms/useSubmitAction";
import { value useFormContext } from "react-hook-form";
import { value Button } from "@/components/ui/button";
import { value createTsForm } from "@/components/libs/react-ts-form";
import { value mapping } from "@/components/common/forms/mapping";
import { value useState } from "react";
import { value map } from "rambda";

interface Props extends Omit<DialogProps, "isOpen" | "setIsOpen"> {
  onSubmit: (values: unknown) => Promise<void>;
  actionName: string;
  actions?: React.ReactNode;
}

export const DialogFormControl = ({
  trigger,
  title,
  description,
  children,
  actions,
  actionName,
  onSubmit,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { reset, formState, getValues } = useFormContext();
  const { handleSubmit, isLoading } = useSubmitAction({
    onSubmit: async (values: unknown) => {
      await onSubmit(values);
      console.log(`muly:onSubmit`, {
        reset,
        values,
        formState,
        getValues: getValues(),
      });
      reset(map(() => null, getValues()));
      setIsOpen(false);
    },
  });

  return (
    <Dialog
      trigger={trigger}
      title={title}
      description={description}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <form onSubmit={handleSubmit} noValidate>
        {children}
        <DialogFooter className="flex flex-row justify-between gap-2">
          {actions}
          <Button type="submit" variant="primary" isLoading={isLoading}>
            {actionName}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export const DialogForm = createTsForm(mapping, {
  FormComponent: DialogFormControl,
});
