import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

export default function ChatMessage({
  correct = false,
  user = "Yahel",
  message = "Hello",
}) {
  const styles = {
    container: {
      bg: "#00c75b",
      py: 1,
    },
  };
  return (
    <HStack
      flexDir="row-reverse"
      borderRadius="full"
      px={1}
      {...(correct ? styles.container : {})}
    >
      <Avatar />
      <VStack spacing={0} pr={2} alignItems="flex-end">
        {!correct && (
          <Text fontSize={18} fontWeight="bold" color="#16c57b">
            {user}
          </Text>
        )}
        <Text fontSize={16}>{message}</Text>
      </VStack>
      {correct && (
        <Text fontSize={16} fontWeight="bold" pr={12}>
          +15
        </Text>
      )}
    </HStack>
  );
}
