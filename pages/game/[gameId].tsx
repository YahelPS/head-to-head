import { Box, Container, Heading } from "@chakra-ui/layout";
import {
  Avatar,
  Badge,
  Button,
  HStack,
  Image,
  Input,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

import ChatMessage from "../../components/Game/ChatMessage";
import GameCode from "../../components/Game/GameCode";
import Player from "../../components/Game/Player";
import Question from "../../components/Game/Question";
import SideSummary from "../../components/Game/SideSummary";
import Sign from "../../components/Game/Sign";
import SignBig from "../../components/Game/SignBig";
import Shape1 from "../../components/Shapes/Shape1";
import Shape2 from "../../components/Shapes/Shape2";
import Shape3 from "../../components/Shapes/Shape3";

interface Message {
  user: string;
  message: string;
  correct: boolean;
}

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
  const waitingGifs = [
    "https://media.giphy.com/media/RKS1pHGiUUZ2g/giphy.gif",
    "https://media0.giphy.com/media/QPQ3xlJhqR1BXl89RG/giphy.gif",
    "https://media2.giphy.com/media/brHaCdJqCXijm/giphy.gif",
    "https://media2.giphy.com/media/5kACKIXSplZxC/giphy.gif",
    "https://media2.giphy.com/media/3kACvwjyzgOdqE3GWT/giphy.gif",
    "https://media4.giphy.com/media/kpzfYwBT7nUVW/giphy.gif",
    "https://media2.giphy.com/media/a6HJquvTVsBws/giphy.gif",
    "https://media3.giphy.com/media/pFZTlrO0MV6LoWSDXd/giphy.gif",
  ];
  const router = useRouter();
  const gameId = router?.query?.gameId;
  const animationControl = useAnimation();
  const logoDisplay = useBreakpointValue({ sm: "none", md: "block" });

  const [websocket, setWebsocket] = useState<WebSocket | null>();
  const [question, setQuestion] = useState<string | null>(null);
  const [roundEnded, setRoundEnded] = useState({
    status: false,
    waiting: 0,
  });
  const bottomRef = useRef<HTMLDivElement>(null);
  const [client, setClient] = useState<{
    name: string;
    clientId: string;
    token: string;
  } | null>(null);

  const [game, setGame] = useState<Game | any>();
  const [started, setStarted] = useState(false);
  const [roundResults, setRoundResults] = useState<{
    roundNumber: number;
    roundScores: { [playerId: string]: number };
  } | null>(null);

  const messageArr: Message[] = [];
  const inputRef = useRef<HTMLInputElement>(null);
  const nameMaxLength = 20;
  const listeners = {
    questions: false,
    messages: false,
  };

  function Messages() {
    const [messages, setMessages] = useState<{ messages: Message[] }>({
      messages: [],
    });

    useEffect(() => {
      if (listeners.messages) return;

      listeners.messages = true;
      websocket?.addEventListener("message", (message) => {
        try {
          const data = JSON.parse(message.data);

          if (data.method === "message") {
            if (data.error || !data.content || !data.author) return;

            messageArr.push({
              user: data.author.name,
              message: data.content,
              correct: data.correct,
            });

            setMessages({ messages: messageArr });
          }
        } catch {
          console.log("Error parsing message");
        }
      });
    }, []);

    return (
      <VStack
        alignItems="flex-end"
        flexDir="column-reverse"
        maxH="2xl"
        overflowY="scroll"
        pr={2}
        ref={bottomRef}
        css={{
          // WebkitMask:
          //   "linear-gradient(180deg, rgba(0,0,0,0) 50px, rgba(0,0,0,1) 100px)",

          "&::-webkit-scrollbar": {
            width: 4,
          },
          "&::-webkit-scrollbar-track": {
            width: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#99aab5",
            borderRadius: 24,
          },
        }}
      >
        {[...messages.messages].reverse().map((message, index) => (
          <ChatMessage
            message={message.message}
            correct={message.correct}
            key={index}
          />
        ))}
      </VStack>
    );
  }

  function QuestionFrame() {
    return (
      <Container h="full" minW="full" display="flex" justifyContent="center">
        <AnimatePresence>
          {question && (
            <motion.div
              animate={animationControl}
              transition={{ delay: 0.2 }}
              exit={{ y: -500 }}
              initial={{ y: -500 }}
            >
              <Box pt={40}>
                <Question
                  question={question}
                  onTimerComplete={() => {
                    animationControl.start({ y: -220, scale: 0.8 });
                  }}
                  onGuessingEnd={() => console.log("good job")}
                />
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    );
  }

  function GameStarted() {
    useEffect(() => {
      console.log("rerender");
    }, []);

    return (
      <Box
        position="absolute"
        right={0}
        bottom={0}
        display="flex"
        flexDir="row"
        alignItems="center"
      >
        <VStack p={10} alignItems="flex-end">
          <Messages />
          <HStack pt={10}>
            <Image
              src="/joker.png"
              draggable={false}
              userSelect="none"
              h={12}
              borderRadius={30}
              cursor="pointer"
              _hover={{
                transform: "scale(1.1)",
              }}
            />

            <Badge>9</Badge>
            <Input
              variant="game"
              m={10}
              zIndex={9999}
              ref={inputRef}
              autoFocus
              onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                if (event.key === "Enter") {
                  if (!inputRef.current!.value) return;

                  websocket?.send(
                    JSON.stringify({
                      method: "message",
                      token: client?.token,
                      content: inputRef.current!.value,
                      gameId: game.id,
                    })
                  );
                  inputRef.current!.value = "";
                }
              }}
            />
          </HStack>
        </VStack>
      </Box>
    );
  }

  function BeforeGame() {
    return (
      <Container
        h="full"
        minW="full"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <VStack>
          <Heading fontSize="3xl">
            Waiting for {game?.creator.name || "the creator"} to start the
            game...
          </Heading>
          <Image
            src={waitingGifs[Math.floor(Math.random() * waitingGifs.length)]}
            h={250}
          />
          <Button
            variant="primary"
            disabled={client?.clientId !== game.creator.id}
            onClick={() => {
              websocket?.send(
                JSON.stringify({
                  method: "start",
                  gameId,
                  token: client?.token,
                })
              );
            }}
          >
            Start Game
          </Button>
          <GameCode code="ABCDEFG" />
        </VStack>
      </Container>
    );
  }

  function NameScreen() {
    const nameRef = useRef<HTMLInputElement>(null);

    return (
      <Container
        h="full"
        minW="full"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <SignBig />
        <Box pos="absolute" textAlign="center">
          <Text color="black" fontWeight="bold" fontSize={40}>
            How should people call you?
          </Text>
          <Input
            color="primary.2"
            mt={5}
            borderColor="transparent !important"
            borderBottomColor="primary.2 !important"
            borderWidth={3}
            ref={nameRef}
            borderRadius={0}
            textAlign="center"
            fontSize={28}
            maxLength={nameMaxLength}
            w="md"
          />
          <Button
            variant="primary"
            mb={2}
            ml={5}
            onClick={() => {
              if (websocket) return;
              let token;
              const wss = new WebSocket(
                `ws://localhost:9090?name=${encodeURIComponent(
                  nameRef.current?.value ?? ""
                )}`
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
                  if (!data.game || !data?.game?.id || data.error)
                    return; /* error bud */
                  router.push(`/game/${data.game.id}`);
                  setGame(data.game);
                }

                if (data.method === "start") {
                  if (!data.error) {
                    setStarted(true);
                  }
                }

                // if (data.method === "message") {
                //   if (data.error || !data.content || !data.author) return;

                //   messageArr.push({
                //     user: data.author.name,
                //     message: data.content,
                //     correct: data.correct,
                //   });

                //   setMessages({ messages: messageArr });
                // }

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

                  setRoundResults(data.game.currentRound);
                  console.log(data.game.currentRound);

                  setTimeout(() => {
                    console.log(roundResults);
                  }, 1000);

                  setQuestion(null);
                }
              };
            }}
          >
            Play
          </Button>
        </Box>
      </Container>
    );
  }

  function RoundResultsScreen() {
    const [timer, setTimer] = useState(roundEnded.waiting / 1000);
    useEffect(() => {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }, [timer, roundEnded.waiting]);

    const leaderboard = game.players
      .map((player: { name: string; clientId: string }) => ({
        name: player.name,
        clientId: player.clientId,
        score: roundResults?.roundScores[player.clientId] || 0,
      }))
      .sort((a: any, z: any) => parseFloat(z.score) - parseFloat(a.score));

    const firstPart = [...leaderboard]
      .filter((player) => player.clientId !== leaderboard[0].clientId)
      .slice(0, Math.ceil(leaderboard.length / 2));

    const secondPart = [...leaderboard]
      .filter((player) => player.clientId !== leaderboard[0].clientId)
      .slice(Math.ceil(leaderboard.length / 2));

    // console.log({ leaderboard, players: game.players });

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
            <motion.div
              initial={{ y: 600, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
              }}
            >
              <VStack>
                <Heading>{leaderboard[0]?.name}</Heading>
                <Avatar h={44} w={44} />
                <Heading fontSize="3xl" pt={5} color="teal.400">
                  {leaderboard[0]?.score} correct guesses
                </Heading>
                <Heading fontSize="2xl" pt={2} color="teal.400">
                  +{leaderboard[0]?.score * 25} points
                </Heading>
              </VStack>
            </motion.div>
            <SideSummary direction="right" players={secondPart} />
          </HStack>
        </AnimatePresence>
      </Container>
    );
  }

  function GameStateScreen() {
    if (roundEnded?.status === true && !question && started)
      return <RoundResultsScreen />;
    if (client && game && started)
      return (
        <>
          {question ? <QuestionFrame /> : <RoundResultsScreen />}
          <GameStarted />
        </>
      );

    if (client && game && !started) return <BeforeGame />;

    return <NameScreen />;
  }

  return (
    <Container h="100vh" minW="full" p={25} overflow="hidden">
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
        <VStack pt={60} pos="absolute" mt={-20}>
          {game?.players?.map((player: any, index: number) => (
            <Player
              name={player.name}
              points={0}
              leader={player.clientId === game?.creator.id}
              self={player.clientId === client?.clientId}
              key={player.clientId}
              rank={index + 1}
            />
          ))}
        </VStack>
        <GameStateScreen />
      </Container>
    </Container>
  );
}
