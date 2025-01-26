import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import { authOptions } from './optioins';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, authOptions);
}

export { handler as GET, handler as POST };
