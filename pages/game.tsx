// import { Box, Container, Heading } from "@chakra-ui/layout";
// import {
//   Badge,
//   HStack,
//   Image,
//   Input,
//   VStack,
//   Text,
//   Button,
// } from "@chakra-ui/react";
// import { motion } from "framer-motion";
// import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
// import { Socket } from "socket.io";
// import io from "socket.io-client";
// import { DefaultEventsMap } from "socket.io/dist/typed-events";
// import ChatMessage from "../components/Game/ChatMessage";
// import Question from "../components/Game/Question";
// import Sign from "../components/Game/Sign";
// import SignBig from "../components/Game/SignBig";
// import Shape1 from "../components/Shapes/Shape1";
// import Shape2 from "../components/Shapes/Shape2";
// import Shape3 from "../components/Shapes/Shape3";

// interface Message {
//   user: string;
//   message: string;
//   correct: boolean;
// }

// export default function Game() {
//   const [websocket, setWebsocket] = useState<WebSocket | null>();
//   let isWebsocketInitialized = false;
//   const [isTimerFinished, setIsTimerFinished] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);
//   const nameRef = useRef<HTMLInputElement>(null);
//   const nameMaxLength = 20;

//   function GameScreen() {
//     return (
//       <>
//         <Container h="full" minW="full" display="flex" justifyContent="center">
//           <motion.div
//             animate={isTimerFinished ? { y: -220, scale: 0.8 } : { y: 0 }}
//             transition={isTimerFinished ? {} : { delay: 0.2 }}
//             initial={{ y: -500 }}
//           >
//             <Box pt={40}>
//               <Question
//                 question="Movie genres"
//                 onTimerComplete={() => setIsTimerFinished(true)}
//                 onGuessingEnd={() => console.log("good job")}
//               />
//             </Box>
//           </motion.div>
//         </Container>
//         <Box
//           position="absolute"
//           right={0}
//           bottom={0}
//           display="flex"
//           flexDir="row"
//           alignItems="center"
//         >
//           <VStack p={10} alignItems="flex-end">
//             {messages.map((message) => (
//               <ChatMessage message={message.message} />
//             ))}
//             <HStack pt={10}>
//               <Image
//                 src="/joker.png"
//                 draggable={false}
//                 userSelect="none"
//                 h={12}
//                 borderRadius={30}
//                 cursor="pointer"
//                 _hover={{
//                   transform: "scale(1.1)",
//                 }}
//               />

//               <Badge>9</Badge>
//               <Input
//                 variant="game"
//                 m={10}
//                 zIndex={9999}
//                 ref={inputRef}
//                 onChange={() => {
//                   setInput(inputRef.current!.value);
//                 }}
//                 onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
//                   if (event.key === "Enter") {
//                     if (!input) return;

//                     setMessages([
//                       ...messages,
//                       {
//                         user: "Joker",
//                         message: input,
//                         correct: true,
//                       },
//                     ]);
//                     setInput("");
//                     inputRef.current!.value = "";
//                   }
//                 }}
//               />
//             </HStack>
//           </VStack>
//         </Box>
//       </>
//     );
//   }

//   function NameScreen() {
//     return (
//       <Container
//         h="full"
//         minW="full"
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//       >
//         <SignBig />
//         <Box pos="absolute" textAlign="center">
//           <Text color="black" fontWeight="bold" fontSize={40}>
//             How should people call you?
//           </Text>
//           <Input
//             color="primary.2"
//             mt={5}
//             borderColor="transparent !important"
//             borderBottomColor="primary.2 !important"
//             borderWidth={3}
//             ref={nameRef}
//             borderRadius={0}
//             textAlign="center"
//             fontSize={28}
//             maxLength={nameMaxLength}
//             w="md"
//           />
//           <Button
//             variant="primary"
//             mb={2}
//             ml={5}
//             onClick={() => {
//               if (isWebsocketInitialized) return;
//               const ws = new WebSocket(
//                 `ws://localhost:9090?name=${encodeURIComponent(
//                   nameRef.current?.value ?? ""
//                 )}`
//               );

//               setWebsocket(ws);

//               ws.onmessage = (message) => {
//                 const data = JSON.parse(message.data);
//                 if (data.method === "connect") {
//                   isWebsocketInitialized = true;
//                   console.log(data);
//                 }
//               };
//             }}
//           >
//             Play
//           </Button>
//         </Box>
//       </Container>
//     );
//   }

//   return (
//     <Container h="100vh" minW="full" p={25} overflow="hidden">
//       <Image
//         src="/trivia.png"
//         userSelect="none"
//         w={237}
//         zIndex={999}
//         pos="absolute"
//         draggable={false}
//       />

//       <Shape1 />
//       <Shape2 />
//       <Shape3 />

//       <Container h="full" minW="full">
//         {websocket ? <GameScreen /> : <NameScreen />}
//       </Container>
//     </Container>
//   );
// }

export default function UNUSED_game() {
  return null;
}
