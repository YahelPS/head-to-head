import { Container, Box, Heading, HStack, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import PlayerResults from "../components/Game/PlayerResults";
import SideSummary from "../components/Game/SideSummary";
import Sign from "../components/Game/Sign";
import game from "../pages/game";

export default function RoundResultsScreen({
  timeLeft,
  roundResults,
  game,
}: {
  timeLeft: number;
  roundResults: {
    roundNumber: number;
    roundScores: {
      [playerId: string]: number;
    };
  } | null;
  game: any;
}) {
  const [timer, setTimer] = useState(timeLeft / 1000);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, timeLeft]);

  const leaderboard = game.players
    .map((player: { name: string; clientId: string }) => ({
      name: player.name,
      clientId: player.clientId,
      score: roundResults?.roundScores[player.clientId] || 0,
    }))
    .sort((a: any, z: any) => parseFloat(z.score) - parseFloat(a.score));

  const firstPart = [...leaderboard]
    .filter((player) => player.clientId !== leaderboard[0].clientId)
    .slice(0, Math.floor(leaderboard.length / 2));

  const secondPart = [...leaderboard]
    .filter((player) => player.clientId !== leaderboard[0].clientId)
    .slice(Math.floor(leaderboard.length / 2));

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
              color="black"
              zIndex={9999}
              pt={16}
            >
              Round Results
              <Text color="teal.200" transform="rotate(10deg)" pl={5}>
                #{roundResults?.roundNumber}
              </Text>
            </Heading>
            <Heading zIndex={9999} color="black" fontSize="xl" pt={2} pb={32}>
              Time until next round: {timer} seconds
            </Heading>
            <Sign style={{ position: "absolute" }} />
          </Box>
        </motion.div>
        <HStack>
          <SideSummary direction="left" players={firstPart} />
          <PlayerResults
            player={leaderboard[0]?.name}
            guesses={leaderboard[0]?.score}
            score={leaderboard[0]?.score * 25}
          />
          <SideSummary direction="right" players={secondPart} />
        </HStack>
      </AnimatePresence>
    </Container>
  );
}
