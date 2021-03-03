import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      height: "100%",
      maxWidth: "720px",
      marginTop: "60px",
    },
  })
);

export default useStyles;
