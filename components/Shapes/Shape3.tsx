import React from "react";

export default function Shape3() {
  return (
    <svg
      style={{ position: "absolute", top: 0, left: 0 }}
      width="322"
      height="79"
      viewBox="0 0 322 79"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="bg-gradient-3"
          x1="0%"
          y1="100%"
          x2="0%"
          y2="0%"
          gradientTransform="rotate(15)"
        >
          <stop offset="0%" stopColor="#6FEFC6" />
          <stop offset="100%" stopColor="#4DB9E2" />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M321.973 1.40739e-05C315.963 30.7635 302.925 58.1514 276.969 71.9515C247.728 87.498 216.876 72.4255 184.977 56.8415C162.685 45.951 139.882 34.8108 116.76 33.6952C96.535 32.7195 77.1392 39.9311 57.9503 47.0658C38.6355 54.2473 19.5302 61.3509 0 59.9486L2.62044e-06 0L321.973 1.40739e-05Z"
        fill="url(#bg-gradient-3)"
      />
    </svg>
  );
}
