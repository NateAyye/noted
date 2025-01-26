import { db } from '@/db';
import { env } from '@/env';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import bcrypt from 'bcrypt';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  adapter: DrizzleAdapter(db),
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/signIn',
    signOut: '/signOut',
  },
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        if (!credentials) {
          return null;
        }

        const user = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.email, credentials.email),
        });

        if (!user || !user.password) {
          return null;
        }

        const hashedPassword = await bcrypt.hash(credentials.password, 15);
        console.log(user);
        console.log(hashedPassword);
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        console.log(isValidPassword);

        if (user && isValidPassword) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
