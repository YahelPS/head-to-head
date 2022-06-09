import { Container, Heading } from "@chakra-ui/layout";
import { Button, Input, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [gameId, setGameId] = useState<string | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:9090");
    setWebsocket(ws);
    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log(data);

      if (data.method === "connect") {
        setClientId(data.clientId);
        console.log("[CONNECT] CLIENT " + data.clientId);
      }

      if (data.method === "create") {
        setGameId(data.game.id);
        console.log("[CREATE] GAME " + data.game.id);
      }

      if (data.method === "join") {
        setGameId(data.game.id);
        console.log("[JOIN] GAME " + data.clientId);
      }
    };
  }, []);
  return (
    <Container>
      {websocket && clientId ? (
        <>
          <Heading size="2xl">Head to Head</Heading>
          <Button
            onClick={() => {
              websocket.send(
                JSON.stringify({
                  method: "create",
                  clientId,
                })
              );
            }}
          >
            Create Game
          </Button>
          <Button
            onClick={() => {
              const gid = prompt("game id");
              websocket.send(
                JSON.stringify({
                  method: "join",
                  clientId,
                  gameId: gid,
                })
              );
            }}
          >
            Join Game
          </Button>
          <Link
            href={{
              slashes: true,
              pathname: "/game/s",
              query: {
                gameId,
                clientId,
              },
              auth: clientId,
            }}
          >
            asd
          </Link>
          <Text>clientId: {clientId}</Text>
          <Text>gameId: {gameId}</Text>
        </>
      ) : (
        <Text>Loading</Text>
      )}
    </Container>
  );
};

export default Home;
