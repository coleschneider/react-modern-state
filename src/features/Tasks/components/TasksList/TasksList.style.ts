import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listContainer: {
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
  })
);

export default useStyles;
