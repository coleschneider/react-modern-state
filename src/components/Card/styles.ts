import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: "20px",
    },
    header: {
      marginTop: "-20px",
      transform: "translateY(-20px)",
      padding: "15px",
    },
  })
);

export default useStyles;
