import { HStack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import CountUp from "react-countup";

export default function PlayerSummary({
  name,
  previous,
  current,
}: {
  name: string;
  previous: number;
  current: number;
}) {
  const [total, setTotal] = useState<any>(previous);

  return (
    <HStack>
      <Text fontSize="2xl" maxWidth="40" fontWeight="bold" noOfLines={1}>
        {name}
      </Text>
      <Text fontSize="xl" maxWidth="40" fontWeight="bold" color="green.400">
        {total}
      </Text>
      <motion.div
        initial={{
          opacity: 1,
          x: 200,
        }}
        animate={{
          opacity: 0,
          x: -30,
        }}
        transition={{
          duration: 0.5,
          delay: 0.25,
          ease: "easeInOut",
        }}
        onAnimationComplete={() => {
          setTotal(<CountUp duration={0.5} start={previous} end={current} />);
        }}
      >
        <Text fontSize="xl" maxWidth="40" fontWeight="bold" color="green.400">
          +15
        </Text>
      </motion.div>
    </HStack>
  );
}
