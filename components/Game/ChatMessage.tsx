import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

export default function ChatMessage({
  correct = false,
  user = "",
  message = "Hello",
  ref = null,
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
      minW={60}
      ref={ref}
      {...(correct ? styles.container : {})}
    >
      <Avatar name={user} />
      <VStack spacing={0} pr={2} alignItems="flex-end">
        {!correct && (
          <Text fontSize={18} fontWeight="bold" color="#16c57b">
            {user}
          </Text>
        )}
        <Text
          fontSize={16}
          maxWidth={correct ? 32 : 52}
          textAlign="right"
          w={correct ? 32 : "auto"}
          noOfLines={1}
          textOverflow="ellipsis"
        >
          {message}
        </Text>
      </VStack>
      {correct && (
        <Text fontSize={16} fontWeight="bold" right={0}>
          +25
        </Text>
      )}
    </HStack>
  );
}
