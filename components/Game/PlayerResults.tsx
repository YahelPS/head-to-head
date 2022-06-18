import { VStack, Heading, Avatar } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

export default function PlayerResults({
  player,
  score,
  guesses = 0,
  isWinner = true,
  displayGuesses = true,
}: {
  player: string;
  score: number;
  guesses?: number;
  isWinner?: boolean;
  displayGuesses?: boolean;
}) {
  return (
    <motion.div
      initial={{ y: displayGuesses ? 600 : -500, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
      }}
    >
      <VStack
        // px={7}
        transform={isWinner ? "" : "scale(0.9)"}
        mt={isWinner ? 0 : 20}
      >
        {displayGuesses && <Heading>{player}</Heading>}
        <Avatar h={44} w={44} />
        {displayGuesses && (
          <Heading fontSize="3xl" pt={5} color="teal.400">
            {guesses} correct guesses
          </Heading>
        )}
        {!displayGuesses && (
          <Heading fontSize="5xl" pt={2}>
            {player}
          </Heading>
        )}
        <Heading fontSize="2xl" pt={displayGuesses ? 2 : 0} color="teal.400">
          {score} points
        </Heading>
      </VStack>
    </motion.div>
  );
}
