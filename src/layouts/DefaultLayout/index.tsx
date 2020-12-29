import { FC, useCallback } from "react";
import Container from "@material-ui/core/Container";
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
          {children}
        </Box>
      </Container>
    </>
  );
};

export default DefaultLayout;
