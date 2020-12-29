import { createContext, useContext, useState, FC } from "react";
import { PaletteType } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export const lightTheme = createMuiTheme({
  palette: {
    common: {
      black: "#495057",
      white: "#eee",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "#e5e5e5",
          minHeight: "100vh",
        },
      },
    },
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "#292929",
          minHeight: "100vh",
        },
      },
    },
  },
});

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

const getTheme = (theme: PaletteType) => themes[theme];

const ThemeModeContext = createContext<
  [PaletteType, (type: PaletteType) => void]
>(["light", (_) => null]);

export const ThemeProvider: FC = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeVariant, setThemeVariant] = useState<PaletteType>(() =>
    prefersDarkMode ? "dark" : "light"
  );

  return (
    <ThemeModeContext.Provider value={[themeVariant, setThemeVariant]}>
      <MuiThemeProvider theme={getTheme(themeVariant)}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export const useThemeSwitcher = () => useContext(ThemeModeContext);
