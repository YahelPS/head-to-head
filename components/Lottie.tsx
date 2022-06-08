import React, {
  CSSProperties,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import lottie from "lottie-web";
import confetti from "../public/confetti.json";

interface Props {
  animation: Object;
  loop?: number | boolean | undefined;
  autoPlay?: boolean | undefined;
  style?: CSSProperties;
}

export default function Lottie({
  loop = false,
  autoPlay = false,
  animation,
  style = {},
}: Props) {
  const containerRef = useRef() as MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    if (containerRef.current?.childNodes?.length > 0) return;

    lottie.loadAnimation({
      name: "confetti",
      container: containerRef.current,
      renderer: "svg",
      loop,
      autoplay: autoPlay,
      animationData: animation,
      rendererSettings: {
        className: "input-fetti",
      },
    });
  }, []);

  return <div ref={containerRef} style={style} />;
}
