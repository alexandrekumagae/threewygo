import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  fonts: {
    body: "Roboto, sans-serif",
    heading: "Roboto, sans-serif",
  },
  colors: {
    threewygoPurple: "#9349de",
    threewygoPurpleDark: "#703daf",
  },
  components: {
    Button: {
      variants: {
        threewygo: {
          bg: "threewygoPurple",
          color: "white",
          _hover: { bg: "threewygoPurpleDark", color: "white" },
        },
      },
    },
  },
});

export default customTheme;