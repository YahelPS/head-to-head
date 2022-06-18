import { Container, Box } from "@chakra-ui/react";
import { AnimatePresence, AnimationControls, motion } from "framer-motion";
import Question from "./Question";

export default function QuestionFrame({
  question,
  animationControl,
  onGuessingStart,
  onGuessingEnd,
}: {
  question: string;
  animationControl: AnimationControls;
  onGuessingStart?: () => any;
  onGuessingEnd?: () => any;
}) {
  return (
    <Container h="full" minW="full" display="flex" justifyContent="center">
      <AnimatePresence>
        {question && (
          <motion.div
            animate={animationControl}
            transition={{ delay: 0.2 }}
            exit={{ y: -500 }}
            initial={{ y: -500 }}
          >
            <Box pt={40}>
              <Question
                question={question}
                onTimerComplete={() => {
                  animationControl.start({ y: -220, scale: 0.8 });
                  if (onGuessingStart) {
                    onGuessingStart();
                  }
                }}
                onGuessingEnd={() => {
                  if (onGuessingEnd) onGuessingEnd();
                }}
              />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
}
