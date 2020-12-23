import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    common: {
      black: "#495057",
      white: "#eee",
    },
    background: {
      default: "linear-gradient(60deg, #764abc, #8a65c6)",
    },
  },
});

export default theme;
