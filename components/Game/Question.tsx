import { Box, Container, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Sign from "./Sign";
import Timer from "./Timer";

export default function Question({
  question,
  onTimerComplete,
  onGuessingEnd,
}: {
  question: string;
  onTimerComplete: () => void;
  onGuessingEnd: () => void;
}) {
  const [questionCountdown, setQuestionCountdown] = useState(true);
  const questionTime = 30;
  return (
    <Box display="flex" justifyContent="center">
      <Sign />
      <Box pos="absolute" ml={-20} mt={40}>
        {questionCountdown && (
          <Timer
            time={questionCountdown ? 5 : questionTime}
            onComplete={() => {
              setQuestionCountdown(false);
              onTimerComplete();
            }}
          />
        )}
        {!questionCountdown && (
          <Timer time={questionTime} onComplete={onGuessingEnd} />
        )}
      </Box>

      <Text
        fontSize={question.length < 60 ? 40 : 36}
        pt={2}
        fontWeight="bold"
        alignSelf="center"
        color="black"
        pos="absolute"
        maxWidth={600}
      >
        {question}
      </Text>
    </Box>
  );
}
