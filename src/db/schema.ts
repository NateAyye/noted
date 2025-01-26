import { env } from '@/env';
import { boolean, integer, json, pgTable, primaryKey, text, timestamp } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/postgres-js';
import type { AdapterAccount } from 'next-auth/adapters';
import postgres from 'postgres';

const connectionString = env.DATABASE_URL;
const pool = postgres(connectionString, { max: 1 });

export const db = drizzle(pool);


export const note = pgTable('note', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  content: text('content'),
  createdAt: timestamp('createdAt', { mode: 'date' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp('updatedAt', { mode: 'date' })
    .notNull()
    .$defaultFn(() => new Date()),
  deletedAt: timestamp('deletedAt', { mode: 'date' }),
  deleted: boolean('deleted')
    .notNull()
    .$default(() => false),
  tags: json('tags').$type<string[]>(),
  color: text('color'),
  pinned: boolean('pinned')
    .notNull()
    .$default(() => false),
  archived: boolean('archived')
    .notNull()
    .$default(() => false),
  trashed: boolean('trashed')
    .notNull()
    .$default(() => false),
});

export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  username: text('username'),
  password: text('password'),
  email: text('email').unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
});

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ],
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ],
);

export const authenticators = pgTable(
  'authenticator',
  {
    credentialID: text('credentialID').notNull().unique(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    providerAccountId: text('providerAccountId').notNull(),
    credentialPublicKey: text('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credentialDeviceType').notNull(),
    credentialBackedUp: boolean('credentialBackedUp').notNull(),
    transports: text('transports'),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ],
);

export type User = typeof users.$inferSelect

export type Note = typeof note.$inferSelect

export type Account = typeof accounts.$inferSelect

export type Session = typeof sessions.$inferSelect

export type VerificationToken = typeof verificationTokens.$inferSelect

export type Authenticator = typeof authenticators.$inferSelect
