import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import WebSocketClient from "../../WebSocketClient";
import Player from "./Player";

export default function PlayerSidebar({
  game,
  websocket,
  creatorId,
  clientId,
}: {
  game: any;
  websocket: WebSocketClient;
  creatorId: string;
  clientId: string;
}) {
  const [players, setPlayers] = useState(game?.players);

  useEffect(() => {
    websocket?.on("message", (data) => {
      if (data.error || !data.content || !data.author || !data.game) return;
      setPlayers(data.game.players);
    });
  }, [websocket]);

  return (
    <VStack pt={60} pos="absolute" mt={-20}>
      {players?.map((player: any, index: number) => (
        <Player
          name={player.name}
          points={player.score || 0}
          leader={player.clientId === creatorId}
          self={player.clientId === clientId}
          key={player.clientId}
          rank={index + 1}
        />
      ))}
    </VStack>
  );
}
