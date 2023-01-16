import { createContext } from "react";

const AppContext = createContext<{
  websocket: WebSocket | null;
  client: any;
}>({
  websocket: null,
  client: null,
});

export const AppContextProvider = AppContext.Provider;
export default AppContext;
