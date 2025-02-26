import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Decorator } from "@storybook/react";

/**
 * **Light Theme Decorator**
 * - Wraps components with the MUI **Light Theme**
 */
export const withLightTheme: Decorator = (Story) => {
  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  );
};

/**
 * **Dark Theme Decorator**
 * - Wraps components with a **True Dark Theme**
 */
export const withDarkTheme: Decorator = (Story) => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#121212", // True dark background
        paper: "#1e1e1e", // Darker panel background
      },
      text: {
        primary: "#ffffff",
        secondary: "#bbbbbb",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  );
};
