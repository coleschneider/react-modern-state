import { FC } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import GithubCorner from "react-github-corner";
import { repository } from "../../package.json";

type DefaultLayoutProps = {
  primaryColor: string;
  secondaryColor: string;
  name: string;
};

const repositoryUrl = repository.url.replace(/\.git$/, "/") + "src/features/";

const DefaultLayout: FC<DefaultLayoutProps> = ({
  primaryColor,
  secondaryColor,
  name,
  children,
}) => (
  <>
    <GithubCorner href={repositoryUrl + name} />
    <ThemeProvider
      theme={(outerTheme) => ({
        palette: {
          primary: { main: primaryColor },
          secondary: { main: secondaryColor },
        },
        ...outerTheme,
      })}
    >
      {children}
    </ThemeProvider>
  </>
);

export default DefaultLayout;
