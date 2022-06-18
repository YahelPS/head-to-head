import { Box, VStack, HStack, Badge, Input, Image } from "@chakra-ui/react";
import { KeyboardEvent, useEffect, useRef } from "react";
import Messages from "../components/Game/Messages";

export default function GameStarted({
  client,
  game,
  websocket,
}: {
  client: any;
  game: any;
  websocket: WebSocket | null | undefined;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const listeners = {
    messages: false,
  };

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
        <Messages listeners={listeners} websocket={websocket} />
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
