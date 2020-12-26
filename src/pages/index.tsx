import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";

const IndexPageComponent = () => {
  const [session] = useSession();

  const signInButtonNode = () => {
    if (session) {
      return false;
    }

    return (
      <Box>
        <Link href="/api/auth/signin">
          <Button
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Create an account
          </Button>
        </Link>
      </Box>
    );
  };

  const signOutButtonNode = () => {
    if (!session) {
      return false;
    }

    return (
      <Box>
        <Link href="/api/auth/signout">
          <Button
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign Out
          </Button>
        </Link>
      </Box>
    );
  };

  return (
    <>
      {signInButtonNode()}
      {signOutButtonNode()}
    </>
  );
};

export default IndexPageComponent;
