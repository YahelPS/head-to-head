import { VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import PlayerSummary from "./PlayerSummary";

export default function SideSummary({
  direction,
  players,
}: {
  direction: string;
  players: {
    name: string;
    clientId: string;
    score: number;
  }[];
}) {
  return (
    <VStack p={10}>
      {players.map((player, index) => (
        <motion.div
          key={index}
          initial={{
            x: direction === "left" ? -100 : 100,
          }}
          animate={{
            x: 0,
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.15,
            ease: "easeInOut",
          }}
        >
          <PlayerSummary
            name={player.name}
            previous={0}
            current={player.score * 25}
          />
        </motion.div>
      ))}
    </VStack>
  );
}
