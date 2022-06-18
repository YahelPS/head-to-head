import { Container, Box, Input, Button, Text } from "@chakra-ui/react";
import { useRef } from "react";
import SignBig from "../components/Game/SignBig";

export default function NameScreen({
  name,
  callback,
}: {
  name: string | null | undefined;
  callback: (name: string | undefined) => any;
}) {
  const nameRef = useRef<HTMLInputElement>(null);

  return (
    <Container
      h="full"
      minW="full"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <SignBig />
      <Box pos="absolute" textAlign="center">
        <Text color="black" fontWeight="bold" fontSize={40}>
          How should people call you?
        </Text>
        <Input
          color="primary.2"
          mt={5}
          borderColor="transparent !important"
          borderBottomColor="primary.2 !important"
          borderWidth={3}
          defaultValue={name || ""}
          ref={nameRef}
          borderRadius={0}
          textAlign="center"
          fontSize={28}
          maxLength={20}
          w="md"
        />
        <Button
          variant="primary"
          mb={2}
          ml={5}
          onClick={() => callback(nameRef.current?.value)}
        >
          Play
        </Button>
      </Box>
    </Container>
  );
}
