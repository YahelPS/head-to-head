import { Avatar, Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

export default function Player({
  points,
  name,
  leader,
  self,
  rank,
}: {
  points: number;
  name: string;
  leader: boolean;
  self: boolean;
  rank: number;
}) {
  return (
    <HStack>
      <Text>#{rank}</Text>

      <HStack
        height="14"
        width="60"
        display="flex"
        bg={self ? "rgba(255, 255, 255, 0.2)" : ""}
        borderRadius="full"
        p={2}
      >
        <Avatar
          h={10}
          w={10}
          draggable={false}
          name={name}
          src="https://cdn.discordapp.com/avatars/678556376640913408/cd18845522ce69ade6b462b5e653dc57.png"
        />

        <VStack spacing={0} alignItems="flex-start">
          <HStack>
            <Text
              // fontWeight="semibold"
              fontSize="md"
              maxWidth="40"
              overflow="hidden"
              // color="#6b4af3"
              noOfLines={1}
            >
              {name}
            </Text>
            {leader && (
              <Image
                src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f451.png"
                height={4}
                draggable={false}
              />
            )}
          </HStack>
          <Text
            // fontWeight="bold"
            fontSize="sm"
            maxWidth="40"
            overflow="hidden"
            color="green.400"
            noOfLines={1}
          >
            {points} points
          </Text>
        </VStack>
      </HStack>
    </HStack>
  );
}
