import { Container } from "@chakra-ui/layout";
import { Box, Image, useBreakpointValue, VStack, Text } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import ChatMessage from "../../components/Game/ChatMessage";

import Player from "../../components/Game/Player";
import QuestionFrame from "../../components/Game/QuestionFrame";
import Sign from "../../components/Game/Sign";
import Timer from "../../components/Game/Timer";
import Shape1 from "../../components/Shapes/Shape1";
import Shape2 from "../../components/Shapes/Shape2";
import Shape3 from "../../components/Shapes/Shape3";
import BeforeGame from "../../screens/BeforeGame";
import GameResultsScreen from "../../screens/GameResultsScreen";
import GameStarted from "../../screens/GameStarted";
import NameScreen from "../../screens/NameScreen";
import RoundResultsScreen from "../../screens/RoundResultsScreen";
import { randomName } from "../../utils/strings";

interface Game {
  id: string;
  creator: {
    id: string;
    name: string;
  };
  started: boolean;
  players: {
    [clientId: string]: {
      name: string;
      points: number;
      leader: boolean;
    }[];
  };
}

export default function Game() {
  const router = useRouter();
  const gameId = router?.query?.gameId;
  const gameCode = router?.query?.code;
  const [session, setSession] = useLocalStorage<string | undefined | null>(
    "token",
    null
  );
  const [localName, setLocalName] = useLocalStorage<string | undefined | null>(
    "name",
    null
  );

  const animationControl = useAnimation();
  const logoDisplay = useBreakpointValue({ sm: "none", md: "block" });

  const [websocket, setWebsocket] = useState<WebSocket | null>();
  const [question, setQuestion] = useState<string | null>(null);
  const [roundEnded, setRoundEnded] = useState({
    status: false,
    waiting: 0,
  });
  const [gameEnded, setGameEnded] = useState(false);
  const [client, setClient] = useState<{
    name: string;
    clientId: string;
    token: string;
  } | null>(null);

  const [game, setGame] = useState<Game | any>();
  const [started, setStarted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [roundResults, setRoundResults] = useState<{
    roundNumber: number;
    roundScores: { [playerId: string]: number };
  } | null>(null);

  const nameMaxLength = 20;

  // useEffect(() => {
  //   // if (!session) return;
  //   async () => {
  //     const data = await fetch(`http://localhost:9090/clients/${session}`).then(
  //       (res) => res.json()
  //     );

  //     console.log(data);

  //     if (data.status !== 200) {
  //       setSession("");
  //       return;
  //     }

  //     setClient({
  //       name: data.client.name,
  //       clientId: data.client.clientId,
  //       token: session,
  //     });
  //   };
  // }, [session]);

  function initializeWebSocket(name: string | undefined) {
    if (websocket) return;
    let token;

    const wss = new WebSocket(
      `ws://localhost:9090?name=${encodeURIComponent(name ?? randomName())}`
    );

    setWebsocket(wss);

    wss.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log(data);

      if (data.method === "connect") {
        token = data.token;
        setClient({
          token,
          clientId: data.clientId,
          name: data.name,
        });
        setSession(token);

        if (gameId === "create") {
          wss.send(
            JSON.stringify({
              method: "create",
              token,
            })
          );
        } else {
          wss.send(
            JSON.stringify({
              method: "join",
              token,
              gameId,
            })
          );
        }
      }

      if (data.method === "join") {
        if (data.error) return; /* error here */
        setGame(data.game);
        if (data.game?.started) setStarted(true);

        console.log(game);
      }

      if (data.method === "create") {
        if (!data.game || !data?.game?.id || data.error) return; /* error bud */
        router.push(`/game/${data.game.id}`);
        setGame(data.game);
      }

      if (data.method === "start") {
        if (!data.error) {
          setStarted(true);
        }
      }

      if (data.method === "question") {
        setTimeout(() => {
          animationControl.start({ y: 0, scale: 1 });
        }, 50);

        setRoundEnded({ status: false, waiting: 0 });
        setQuestion(data.question);
      }

      if (data.method === "question end") {
        if (data.error) return /* error */;
        setRoundEnded({
          status: true,
          waiting: data.timeUntilNextQuestion,
        });

        setGame(data.game);
        setRoundResults(data.game.currentRound);

        setQuestion(null);
      }

      if (data.method === "end") {
        setGameEnded(true);
        setGame(data.game);
      }
    };

    wss.onclose = () => {
      setHasError(true);
    };
    wss.onerror = () => {
      setHasError(true);
    };
  }

  function PlayerSidebar() {
    const [players, setPlayers] = useState(game?.players);

    useEffect(() => {
      websocket?.addEventListener("message", (message) => {
        try {
          const data = JSON.parse(message.data);

          if (data.method === "message") {
            if (data.error || !data.content || !data.author || !data.game)
              return;

            setPlayers(data.game.players);
          }
        } catch {
          console.log("Error parsing message");
        }
      });
    }, []);

    return (
      <VStack pt={60} pos="absolute" mt={-20}>
        {players?.map((player: any, index: number) => (
          <Player
            name={player.name}
            points={player.score || 0}
            leader={player.clientId === game?.creator.id}
            self={player.clientId === client?.clientId}
            key={player.clientId}
            rank={index + 1}
          />
        ))}
      </VStack>
    );
  }

  function GameStateScreen() {
    // if (skipNameScreen && pageLoaded) {
    //   initializeWebSocket(localName || randomName());
    // }
    if (gameEnded) return <GameResultsScreen />;
    if (roundEnded?.status === true && !question && started)
      return (
        <RoundResultsScreen
          game={game}
          roundEnded={roundEnded}
          roundResults={roundResults}
        />
      );
    if (client && game && started)
      return (
        <>
          {question ? (
            <QuestionFrame
              question={question}
              animationControl={animationControl}
            />
          ) : (
            <RoundResultsScreen
              game={game}
              roundEnded={roundEnded}
              roundResults={roundResults}
            />
          )}
          <GameStarted client={client} game={game} websocket={websocket} />
        </>
      );

    if (client && game && !started)
      return (
        <BeforeGame
          client={client}
          game={game}
          gameId={gameId}
          websocket={websocket}
        />
      );

    return (
      <NameScreen
        name={localName}
        callback={(name) => initializeWebSocket(name)}
      />
    );
  }

  return (
    <Container h="100vh" minW="full" p={25}>
      <Image
        src="/trivia.png"
        userSelect="none"
        w={237}
        zIndex={999}
        pos="absolute"
        draggable={false}
        display={logoDisplay}
      />
      <Shape1 />
      <Shape2 />
      <Shape3 />
      <Container h="full" minW="full">
        <PlayerSidebar />
        {!hasError ? (
          <GameStateScreen />
        ) : (
          <motion.div initial={{ y: -500 }} animate={{ y: "50%" }}>
            <Box display="flex" justifyContent="center" textAlign="center">
              <Sign />
              <Text
                fontSize={40}
                pt={2}
                fontWeight="bold"
                alignSelf="center"
                color="black"
                pos="absolute"
                maxWidth={600}
              >
                Something went wrong
                <Text fontSize={20} pt={2} fontWeight="bold">
                  Seems like you've got disconnected. Please refresh the page or
                  try again later
                </Text>
              </Text>
            </Box>
          </motion.div>
        )}
      </Container>
    </Container>
  );
}
