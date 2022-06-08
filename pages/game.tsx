import { Box, Container } from "@chakra-ui/layout";
import { Badge, HStack, Image, Input, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io";
import io from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import ChatMessage from "../components/Game/ChatMessage";
import Question from "../components/Game/Question";
import Shape1 from "../components/Shapes/Shape1";
import Shape2 from "../components/Shapes/Shape2";
import Shape3 from "../components/Shapes/Shape3";

interface Message {
  user: string;
  message: string;
  correct: boolean;
}

export default function Game() {
  const [isTimerFinished, setIsTimerFinished] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/socket").finally(() => {
      //@ts-ignore
      setSocket(io());
      if (!socket) return;

      socket.on("connect", () => {
        console.log("connect");
        socket.emit("join", { roomId: "test", user: "Yahel" });
      });

      socket.on("join", (data) => {
        console.log("joined");

        socket.emit("user join", data.user);
      });

      socket.on("user join", (data) => {
        console.log(data);
      });

      socket.on("a user connected", (data) => {
        console.log("a user connected", data);
      });

      socket.on("disconnect", () => {
        console.log("disconnect");
      });
    });
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

      <Container h="full" minW="full" display="flex" justifyContent="center">
        <motion.div
          animate={isTimerFinished ? { y: -220, scale: 0.8 } : { y: 0 }}
          transition={isTimerFinished ? {} : { delay: 0.2 }}
          initial={{ y: -500 }}
        >
          <Box pt={40}>
            <Question
              question="Movie genres"
              onTimerComplete={() => setIsTimerFinished(true)}
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
              onChange={() => {
                setInput(inputRef.current!.value);
              }}
              onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                if (event.key === "Enter") {
                  if (!input) return;

                  setMessages([
                    ...messages,
                    {
                      user: "Joker",
                      message: input,
                      correct: true,
                    },
                  ]);
                  setInput("");
                  inputRef.current!.value = "";
                }
              }}
            />
          </HStack>
        </VStack>
      </Box>
    </Container>
  );
}
