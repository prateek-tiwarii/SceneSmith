import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers:[Google({
    clientId: process.env.AUTH_GOOGLE_ID as string,
    clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
  })],
  callbacks: {
    async session({ session, token }) {
      // attach the user id from token to session
      session.user.id = token.sub  as string;
      return session;
    }
  }

})