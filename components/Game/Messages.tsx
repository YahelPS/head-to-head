import { VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage";

export interface Message {
  author: string;
  message: string;
  correct: boolean;
}

export default function Messages({
  listeners,
  websocket,
}: {
  listeners: any;
  websocket: WebSocket | null | undefined;
}) {
  const [messages, setMessages] = useState<{ messages: Message[] }>({
    messages: [],
  });
  const messageArr: Message[] = [];

  useEffect(() => {
    if (listeners.messages) return;

    listeners.messages = true;
    websocket?.addEventListener("message", (message) => {
      try {
        const data = JSON.parse(message.data);

        if (data.method === "message") {
          if (data.error || !data.content || !data.author) return;

          messageArr.push({
            author: data.author.name,
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
      css={{
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
          user={message.author}
          message={message.message}
          correct={message.correct}
          key={index}
        />
      ))}
    </VStack>
  );
}
