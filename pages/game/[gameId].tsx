import { Container, Box, Image, VStack } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import Sign from "../../components/Game/Sign";
import Shape1 from "../../components/Shapes/Shape1";
import Shape2 from "../../components/Shapes/Shape2";
import Shape3 from "../../components/Shapes/Shape3";
import AppContext from "../../contexts/AppContext";
import NameScreen from "../../screens/NameScreen";
import { randomName } from "../../utils/strings";
import WebSocketClient from "../../WebSocketClient";
import BeforeGame from "../../screens/BeforeGame";
import PlayerSidebar from "../../components/Game/PlayerSidebar";
import Player from "../../components/Game/Player";
import GameStarted from "../../screens/GameStarted";
import QuestionFrame from "../../components/Game/QuestionFrame";
import RoundResultsScreen from "../../screens/RoundResultsScreen";
import GameResultsScreen from "../../screens/GameResultsScreen";

interface Client {
  token: string;
  clientId: string;
  name: string;
}

export default function Game() {
  const router = useRouter();
  const animationControl = useAnimation();
  const [question, setQuestion] = useState<string | null>(null);
  const [roundEnded, setRoundEnded] = useState<boolean | number>(false);
  const [gameState, setGameState] = useState<{ name: string; data: any }>({
    name: "main",
    data: null,
  });
  const [localName, setLocalName] = useLocalStorage<string | undefined | null>(
    "name",
    null
  );
  const [game, setGame] = useState<any>();
  const context = useContext(AppContext);
  console.log(context);

  const [websocket, setWebsocket] = useState<WebSocketClient | null>(null);
  const [client, setClient] = useState<Client | undefined>();

  useEffect(() => {
    console.log("rerender");
  });

  function PlayerSidebar() {
    const [players, setPlayers] = useState(gameState.data?.players);

    useEffect(() => {
      websocket?.on("message", (data) => {
        if (data.error || !data.content || !data.author || !data.game) return;
        setPlayers(data.game.players);
      });
    }, []);

    return (
      <VStack pt={60} pos="absolute" mt={-20}>
        {players?.map((player: any, index: number) => (
          <Player
            name={player.name}
            points={player.score || 0}
            leader={player.clientId === gameState.data.creator.id}
            self={player.clientId === client?.clientId}
            key={player.clientId}
            rank={index + 1}
          />
        ))}
      </VStack>
    );
  }

  const connectWebsocket = (name: string | undefined) => {
    const ws = new WebSocket(
      `ws://localhost:9090?name=${encodeURIComponent(name ?? randomName())}`
    );

    const wss = new WebSocketClient(ws);
    setWebsocket(wss);

    wss.on("connect", (data) => {
      console.log(data);

      setClient({
        token: data.token,
        clientId: data.clientId,
        name: data.name,
      });

      if (router.query?.gameId === "create") {
        wss.send("create", { token: data.token });
      } else {
        wss.send("join", {
          token: data.token,
          gameId: router.query?.gameId,
        });
      }

      wss.on("create", (data) => {
        router.push(`/game/${data.game.id}`);
        setGameState({ name: "lobby", data: data.game });
      });

      wss.on("join", (data) => {
        router.push(`/game/${data.game.id}`);
        setGameState({ name: "lobby", data: data.game });
      });

      wss.on("start", (data) => {
        setGameState({ name: "started", data: data.game });
      });

      wss.on("question", (data) => {
        setRoundEnded(false);
        setQuestion(data.question);
        setTimeout(() => {
          animationControl.start({ y: 0, scale: 1 });
        }, 50);
      });

      wss.on("question end", (data) => {
        setQuestion(null);
        setRoundEnded(data.timeUntilNextQuestion);
        setGameState({ name: "started", data: data.game });
      });

      wss.on("end", (data) => {
        setGameState({ name: "ended", data: data.game });
      });
    });
  };

  return (
    <Container h="100vh" minW="full" p={25}>
      <Image
        src="/trivia.png"
        userSelect="none"
        w={237}
        zIndex={999}
        pos="absolute"
        draggable={false}
        display={{ base: "none", md: "block" }}
        alt="icon"
      />
      <Shape1 />
      <Shape2 />
      <Shape3 />
      <Container h="full" minW="full">
        {websocket && <PlayerSidebar />}
        {question && (
          <QuestionFrame
            question={question}
            animationControl={animationControl}
          />
        )}
        {roundEnded && gameState.name !== "ended" && (
          <RoundResultsScreen
            game={gameState.data}
            timeLeft={roundEnded as number}
            roundResults={gameState.data.currentRound}
          />
        )}
        {gameState.name === "main" && (
          <NameScreen name={localName} callback={connectWebsocket} />
        )}
        {gameState.name === "lobby" && (
          <BeforeGame
            client={client}
            game={gameState.data}
            gameId={router.query?.gameId}
            websocket={websocket}
          />
        )}
        {gameState.name === "started" && (
          <GameStarted
            client={client}
            game={gameState.data}
            websocket={websocket}
          />
        )}
        {gameState.name === "ended" && <GameResultsScreen />}
      </Container>
    </Container>
  );
}
