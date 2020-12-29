import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import { useThemeSwitcher } from "theme";
import DarkModeIcon from "@material-ui/icons/Brightness4Outlined";
import LightModeIcon from "@material-ui/icons/Brightness7Outlined";

export default function ThemeModeSwitcher() {
  const [theme, setTheme] = useThemeSwitcher();

  if (theme === "light")
    return (
      <Grid item>
        <IconButton
          aria-label="Toggle dark theme"
          title="Toggle dark theme"
          color="inherit"
          onClick={() => setTheme("dark")}
        >
          <LightModeIcon />
        </IconButton>
      </Grid>
    );

  return (
    <Grid item>
      <IconButton
        aria-label="Toggle light theme"
        title="Toggle light theme"
        color="inherit"
        onClick={() => setTheme("light")}
      >
        <DarkModeIcon />
      </IconButton>
    </Grid>
  );
}
