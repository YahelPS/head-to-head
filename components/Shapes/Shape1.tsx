import React from "react";

export default function Shape1() {
  return (
    <svg
      style={{ position: "absolute", top: 0, right: 0 }}
      width="129"
      height="221"
      viewBox="0 0 129 221"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="bg-gradient-1"
          x1="0%"
          y1="100%"
          x2="0%"
          y2="0%"
          gradientTransform="rotate(15)"
        >
          <stop offset="0%" stopColor="#EE1675" />
          <stop offset="100%" stopColor="#F567A6" />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M129 220.812C115.004 218.371 98.0257 218.374 81.0954 218.376C49.826 218.381 18.7186 218.385 6.85602 202.997C-7.0683 184.935 6.26447 146.627 19.7565 107.86C25.0405 92.678 30.3488 77.4256 34.054 63.2916C40.4556 38.8715 42.4106 18.2301 41.2504 0H129V220.812Z"
        fill="url(#bg-gradient-1)"
      />
    </svg>
  );
}
