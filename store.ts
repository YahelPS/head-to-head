import { configureStore } from "@reduxjs/toolkit";

const increment = () => {
  return {
    type: "INCREMENT",
  };
};

export const store = configureStore({
  reducer: {
    counter: (state = 0, action) => {
      switch (action.type) {
        case "INCREMENT":
          return state + 1;
        default:
          return state;
      }
    },
  },
});
