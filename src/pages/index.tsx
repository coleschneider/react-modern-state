import { ElementType } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import GithubCorner from "react-github-corner";
import Link from "next/link";
import { motion } from "framer-motion";
import { repository } from "../../package.json";

import ApolloLogo from "packages/apollo/logo.svg";
import MobXLogo from "packages/mobx/logo.svg";
import ReactLogo from "packages/react/logo.svg";
import ReactQueryLogo from "packages/react-query/logo.svg";
import RecoilLogo from "packages/recoil/logo.svg";
import ReduxLogo from "packages/redux/logo.svg";
import RelayLogo from "packages/relay/logo.svg";
import RxJsLogo from "packages/rxjs/logo.svg";
import SwrLogo from "packages/swr/logo.svg";
import UrqlLogo from "packages/urql/logo.svg";

const useStyles = makeStyles({
  label: { color: "#fff" },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap",
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
      <motion.div className={classes.container} exit={{ opacity: 0 }}>
        <Library
          name="Apollo"
          logo={ApolloLogo}
          path="/dashboard"
          color="#586a7f"
        />
        <Library
          name="MobX"
          logo={MobXLogo}
          path="/dashboard"
          color="#de5c16"
        />
        <Library
          name="Context + Hooks"
          logo={ReactLogo}
          path="/dashboard"
          color="#00d8ff"
        />
        <Library
          name="React Query"
          logo={ReactQueryLogo}
          path="-dashboard/tasks"
        />
        <Library
          name="Recoil"
          logo={RecoilLogo}
          path="/dashboard"
          color="#3578e5"
        />
        <Library
          name="Redux"
          logo={ReduxLogo}
          path="/dashboard"
          color="#764abc"
        />
        <Library
          name="Relay"
          logo={RelayLogo}
          path="/dashboard"
          color="#f26b00"
        />
        <Library name="RxJs" logo={RxJsLogo} path="/dashboard" />
        <Library name="SWR" logo={SwrLogo} path="/dashboard" color="#fff" />
        <Library
          name="URQL"
          logo={UrqlLogo}
          path="/dashboard"
          color="#6d7599"
        />
      </motion.div>
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
      height="200px"
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
