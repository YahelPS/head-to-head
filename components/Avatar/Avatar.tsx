import React from "react";

export default function Avatar() {
  return (
    <div
      style={{
        height: 24,
        width: 24,
        maskSize: "100%",
        maskType: "alpha",
        WebkitMask:
          "url(https://discord.com/assets/495e7ca1850af3ddc8bc130617549480.svg)",
      }}
    >
      <svg width={30} height={24}>
        <foreignObject width={24} height={24}>
          <img
            src="https://cdn.discordapp.com/avatars/678556376640913408/cd18845522ce69ade6b462b5e653dc57.png"
            style={{
              borderRadius: "50%",
              borderColor: "red",
              borderWidth: 5,
            }}
          />
        </foreignObject>
      </svg>
    </div>
  );
}
