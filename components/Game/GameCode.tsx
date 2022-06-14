import { VStack, IconButton, Text, HStack, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function GameCode({ code }: { code: string }) {
  const [hover, setHover] = useState(false);
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const EyeComponent = visible ? AiFillEye : AiFillEyeInvisible;
  return (
    <VStack
      pos="absolute"
      bottom={10}
      bg="white"
      px={10}
      py={2}
      borderRadius="2xl"
      spacing={2}
      cursor="pointer"
      userSelect="none"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        navigator.clipboard.writeText(code).then(() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        });
      }}
      transition="all 0.1s"
      _hover={{
        transform: "scale(1.1)",
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      _active={{
        transform: "scale(0.95)",
      }}
    >
      <Text color="black" fontWeight="bold">
        {copied ? "Copied!" : hover ? "Click to Copy" : "Invite Friends"}
      </Text>
      <HStack>
        <Text
          color="black"
          fontSize="2xl"
          fontWeight="bold"
          letterSpacing={visible ? 0 : 5}
        >
          {visible ? code : code.replace(/./g, "•")}
        </Text>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setVisible(!visible);
          }}
          onMouseDown={(e) => e.stopPropagation()}
          zIndex={9999}
          p={0}
        >
          <EyeComponent fill="black" size="22" />
        </Button>
      </HStack>
    </VStack>
  );
}
