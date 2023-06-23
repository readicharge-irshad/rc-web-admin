import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  grey: {
    100: mode === "dark" ? "#a1a4ab" : "#e0e0e0",
    200: mode === "dark" ? "#727681" : "#c2c2c2",
    300: mode === "dark" ? "#1F2A40" : "#a3a3a3",
    400: mode === "dark" ? "#141b2d" : "#858585",
    500: mode === "dark" ? "#101624" : "#666666",
    600: mode === "dark" ? "#0c101b" : "#525252",
    700: mode === "dark" ? "#080b12" : "#3d3d3d",
    800: mode === "dark" ? "#040509" : "#292929",
    900: mode === "dark" ? "#fbfbfc" : "#141414",
  },
  primary: {
    100: "#171f58",
    200: "#171f58",
    300: "#171f58",
    400: "#171f58",
    500: "#171f58",
    600: "#171f58",
    700: "#171f58",
    800: "#171f58",
    900: "#171f58",
  },
  greenAccent: {
    100: mode === "dark" ? "#141414" : "#040509",
    200: mode === "dark" ? "#292929" : "#080b12",
    300: mode === "dark" ? "#3d3d3d" : "#0c101b",
    400: mode === "dark" ? "#525252" : "#f2f0f0",
    500: mode === "dark" ? "#666666" : "#141b2d",
    600: mode === "dark" ? "#858585" : "#1F2A40",
    700: mode === "dark" ? "#a3a3a3" : "#727681",
    800: mode === "dark" ? "#c2c2c2" : "#a1a4ab",
    900: mode === "dark" ? "#e0e0e0" : "#d0d1d5",
  },
  redAccent: {
    100: mode === "dark" ? "#f8dcdb" : "#2c100f",
    200: mode === "dark" ? "#f1b9b7" : "#58201e",
    300: mode === "dark" ? "#e99592" : "#832f2c",
    400: mode === "dark" ? "#e2726e" : "#af3f3b",
    500: mode === "dark" ? "#db4f4a" : "#db4f4a",
    600: mode === "dark" ? "#af3f3b" : "#e2726e",
    700: mode === "dark" ? "#832f2c" : "#e99592",
    800: mode === "dark" ? "#58201e" : "#f1b9b7",
    900: mode === "dark" ? "#2c100f" : "#f8dcdb",
  },
  blueAccent: {
    100: mode === "dark" ? "#e1e2fe" : "#151632",
    200: mode === "dark" ? "#c3c6fd" : "#2a2d64",
    300: mode === "dark" ? "#a4a9fc" : "#3e4396",
    400: mode === "dark" ? "#868dfb" : "#535ac8",
    500: mode === "dark" ? "#6870fa" : "#6870fa",
    600: mode === "dark" ? "#535ac8" : "#868dfb",
    700: mode === "dark" ? "#3e4396" : "#a4a9fc",
    800: mode === "dark" ? "#2a2d64" : "#c3c6fd",
    900: mode === "dark" ? "#151632" : "#e1e2fe",
  },
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      primary: {
        main: colors.primary[500],
      },
      secondary: {
        main: colors.blueAccent[500],
      },
      neutral: {
        dark: colors.grey[700],
        main: colors.grey[500],
        light: colors.grey[100],
      },
      background: {
        default: mode === "dark" ? colors.grey[900] : "#fcfcfc",
      },
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
