import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function room() {
  const router = useRouter();
  const gameId = router?.query?.gameId;

  return <div>game {gameId}</div>;
}
