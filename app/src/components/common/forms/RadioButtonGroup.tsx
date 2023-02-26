/* eslint-disable
      @typescript-eslint/no-unsafe-assignment
*/

import { Box, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";
import type { UseRadioProps } from "@chakra-ui/radio/dist/use-radio";
import React from "react";
import type { UseRadioGroupProps } from "@chakra-ui/radio/dist/use-radio-group";
import type { ChoiceType } from "../../../utils/zod-meta";

interface RCProps extends UseRadioProps {
  children: React.ReactNode;
}

const RadioCard = ({ children, ...props }: RCProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  // console.log(`muly:RadioCard`, { input });

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
        minWidth={32}
        minHeight={12}
      >
        {children}
      </Box>
    </Box>
  );
};

interface Props extends UseRadioGroupProps {
  choices: ChoiceType[];
}

export const RadioButtonGroup = ({ choices, ...props }: Props) => {
  const { getRootProps, getRadioProps } = useRadioGroup(props);

  const group = getRootProps();

  return (
    <HStack {...group}>
      {choices.map((choice, idx) => {
        // console.log(`muly:RadioButtonGroup:${idx}`, { choice, idx });
        const { id, title } =
          typeof choice === "string" ? { id: choice, title: choice } : choice;
        const radio = getRadioProps({ value: String(id) });
        return (
          <RadioCard key={idx} {...radio}>
            {title}
          </RadioCard>
        );
      })}
    </HStack>
  );
};
