import { useState, MouseEvent } from "react";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ArrowDownIcon from "@material-ui/icons/ExpandMoreOutlined";
import LanguageIcon from "@material-ui/icons/LanguageRounded";

export default function LanguageSwitcher() {
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
    <Grid item>
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
    </Grid>
  );
}
