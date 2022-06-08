import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface Props {
  time: number;
  onComplete?: () => void;
}

export default function Timer({ time, onComplete }: Props) {
  const [timer, setTimer] = useState(time);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      if (timer - 1 === 0) {
        clearInterval(interval);
        setIsActive(false);
        if (onComplete) {
          onComplete();
        }
      } else {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <Box>
      <svg
        style={{
          position: "absolute",
        }}
        width="107"
        height="104"
        viewBox="0 0 107 104"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M57.7415 2.03003C77.9374 2.61649 95.093 15.941 101.633 35.3011C108.525 55.702 105.213 79.2378 88.2042 92.2069C70.3647 105.81 45.8061 104.855 27.6112 91.7435C8.81884 78.2019 -2.07335 54.6189 5.35354 32.5052C12.523 11.158 35.4861 1.38376 57.7415 2.03003Z"
          stroke="#A687D5"
          strokeWidth="4"
        />
      </svg>
      <svg
        style={{
          position: "absolute",
          marginLeft: 7,
          marginTop: 10,
        }}
        width="90"
        height="85"
        viewBox="0 0 90 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M48.1913 2.03457C64.2562 2.51519 78.7965 11.4024 84.3323 26.567C90.617 43.7833 89.636 64.5029 74.9855 75.434C59.9659 86.6406 39.5305 82.3351 24.3937 71.2889C9.24118 60.2311 -1.35232 41.9754 4.76046 24.1864C10.6195 7.13574 30.2508 1.49784 48.1913 2.03457Z"
          fill="white"
          stroke="#A687D5"
          strokeWidth="4"
        />
      </svg>
      <Text
        color="black"
        fontSize={40}
        fontWeight="bold"
        style={{
          position: "absolute",
          marginLeft: timer.toString().length === 1 ? 42 : 34,
          marginTop: 22,
        }}
      >
        {timer}
      </Text>
    </Box>
  );
}
