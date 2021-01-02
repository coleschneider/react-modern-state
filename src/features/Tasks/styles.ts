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
    header: {
      transform: "translateY(-20px)",
      padding: "15px",
    },
    body: {
      width: "100%",
      height: "100%",
      maxWidth: "720px",
      marginTop: "60px",
    },
    tableContainer: {
      height: "90vh",
      overflow: "auto",
      width: "100%",
      "&::-webkit-scrollbar": {
        width: "6px",
      },

      "&::-webkit-scrollbar-track": {
        background: "#ddd",
        borderRadius: "2px",
      },

      "&::-webkit-scrollbar-thumb": {
        background: "#999",
        borderRadius: "2px",
      },

      "&:hover::-webkit-scrollbar-thumb": {
        background: "#666",
        borderRadius: "2px",
      },
    },
    tableRow: {
      borderBottomWidth: "1px",
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.divider,
    },
    red: {
      backgroundColor: red[600],
      borderBottomColor: red[800],
    },
    green: {
      backgroundColor: green[600],
      borderBottomColor: green[800],
    },
    blue: {
      backgroundColor: blue[600],
      borderBottomColor: blue[800],
    },
    purple: {
      backgroundColor: purple[600],
      borderBottomColor: purple[800],
    },
    pink: {
      backgroundColor: pink[600],
      borderBottomColor: pink[800],
    },
    indigo: {
      backgroundColor: indigo[600],
      borderBottomColor: indigo[800],
    },
    cyan: {
      backgroundColor: cyan[600],
      borderBottomColor: cyan[800],
    },
    teal: {
      backgroundColor: teal[600],
      borderBottomColor: teal[800],
    },
    lime: {
      backgroundColor: lime[600],
      borderBottomColor: lime[800],
    },
    amber: {
      backgroundColor: amber[600],
      borderBottomColor: amber[800],
    },
    orange: {
      backgroundColor: orange[600],
      borderBottomColor: orange[800],
    },
    brown: {
      backgroundColor: brown[600],
      borderBottomColor: brown[800],
    },
    grey: {
      backgroundColor: grey[600],
      borderBottomColor: grey[800],
    },
  })
);

export default useStyles;
