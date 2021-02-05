import NextAuth from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { options } from "server/auth";

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default Auth;
