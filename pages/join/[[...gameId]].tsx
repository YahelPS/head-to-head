import {
  Box,
  Button,
  Container,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useLocalStorage } from "usehooks-ts";
import Shape1 from "../../components/Shapes/Shape1";
import Shape2 from "../../components/Shapes/Shape2";
import Shape3 from "../../components/Shapes/Shape3";
import { randomName } from "../../utils/strings";

export default function join() {
  const router = useRouter();
  const gameId = router.query?.[0];
  const gameCodeRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useLocalStorage<string | undefined>("name", "");

  useEffect(() => {
    if (!name) {
      setName(randomName());
    }
  }, []);

  const findGame = (code: string) => {
    return new Promise(async (resolve, reject) => {
      const data = await fetch(`http://localhost:9090/code/${code}`)
        .then((res) => res.json())
        .catch(reject);
      if (data.status !== 200) return reject(data.message);
      resolve(data.gameId);
      router.push(`/game/${data.gameId}`);
    });
  };

  return (
    <Container h="100vh" minW="full" p={25} overflow="hidden">
      <Toaster />
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
      <Container
        h="full"
        minW="full"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Text pb={2} pl={2} fontSize={18}>
            Name
          </Text>
          <Input
            fontSize={18}
            borderRadius="full"
            width={80}
            value={name}
            py={7}
            fontWeight="bold"
            ref={nameRef}
            maxLength={20}
            onInput={() => {
              setName(nameRef.current?.value);
            }}
          />
          <Text pl={2}>
            <Link
              mb={16}
              color="blue.300"
              onClick={() => setName(randomName())}
              userSelect="none"
            >
              Generate name
            </Link>
          </Text>
        </Box>
        <Button
          bg="#c76cf9"
          borderRadius="full"
          fontSize="xl"
          w={80}
          py={7}
          my={5}
          onClick={() => {
            router.push("/game/create");
          }}
        >
          Create Game
        </Button>

        <Box>
          <InputGroup>
            <Input
              fontSize={18}
              maxLength={6}
              borderRadius="full"
              width={80}
              placeholder="Game Code"
              py={7}
              fontWeight="bold"
              textTransform="uppercase"
              ref={gameCodeRef}
            />
            <InputRightElement display="flex" justifyContent="center">
              <Button
                bg="#c76cf9"
                borderRadius="full"
                fontSize="sm"
                onClick={async () => {
                  if (!gameCodeRef.current?.value)
                    return toast.error("The game code you entered is invalid");

                  toast.promise(
                    findGame(gameCodeRef.current.value.toUpperCase()),
                    {
                      loading: "Loading...",
                      success: "Joining game...",
                      error: "Couldn't find a game with that code",
                    }
                  );
                }}
                px={14}
                mt={2}
                mr={20}
              >
                Join Game
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Container>
    </Container>
  );
}
