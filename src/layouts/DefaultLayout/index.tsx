import { FC } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import Header from "./Header";
import useNavigationDirection from "./useNavigationDirection";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      overflowX: "hidden",
    },
  })
);

const DefaultLayout: FC = ({ children }) => {
  const classes = useStyles();
  const dir = useNavigationDirection();

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <motion.div
            initial={{ opacity: 0, x: `${dir * 25}%` }}
            animate={{ opacity: 1, x: "0", transition: { duration: 0.15 } }}
            exit={{
              opacity: 0,
              x: `${-dir * 25}%`,
              transition: { duration: 0.15 },
            }}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {children}
          </motion.div>
        </Box>
      </Container>
    </>
  );
};

export default DefaultLayout;
