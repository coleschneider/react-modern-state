import Providers from "next-auth/providers";
import jwt from "jsonwebtoken";
import { connectionOptions } from "server/database";
import { ISession, IUser, IToken } from "types/auth";

const jwtSecret = JSON.parse(process.env.AUTH_PRIVATE_KEY);

export const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  database: connectionOptions,

  session: {
    jwt: true,
  },
  jwt: {
    encode: async ({ token, secret }: { token: IToken; secret: string }) => {
      const tokenContents = {
        id: token.id,
        name: token.name,
        email: token.email,
        picture: token.picture,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["admin", "user"],
          "x-hasura-default-role": "user",
          "x-hasura-role": "user",
          "x-hasura-user-id": token.id,
        },
        iat: Date.now() / 1000,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        sub: token.id,
      };

      const encodedToken = jwt.sign(tokenContents, jwtSecret.key, {
        algorithm: jwtSecret.type,
      });

      return encodedToken;
    },
    decode: async ({ token, secret }: { token: string; secret: string }) => {
      const decodedToken = jwt.verify(token, jwtSecret.key, {
        algorithms: jwtSecret.type,
      });

      return decodedToken;
    },
  },
  debug: process.env.NODE_ENV !== "production",
  callbacks: {
    session: async (session: ISession, user: IUser) => {
      const encodedToken = jwt.sign(user, jwtSecret.key, {
        algorithm: jwtSecret.type,
      });

      session.id = user.id;
      session.token = encodedToken;

      return Promise.resolve(session);
    },
    jwt: async (token: IToken, user: IUser, account, profile, isNewUser) => {
      const isSignIn = user ? true : false;

      if (isSignIn) {
        token.id = user.id;
      }

      return Promise.resolve(token);
    },
  },
};
