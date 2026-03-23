import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";


export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET!,
  trustHost: true,
  adapter: PrismaAdapter(prisma as any),
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
});