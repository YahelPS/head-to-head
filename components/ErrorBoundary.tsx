import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { Component, ErrorInfo, ReactNode } from "react";
import Sign from "./Game/Sign";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <motion.div initial={{ y: -500 }} animate={{ y: "50%" }}>
          <Box display="flex" justifyContent="center" textAlign="center">
            <Sign />
            <Text
              fontSize={40}
              pt={2}
              fontWeight="bold"
              alignSelf="center"
              color="black"
              pos="absolute"
              maxWidth={600}
            >
              Something went wrong
              <Text fontSize={20} pt={2} fontWeight="bold">
                There seems to be an error with the game. Please try again.
              </Text>
            </Text>
          </Box>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
