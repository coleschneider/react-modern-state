import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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
    default: {
      backgroundColor: theme.palette.background.default,
    },
    Red: {
      backgroundColor: theme.palette.error[theme.palette.type],
      borderColor:
        theme.palette.error[theme.palette.type === "light" ? "dark" : "light"],
    },
    Green: {
      backgroundColor: theme.palette.success[theme.palette.type],
      borderColor:
        theme.palette.success[
          theme.palette.type === "light" ? "dark" : "light"
        ],
    },
    Blue: {
      backgroundColor: theme.palette.info[theme.palette.type],
      borderColor:
        theme.palette.info[theme.palette.type === "light" ? "dark" : "light"],
    },
    Orange: {
      backgroundColor: theme.palette.warning[theme.palette.type],
      borderColor:
        theme.palette.warning[
          theme.palette.type === "light" ? "dark" : "light"
        ],
    },
  })
);

export default useStyles;
