'use server';

import bcrypt from 'bcrypt';
import { signIn } from 'next-auth/react';
import { db } from './db';
import { users } from './db/schema';

const PasswordHash = 15;

type NewUser = typeof users.$inferSelect;

export const getProviders = async () => {
  return await fetch('/api/auth/providers');
};

export const signUpUser: ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => Promise<NewUser | unknown> = async ({ email, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, PasswordHash);
    const newUser = await db.insert(users).values({ email, password: hashedPassword }).returning();
    console.log(newUser);

    return newUser;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw error;
    } // This is a fallback for unknown errors
  }
};

export const signInUser: ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => Promise<NewUser | unknown> = async ({ email, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 15);
    try {
      const data = await signIn('credentials', {
        callbackUrl: '/',
        email: email,
        password: hashedPassword,
      });

      console.log(data);
      if (data?.error) {
        throw data.error;
      }
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        throw error.message;
      } else {
        throw error;
      } // This is a fallback for unknown errors
    }
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      throw error.message;
    } else {
      throw error;
    } // This is a fallback for unknown errors
  }
};
