import { useState, ComponentType, MouseEvent } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { signIn, signOut, useSession } from "next-auth/client";
import { useThemeSwitcher } from "theme";

import MenuIcon from "@material-ui/icons/Menu";
import ArrowDownIcon from "@material-ui/icons/ExpandMoreOutlined";
import DarkModeIcon from "@material-ui/icons/Brightness4Outlined";
import LightModeIcon from "@material-ui/icons/Brightness7Outlined";
import DashboardIcon from "@material-ui/icons/DeveloperBoardOutlined";
import LanguageIcon from "@material-ui/icons/LanguageRounded";
import TasksIcon from "@material-ui/icons/ListAltOutlined";
import NotesIcon from "@material-ui/icons/AssignmentOutlined";
import ContactsIcon from "@material-ui/icons/PermContactCalendarOutlined";
import ChatIcon from "@material-ui/icons/ForumOutlined";
import GiftShopIcon from "@material-ui/icons/RedeemOutlined";
import NotificationsIcon from "@material-ui/icons/Notifications";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    primaryBar: {
      zIndex: 0,
    },
    menuButton: {
      marginLeft: -theme.spacing(1),
    },
    iconButtonAvatar: {
      padding: 4,
    },
  })
);

const navigation: Array<{ name: string; icon: ComponentType }> = [
  {
    name: "Dashboard",
    icon: DashboardIcon,
  },
  {
    name: "Tasks",
    icon: TasksIcon,
  },
  {
    name: "Notes",
    icon: NotesIcon,
  },
  {
    name: "Contacts",
    icon: ContactsIcon,
  },
  {
    name: "Chat",
    icon: ChatIcon,
  },
  {
    name: "Gift Shop",
    icon: GiftShopIcon,
  },
];

const IndexPageComponent = () => {
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
            <Grid item>
              <LanguageSwitcher />
            </Grid>
            <Grid item>
              <ThemeModeSwitcher />
            </Grid>
            <Divider orientation="vertical" light flexItem />
            <Authentication />
          </Grid>
        </Toolbar>
      </AppBar>
      <Hidden smDown>
        <AppBar
          component="div"
          className={classes.primaryBar}
          color="primary"
          position="static"
          elevation={0}
        >
          <Tabs value={0} variant="fullWidth" textColor="inherit">
            {navigation.map(({ name, icon }) => (
              <Tab
                key={name}
                textColor="inherit"
                label={<TabHeading name={name} icon={icon} />}
              />
            ))}
          </Tabs>
        </AppBar>
      </Hidden>
      <Container>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt="40px"
        >
          children
        </Box>
      </Container>
    </>
  );
};

type TabHeadingType = {
  icon: ComponentType;
  name: string;
};

const TabHeading = ({ icon: Icon, name }: TabHeadingType) => (
  <Grid container justify="center" spacing={1}>
    <Grid item>
      <Icon />
    </Grid>
    <Grid item>
      <Typography variant="button">{name}</Typography>
    </Grid>
  </Grid>
);

const HamburgerMenu = () => {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
  return (
    <Hidden mdUp>
      <Grid item>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          className={classes.menuButton}
          onClick={() => setOpen((open) => !open)}
        >
          <MenuIcon />
        </IconButton>
      </Grid>
      <Drawer anchor="left" open={isOpen} onClose={() => setOpen(false)}>
        <List>
          {navigation.map(({ name, icon: Icon }) => (
            <ListItem button key={name}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Hidden>
  );
};

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState("English");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectLanguage = (language) => {
    setAnchorEl(null);
    setLanguage(language);
  };
  return (
    <>
      <Button
        aria-controls="menu-language"
        variant="text"
        color="inherit"
        onClick={handleMenu}
        startIcon={<LanguageIcon />}
        endIcon={<ArrowDownIcon />}
      >
        <Hidden smDown>{language}</Hidden>
      </Button>

      <Menu
        id="menu-language"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => selectLanguage("English")}>English</MenuItem>
        <MenuItem onClick={() => selectLanguage("Български")}>
          Български
        </MenuItem>
      </Menu>
    </>
  );
};

const ThemeModeSwitcher = () => {
  const [theme, setTheme] = useThemeSwitcher();

  if (theme === "light")
    return (
      <IconButton
        aria-label="Toggle dark theme"
        title="Toggle dark theme"
        color="inherit"
        onClick={() => setTheme("dark")}
      >
        <LightModeIcon />
      </IconButton>
    );

  return (
    <IconButton
      aria-label="Toggle light theme"
      title="Toggle light theme"
      color="inherit"
      onClick={() => setTheme("light")}
    >
      <DarkModeIcon />
    </IconButton>
  );
};

const Authentication = () => {
  const [session] = useSession();
  return session ? <AccountMenu /> : <LoginButton />;
};

const LoginButton = () => (
  <Grid item>
    <Button
      color="inherit"
      onClick={(e) => {
        e.preventDefault();
        signIn("github");
      }}
    >
      Login
    </Button>
  </Grid>
);

const AccountMenu = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    signOut();
  };

  return (
    <>
      <Grid item>
        <Tooltip title="Alerts • No alerts">
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-user"
          aria-haspopup="true"
          color="inherit"
          onClick={handleMenu}
          className={classes.iconButtonAvatar}
        >
          <Avatar
            src="https://material-ui.com/static/images/avatar/1.jpg"
            alt="My Avatar"
          />
        </IconButton>
        <Menu
          id="menu-user"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Log out</MenuItem>
        </Menu>
      </Grid>
    </>
  );
};

export default IndexPageComponent;
