import { useState, ComponentType, ChangeEvent } from "react";
import Link from "next/link";
import { useCallback } from "react";
import { useRouter } from "next/router";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import DashboardIcon from "@material-ui/icons/DeveloperBoardOutlined";
import TasksIcon from "@material-ui/icons/ListAltOutlined";
import NotesIcon from "@material-ui/icons/AssignmentOutlined";
import ContactsIcon from "@material-ui/icons/PermContactCalendarOutlined";
import ChatIcon from "@material-ui/icons/ForumOutlined";
import GiftShopIcon from "@material-ui/icons/RedeemOutlined";
import useStyles from "./styles";

type NavigationProps = {
  name: string;
  path: string;
  icon: ComponentType;
};

const navigation: Array<NavigationProps> = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: DashboardIcon,
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: TasksIcon,
  },
  {
    name: "Notes",
    path: "/notes",
    icon: NotesIcon,
  },
  {
    name: "Contacts",
    path: "/contacts",
    icon: ContactsIcon,
  },
  {
    name: "Chat",
    path: "/chat",
    icon: ChatIcon,
  },
  {
    name: "Gift Shop",
    path: "/shop",
    icon: GiftShopIcon,
  },
];

export const NavigationMenu = () => {
  const classes = useStyles();
  const router = useRouter();

  const handleTabChange = useCallback(
    (e: ChangeEvent, value: string) => {
      router.push(value);
    },
    [router]
  );
  return (
    <Hidden smDown>
      <AppBar
        component="div"
        className={classes.primaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs
          value={router.pathname}
          variant="fullWidth"
          textColor="inherit"
          onChange={handleTabChange}
        >
          {navigation.map(({ name, path, icon }) => (
            <Tab
              key={name}
              value={path}
              textColor="inherit"
              label={<TabHeading name={name} icon={icon} />}
            />
          ))}
        </Tabs>
      </AppBar>
    </Hidden>
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

export const HamburgerMenu = () => {
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
          {navigation.map(({ name, path, icon: Icon }) => (
            <Link href={path} key={name}>
              <ListItem button>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </Hidden>
  );
};
