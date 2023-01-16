import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../components/theme";
import "../styles/globals.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import { createContext } from "vm";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
