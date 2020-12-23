import { ElementType } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import GithubCorner from "react-github-corner";
import Link from "next/link";
import { repository } from "../../package.json";

import ApolloLogo from "features/apollo/logo.svg";
import MobXLogo from "features/mobx/logo.svg";
import ReactLogo from "features/react/logo.svg";
import ReactQueryLogo from "features/react-query/logo.svg";
import RecoilLogo from "features/recoil/logo.svg";
import ReduxLogo from "features/redux/logo.svg";
import RelayLogo from "features/relay/logo.svg";
import RxJsLogo from "features/rxjs/logo.svg";
import SwrLogo from "features/swr/logo.svg";
import UrqlLogo from "features/urql/logo.svg";

const useStyles = makeStyles({
  label: { color: "#fff" },
  container: {
    backgroundColor: "#282c34",
    minWidth: "100vw",
    minHeight: "100vh",
  },
  item: {
    transition: "transform 0.25s",

    "&:hover": {
      transform: "scale(1.2)",
    },
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
});

export default function Home() {
  const classes = useStyles();
  return (
    <>
      <Box
        display="flex"
        className={classes.container}
        alignItems="center"
        justifyContent="space-around"
        flexDirection="row"
        flexWrap="wrap"
      >
        <Library
          name="Apollo"
          logo={ApolloLogo}
          path="/apollo/tasks"
          color="#586a7f"
        />
        <Library
          name="MobX"
          logo={MobXLogo}
          path="/mobx/tasks"
          color="#de5c16"
        />
        <Library
          name="Context + Hooks"
          logo={ReactLogo}
          path="/react/tasks"
          color="#00d8ff"
        />
        <Library
          name="React Query"
          logo={ReactQueryLogo}
          path="/react-query/tasks"
        />
        <Library
          name="Recoil"
          logo={RecoilLogo}
          path="/recoil/tasks"
          color="#3578e5"
        />
        <Library
          name="Redux"
          logo={ReduxLogo}
          path="/redux/tasks"
          color="#764abc"
        />
        <Library
          name="Relay"
          logo={RelayLogo}
          path="/relay/tasks"
          color="#f26b00"
        />
        <Library name="RxJs" logo={RxJsLogo} path="/rxjs/tasks" />
        <Library name="SWR" logo={SwrLogo} path="/swr/tasks" color="#fff" />
        <Library
          name="URQL"
          logo={UrqlLogo}
          path="/urql/tasks"
          color="#6d7599"
        />
      </Box>
      <GithubCorner href={repository.url} />
    </>
  );
}

type LibraryType = {
  name: string;
  path: string;
  logo: ElementType;
  color?: string;
};

const Library = ({ path, name, logo: Logo, color }: LibraryType) => {
  const classes = useStyles();
  return (
    <Box
      key={path}
      width="140px"
      height="140px"
      color={color}
      textAlign="center"
      marginX="60px"
      className={classes.item}
    >
      <Link href={path} passHref>
        <a className={classes.link}>
          <Logo width="128px" height="128px" />
          <Typography className={classes.label} variant="h6">
            {name}
          </Typography>
        </a>
      </Link>
    </Box>
  );
};
