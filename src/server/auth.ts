import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import SpotifyProvider from "next-auth/providers/spotify";

import { env } from "@/env";
import { db } from "@/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/server/db/schema";

console.log("Auth options are being configured");

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            "user-read-email playlist-read-private user-read-recently-played",
        },
      },
    }),
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter,
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("Sign In Callback", { user, account, profile });
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect Callback", { url, baseUrl });
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async session({ session, user, token }) {
      console.log("Session Callback", { session, user, token });
      return session;
    },
    async jwt({ token, user, account, profile }) {
      console.log("JWT Callback", { token, user, account, profile });
      return token;
    },
  },
  events: {
    async signIn(message) {
      console.log("Sign In Event", message);
    },
    async signOut(message) {
      console.log("Sign Out Event", message);
    },
    async createUser(message) {
      console.log("Create User Event", message);
    },
    async linkAccount(message) {
      console.log("Link Account Event", message);
    },
    async session(message) {
      console.log("Session Event", message);
    },
  },
  debug: true,
  logger: {
    error(code, metadata) {
      console.error("NextAuth Error", { code, metadata });
    },
    warn(code) {
      console.warn("NextAuth Warning", code);
    },
    debug(code, metadata) {
      console.log("NextAuth Debug", { code, metadata });
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);

console.log("Auth configuration completed");
