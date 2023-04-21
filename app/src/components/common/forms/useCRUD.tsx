import { DialogForm } from "@/components/common/forms/dialog-form";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import type { FormContext } from "@/components/libs/react-ts-form/FieldContext";
import type { AnyZodObject, ZodEffects } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { castError } from "@/utils/errors";

import { EditIcon, PlusIcon, Trash2Icon } from "lucide-react";

interface Props<T> {
  formContext: FormContext;
  schema: AnyZodObject | ZodEffects<any, any>;
  props?: any;

  onDelete: null | ((editRec: T) => Promise<T>);
  onUpsert: (newRec: T) => Promise<T>;
  refetch: () => Promise<void>;

  text: {
    edit: string;
    editTitle: string;
    add: string;
    addTitle: string;
    deleteTitle: string;
  };

  // preprocessField: PreprocessField;
}

export const useCRUD = <T,>({
  formContext,
  schema,
  onUpsert,
  onDelete,
  refetch,
  text,
  props,
}: Props<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (oldRec: T | undefined, newRec: T) => {
    console.log(`muly:handleSubmit`, { oldRec, newRec });
    try {
      await onUpsert({ ...(oldRec || {}), ...newRec });
      // await upsertMutation.mutateAsync({
      //   ...(oldRec || {}),
      //   ...newRec,
      // });
      await refetch();
    } catch (_err) {
      const error = castError(_err);
      toast({
        variant: "destructive",
        title: text?.addTitle || "Add",
        description: `Error: ${error.message}`,
        duration: 10000,
      });
    }
  };

  const handleDelete = async (editRec: T) => {
    if (!onDelete) {
      return;
    }

    setIsLoading(true);
    console.log(`muly:handleDelete`, { editRec });
    try {
      // await deleteMutation.mutateAsync({ id: editRec.id });
      await onDelete(editRec);

      console.log(`muly:handleDelete Done, refetch`, { editRec });
      await refetch();
      toast({
        title: text.deleteTitle,
        duration: 5000,
      });
    } catch (_err) {
      const error = castError(_err);
      toast({
        variant: "destructive",
        title: "Failed to delete",
        description: `Error: ${error.message}`,
        duration: 10000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const editDialog = (row: T) => (
    <DialogForm
      formContext={formContext}
      schema={schema}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={(newRec) => handleSubmit(row, newRec)}
      formProps={{
        trigger: (
          <Button variant="ghost" size="sm">
            <EditIcon className="mr-2 h-4 w-4" />
            {text.edit}
          </Button>
        ),
        title: text.editTitle,
        actionName: "Save",
        actions: onDelete ? (
          <Button
            onClick={() => handleDelete(row)}
            variant="outline"
            isLoading={isLoading}
          >
            <Trash2Icon className="mr-2 h-4 w-4" />
            Delete
          </Button>
        ) : undefined,
      }}
      props={props}
      defaultValues={row}
    />
  );

  const createDialog = (
    <DialogForm
      formContext={formContext}
      schema={schema}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={(newRec) => handleSubmit(undefined, newRec)}
      formProps={{
        trigger: (
          <Button variant="primary">
            <PlusIcon className="mr-2 h-4 w-4" />
            {text?.add}
          </Button>
        ),
        title: text?.addTitle || "Add",
        actionName: text?.add || "Add",
      }}
      props={props}
    />
  );

  return { editDialog, createDialog };
};
