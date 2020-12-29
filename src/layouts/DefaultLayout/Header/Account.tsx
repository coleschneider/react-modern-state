import { useState, MouseEvent } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { signIn, signOut, useSession } from "next-auth/client";
import NotificationsIcon from "@material-ui/icons/Notifications";
import useStyles from "./styles";

export default function Account() {
  const [session] = useSession();
  return session ? <AccountMenu /> : <LoginButton />;
}

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
