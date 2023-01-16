import { Container, VStack, Heading, Button, Image } from "@chakra-ui/react";
import GameCode from "../components/Game/GameCode";
import WebSocketClient from "../WebSocketClient";

export default function BeforeGame({
  game,
  gameId,
  client,
  websocket,
}: {
  game: any;
  gameId: string | string[] | undefined;
  client: any;
  websocket: WebSocketClient | null;
}) {
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
          Waiting for {game?.creator.name || "the creator"} to start the game...
        </Heading>
        <Image
          alt="waiting gif"
          src={waitingGifs[Math.floor(Math.random() * waitingGifs.length)]}
          h={250}
        />
        <Button
          variant="primary"
          disabled={client?.clientId !== game.creator.id}
          onClick={() => {
            websocket?.send("start", {
              gameId,
              token: client?.token,
            });
          }}
        >
          Start Game
        </Button>
        <GameCode code={game.code} />
      </VStack>
    </Container>
  );
}
