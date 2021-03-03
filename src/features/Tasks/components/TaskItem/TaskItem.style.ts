import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import blue from "@material-ui/core/colors/blue";
import purple from "@material-ui/core/colors/purple";
import pink from "@material-ui/core/colors/pink";
import indigo from "@material-ui/core/colors/indigo";
import cyan from "@material-ui/core/colors/cyan";
import teal from "@material-ui/core/colors/teal";
import lime from "@material-ui/core/colors/lime";
import amber from "@material-ui/core/colors/amber";
import orange from "@material-ui/core/colors/orange";
import brown from "@material-ui/core/colors/brown";
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      boxSizing: "border-box",
      height: "100px",
    },
    tag: {
      marginRight: "4px",
      height: "14px",
    },
    content: {
      display: "flex",
      flexDirection: "row",
      padding: "8px",
    },
    Red: {
      backgroundColor: red[600],
      borderColor: red[800],
    },
    Green: {
      backgroundColor: green[600],
      borderColor: green[800],
    },
    Blue: {
      backgroundColor: blue[600],
      borderColor: blue[800],
    },
    Purple: {
      backgroundColor: purple[600],
      borderColor: purple[800],
    },
    Pink: {
      backgroundColor: pink[600],
      borderColor: pink[800],
    },
    Indigo: {
      backgroundColor: indigo[600],
      borderColor: indigo[800],
    },
    Cyan: {
      backgroundColor: cyan[600],
      borderColor: cyan[800],
    },
    Teal: {
      backgroundColor: teal[600],
      borderColor: teal[800],
    },
    Lime: {
      backgroundColor: lime[600],
      borderColor: lime[800],
    },
    Amber: {
      backgroundColor: amber[600],
      borderColor: amber[800],
    },
    Orange: {
      backgroundColor: orange[600],
      borderColor: orange[800],
    },
    Brown: {
      backgroundColor: brown[600],
      borderColor: brown[800],
    },
    Grey: {
      backgroundColor: grey[600],
      borderColor: grey[800],
    },
  })
);

export default useStyles;
