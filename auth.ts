import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import Google from "next-auth/providers/google"
import client from "./lib/db";

 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    })
  ],
  session: {
    strategy: "jwt", 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
})