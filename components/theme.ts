import { extendTheme, theme as base } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  fonts: {
    heading: `DM Sans, ${base.fonts.heading}`,
    body: `DM Sans, ${base.fonts.body}`,
  },
  baseStyle: {
    field: {
      width: 650,
      height: 45,
      borderRadius: 20,
    },
  },
  styles: {
    global: {
      body: {
        bg: "neutral.800",
        bgRepeat: "no-repeat",
        bgAttachment: "fixed",
        bgImage: "linear-gradient(#5927E5, #48038E)",
      },
    },
  },
  variants: {
    field: {
      borderColor: "#4A3AFF",
    },
  },
  components: {
    Button: {
      variants: {
        primary: () => ({
          bgGradient: "linear(to-r, primary.1, primary.2)",
          borderRadius: "full",
          px: 10,
          py: 6,
          fontWeight: "bold",
        }),
        secondary: () => ({
          bgColor: "neutral.100",
          color: "primary.1",
          borderRadius: "full",
          px: 10,
          py: 6,
          fontWeight: "bold",
        }),
        outline: () => ({
          color: "neutral.100",
          borderRadius: "full",
          borderColor: "primary.1",
          px: 10,
          py: 6,
          fontWeight: "bold",
        }),
      },
    },
    Input: {
      baseStyle: {
        field: {
          width: 700,
          bg: "rgba(255, 255, 255, 0.5)",
          borderColor: "neutral.100",
          borderWidth: 2,
        },
      },
      sizes: {
        md: {
          field: {
            height: 12,
            borderRadius: 20,
          },
        },
      },
    },
  },
  colors: {
    primary: {
      1: "#4A3AFF",
      2: "#702DFF",
      3: "#9C1FFF",
      4: "#C11FFF",
      5: "#E11FFF",
      6: "#FF1FCC",
      7: "#415ce5",
    },
    secondary: {
      1: "#d9dbe9",
      2: "#ecebff",
      3: "#531dc5",
      4: "#efe8ff",
    },
    neutral: {
      100: "#ffffff",
      200: "#f7f7fb",
      300: "#eff0f6",
      400: "#d9dbe9",
      500: "#a0a3bd",
      600: "#6f6c90",
      700: "#514f6e",
      800: "#170f49",
    },
  },
});

export default theme;
