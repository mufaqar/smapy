import { createTsForm } from "../../libs/react-ts-form";
import { mapping } from "./mapping";
import type { FormEvent } from "react";
import React, { useContext } from "react";
import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Modal,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import type { GridProps } from "@chakra-ui/layout/dist/grid";
import { FormLayout } from "./FormLayout";
import { useSubmitAction } from "./useSubmitAction";
import {
  type Action,
  ModalFormActionContext,
} from "../modal/ModalFormActionContext";
import { useFormContext } from "react-hook-form";
import { DeleteIcon } from "@chakra-ui/icons";
import { ChakraProps } from "@chakra-ui/system/dist/system.types";

interface CommonFormProps {
  // onClose: () => void;
  actionName: string;
  title: string;
  onSubmit: (values: unknown) => Promise<void>;
  children: React.ReactNode;
  actions?: React.ReactNode;

  style?: ChakraProps | GridProps;
}

const CommonForm = ({
  actionName,
  title,
  onSubmit,
  children,
  style,
  actions,
}: CommonFormProps) => {
  const onClose = useContext<Action>(ModalFormActionContext);
  const { reset } = useFormContext();
  const { handleSubmit, isLoading } = useSubmitAction({
    onSubmit: async (values: unknown) => {
      await onSubmit(values);
      onClose();
      reset();
    },
  });

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        void handleSubmit(e);
      }}
      noValidate
    >
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormLayout style={style}>{children}</FormLayout>
        </ModalBody>

        <ModalFooter gap={4} justifyContent={actions ? "space-between" : "end"}>
          {actions}
          <Button type="submit" colorScheme="blue" mr={3} isLoading={isLoading}>
            {actionName}
          </Button>
        </ModalFooter>
      </ModalContent>
    </form>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const ModalForm = createTsForm(mapping, {
  FormComponent: CommonForm,
});
