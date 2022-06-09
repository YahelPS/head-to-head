import { Box, Container, Heading } from "@chakra-ui/layout";
import {
  Badge,
  Button,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  Avatar,
} from "@chakra-ui/react";
import { m, motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";

import ChatMessage from "../../components/Game/ChatMessage";
import Player from "../../components/Game/Player";
import Question from "../../components/Game/Question";
import SignBig from "../../components/Game/SignBig";
import Shape1 from "../../components/Shapes/Shape1";
import Shape2 from "../../components/Shapes/Shape2";
import Shape3 from "../../components/Shapes/Shape3";
import { randomName } from "../../utils/strings";

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

  const [websocket, setWebsocket] = useState<WebSocket | null>();
  const [isTimerFinished, setIsTimerFinished] = useState(false);
  const [client, setClient] = useState<{
    name: string;
    clientId: string;
    token: string;
  } | null>(null);

  const [game, setGame] = useState<Game | any>();
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      user: "asd",
      message: "fyc",
      correct: true,
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const nameMaxLength = 20;

  function GameStarted() {
    useEffect(() => {
      console.log("rerender");
    }, []);

    return (
      <>
        <Container h="full" minW="full" display="flex" justifyContent="center">
          <motion.div
            animate={animationControl}
            transition={isTimerFinished ? {} : { delay: 0.2 }}
            initial={{ y: -500 }}
          >
            <Box pt={40}>
              <Question
                question="Movie genres"
                onTimerComplete={() => {
                  setIsTimerFinished(true);
                  animationControl.start({ y: -220, scale: 0.8 });
                }}
                onGuessingEnd={() => console.log("good job")}
              />
            </Box>
          </motion.div>
        </Container>
        <Box
          position="absolute"
          right={0}
          bottom={0}
          display="flex"
          flexDir="row"
          alignItems="center"
        >
          <VStack p={10} alignItems="flex-end">
            {messages.map((message) => (
              <ChatMessage message={message.message} />
            ))}
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
      </>
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
        </VStack>
      </Container>
    );
  }

  // function GameScreen({ gameStarted }: { gameStarted: boolean }) {
  //   return gameStarted ? ;
  // }

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

                if (data.method === "message") {
                  if (data.error || !data.content || !data.author) return;
                  const newMessages = messages.concat({
                    user: data.author.name,
                    message: data.content,
                    correct: true,
                  });

                  setMessages(newMessages);
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
  useEffect(() => {
    animationControl.start({ y: 0 });
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
      <Container h="full" minW="full">
        <VStack pt={60} pos="absolute" mt={-20}>
          {game?.players?.map((player: any) => (
            <Player
              name={player.name}
              points={0}
              leader={player.clientId === game?.creator.id}
              self={player.clientId === client?.clientId}
            />
          ))}
        </VStack>
        {client && game ? (
          started ? (
            <GameStarted />
          ) : (
            <BeforeGame />
          )
        ) : (
          <NameScreen />
        )}
      </Container>
    </Container>
  );
}
