import { Avatar, Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

export default function Player() {
  return (
    <HStack
      height="14"
      width="60"
      display="flex"
      // justify="center"
      borderColor="neutral.100"
      // borderWidth={1}
      // borderRadius={10}
      p={2}
    >
      <Avatar
        h={10}
        w={10}
        src="https://cdn.discordapp.com/avatars/678556376640913408/cd18845522ce69ade6b462b5e653dc57.png"
      />

      <VStack spacing={0} alignItems="flex-start">
        <Text
          fontWeight="semibold"
          fontSize="md"
          maxWidth="40"
          overflow="hidden"
          color="#6b4af3"
          noOfLines={1}
        >
          Yahel
        </Text>
        <Text
          fontWeight="bold"
          fontSize="sm"
          maxWidth="40"
          overflow="hidden"
          color="green.400"
          noOfLines={1}
        >
          15
        </Text>
      </VStack>
    </HStack>
  );
}
