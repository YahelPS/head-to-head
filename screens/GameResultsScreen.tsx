import {
  Container,
  Box,
  Heading,
  HStack,
  VStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import PlayerResults from "../components/Game/PlayerResults";
import Sign from "../components/Game/Sign";

export default function GameResultsScreen() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <Container
      h="full"
      minW="full"
      display="flex"
      flexDir="column"
      alignItems="center"
    >
      <AnimatePresence>
        <motion.div
          initial={{
            y: -500,
            opacity: 0,
          }}
          exit={{ y: -500, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
        >
          <Box display="flex" flexDir="column" alignItems="center">
            <Heading
              fontSize="6xl"
              display="flex"
              flexDir="row"
              alignItems="center"
              color="black"
              zIndex={1}
              pt={16}
              pb={20}
            >
              You placed
              <Text
                color="teal.200"
                fontSize="7xl"
                transform="rotate(10deg)"
                pl={5}
              >
                #3
              </Text>
            </Heading>
            <Sign style={{ position: "absolute" }} />
          </Box>
        </motion.div>
        {/*TODO: make podium 1 image */}
        <HStack
          alignItems="flex-end"
          pos="absolute"
          bottom={0}
          spacing="-54px"
          opacity={loaded ? 1 : 0}
          transition="all 0.5s"
        >
          <VStack spacing={-12}>
            <Box
              zIndex={2}
              transform="scale(0.67) rotate(-3deg)"
              ml={-10}
              mb={-5}
            >
              <PlayerResults
                player="Player 2"
                score={400}
                displayGuesses={false}
                isWinner={false}
              />
            </Box>
            <Image src="/2.png" draggable={false} />
          </VStack>
          <VStack spacing={-12}>
            <Box zIndex={2} transform="scale(0.8)">
              <PlayerResults
                player="Player 1"
                score={400}
                displayGuesses={false}
                isWinner={false}
              />
            </Box>
            <Image
              src="/1.png"
              zIndex={1}
              mt={-2}
              filter="drop-shadow(0px 0px 50px rgba(0,0,0,0.5));"
              draggable={false}
            />
          </VStack>
          <VStack spacing={-12} alignItems="flex-start">
            <Box zIndex={2} transform="scale(0.7) rotate(7deg)" ml={5} mb={-5}>
              <PlayerResults
                player="Player 3"
                score={400}
                displayGuesses={false}
                isWinner={false}
              />
            </Box>
            <Image src="/3.png" draggable={false} />
          </VStack>
        </HStack>
      </AnimatePresence>
    </Container>
  );
}
