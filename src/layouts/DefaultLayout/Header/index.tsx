import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { NavigationMenu, HamburgerMenu } from "./Menu";
import ThemeModeSwitcher from "./ThemeModeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import Account from "./Account";
import useStyles from "./styles";

export default function Header() {
  const classes = useStyles();
  return (
    <>
      <AppBar
        component="div"
        className={classes.primaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar variant="dense">
          <Grid container alignItems="center" spacing={1}>
            <HamburgerMenu />
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                React Modern State
              </Typography>
            </Grid>
            <LanguageSwitcher />
            <ThemeModeSwitcher />
            <Divider orientation="vertical" light flexItem />
            <Account />
          </Grid>
        </Toolbar>
      </AppBar>
      <NavigationMenu />
    </>
  );
}
