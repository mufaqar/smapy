import { createTsForm } from "../../libs/react-ts-form";
import { mapping } from "./mapping";
import type { FormEvent } from "react";
import React from "react";
import { Button, Stack } from "@chakra-ui/react";
import type { GridProps } from "@chakra-ui/layout/dist/grid";
import { FormLayout } from "./FormLayout";
import { useSubmitAction } from "./useSubmitAction";
import type { ButtonProps } from "@chakra-ui/button/dist/button";
import { ChakraProps } from "@chakra-ui/system/dist/system.types";

export interface CommonFormProps {
  onSubmit: (values: unknown) => Promise<void>;
  children: React.ReactNode;

  submit?: ButtonProps & {
    text?: string;
    notification?: boolean;
  };

  style?: ChakraProps | GridProps;
}

const CommonForm = ({ onSubmit, children, submit, style }: CommonFormProps) => {
  const { text, notification, ...buttonProps } = submit || {
    text: "Save",
    notification: false,
  };
  const { handleSubmit, isLoading } = useSubmitAction({
    onSubmit,
    notification,
  });

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        void handleSubmit(e);
      }}
      noValidate
    >
      <Stack>
        <FormLayout style={style}>{children}</FormLayout>
        <Button
          // Defaults
          minW={36}
          mt={8}
          type="submit"
          isLoading={isLoading}
          {...buttonProps}
        >
          {text}
        </Button>
      </Stack>
    </form>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Form = createTsForm(mapping, {
  FormComponent: CommonForm,
});
