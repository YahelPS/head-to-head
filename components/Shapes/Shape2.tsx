import React from "react";

export default function Shape2() {
  return (
    <svg
      style={{ position: "absolute", bottom: 0, left: 0 }}
      width="117"
      height="234"
      viewBox="0 0 117 234"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="bg-gradient-2"
          x1="0%"
          y1="100%"
          x2="0%"
          y2="0%"
          gradientTransform="rotate(15)"
        >
          <stop offset="0%" stopColor="#EE68A7" />
          <stop offset="100%" stopColor="#EE3386" />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0.0433044C8.70796 23.666 12.4222 49.6566 16.1365 75.6472C22.7467 121.902 29.3569 168.156 64.1145 201.064C77.7507 213.974 95.7192 224.831 116.113 234H0V0.0433044Z"
        fill="url(#bg-gradient-2)"
      />
    </svg>
  );
}
