import { FC } from "react";
import { ThemeProvider } from "theme";

const AppWrapper: FC = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default AppWrapper;
