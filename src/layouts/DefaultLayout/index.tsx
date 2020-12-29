import { FC, useCallback } from "react";
import Container from "@material-ui/core/Container";
import { motion, AnimatePresence } from "framer-motion";
import Box from "@material-ui/core/Box";
import Header from "./Header";

const DefaultLayout: FC = ({ children }) => {
  return (
    <>
      <Header />
      <Container>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt="40px"
        >
          <AnimatePresence exitBeforeEnter>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </Box>
      </Container>
    </>
  );
};

export default DefaultLayout;
