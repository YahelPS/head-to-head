import { Avatar, Container, HStack, Image } from "@chakra-ui/react";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { playSound } from "../utils/audio";
import { sleep } from "../utils/time";
import Shape1 from "../components/Shapes/Shape1";
import Shape2 from "../components/Shapes/Shape2";
import Shape3 from "../components/Shapes/Shape3";
import Confetti from "../components/Confetti";

export default function win() {
  const [mounted, setMounted] = useState(false);
  const [confetti, setConfetti] = useState(false);

  async function audioSequence() {
    playSound("woosh");
    await sleep(400);
    playSound("woosh");
    await sleep(2000);
    setConfetti(true);
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Container h="100vh" minW="full" p={25} overflow="hidden">
      <Image
        src="/trivia.png"
        userSelect="none"
        w={237}
        zIndex={999}
        pos="absolute"
        draggable={false}
      />

      <Shape1 />
      <Shape2 />
      <Shape3 />

      <Confetti shouldFire={confetti} />
      {mounted ? (
        <Container alignItems="center" display="flex" justifyContent="center">
          <HStack>
            <motion.div
              onAnimationStart={audioSequence}
              animate={{
                y: [window.innerHeight + 100, 200],
              }}
            >
              <Avatar size="xl" />
            </motion.div>
            <motion.div
              onAnimationComplete={() => {
                playSound("win");
              }}
              animate={{
                y: [window.innerHeight + 100, 200],
              }}
              transition={{
                delay: 2,
                duration: 0.4,
              }}
            >
              <Avatar size="xl" />
            </motion.div>
            <motion.div
              animate={{
                y: [window.innerHeight + 100, 200],
              }}
              transition={{
                delay: 0.3,
              }}
            >
              <Avatar size="xl" />
            </motion.div>
          </HStack>
        </Container>
      ) : null}
    </Container>
  );
}
