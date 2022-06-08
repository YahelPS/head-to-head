import { Box, Container, Text } from "@chakra-ui/react";
import React, { useState } from "react";
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
  return (
    <Box display="flex" justifyContent="center">
      <svg
        width="856"
        height="199"
        viewBox="0 0 856 199"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M53.5122 1.59539L848.832 32.1376C853.826 32.3294 857.016 37.5415 854.915 42.0757L789.837 182.507C788.71 184.94 786.291 186.515 783.611 186.562L91.6541 198.897C88.2934 198.957 85.3645 196.619 84.6772 193.329L46.3914 10.0214C45.4608 5.56553 48.9636 1.42071 53.5122 1.59539Z"
          fill="url(#paint0_linear_31_44)"
        />
        <path
          d="M802.821 0.343802L7.50114 30.886C2.50744 31.0778 -0.682615 36.2899 1.41859 40.8241L66.4964 181.255C67.6238 183.688 70.0419 185.263 72.7228 185.311L764.679 197.645C768.04 197.705 770.969 195.368 771.656 192.077L809.942 8.76979C810.872 4.31395 807.37 0.169123 802.821 0.343802Z"
          fill="#F6F6F6"
        />
        <defs>
          <linearGradient
            id="paint0_linear_31_44"
            x1="795.17"
            y1="197.641"
            x2="114.999"
            y2="197.641"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#CC71FC" />
            <stop offset="1" stopColor="#8242ED" />
          </linearGradient>
        </defs>
      </svg>
      <Box pos="absolute" ml={-20} mt={40}>
        {questionCountdown && (
          <Timer
            time={questionCountdown ? 5 : 30}
            onComplete={() => {
              setQuestionCountdown(false);
              onTimerComplete();
            }}
          />
        )}
        {!questionCountdown && <Timer time={30} onComplete={onGuessingEnd} />}
      </Box>

      <Text
        fontSize={40}
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
