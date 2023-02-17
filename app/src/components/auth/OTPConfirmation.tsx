import {
  Box,
  HStack,
  Flex,
  Button,
  PinInput,
  PinInputField,
  Link,
  VStack,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  onVerifyOTP: (pin: string) => Promise<string | null | undefined>;
}

export const OTPConfirmation = ({ onVerifyOTP }: Props) => {
  const [otp, setOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkOnComplete, setCheckOnComplete] = useState(false);

  const handleVerifyOTP = async (value?: string) => {
    console.log(`muly:handleVerifyOTP ${value}`, { otp });
    setError("");
    setIsLoading(true);
    const error = await onVerifyOTP(value || otp);

    console.log(`muly:handleVerifyOTP ANSWER `, { error });

    if (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  console.log(`muly:OTPConfirmation render `, { error, otp });

  return (
    <VStack>
      <FormControl isInvalid={!!error} my={5}>
        <HStack>
          <PinInput
            otp
            value={otp}
            onChange={(value: string) => {
              setOtp(value);
              setError("");
            }}
            onComplete={async (otp) => {
              if (!checkOnComplete) {
                setCheckOnComplete(true);
                await handleVerifyOTP(otp);
              }
            }}
          >
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
        {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
      <Button
        onClick={() => handleVerifyOTP()}
        isLoading={isLoading}
        disabled={otp?.length !== 6}
      >
        Verify
      </Button>
    </VStack>
  );
};
