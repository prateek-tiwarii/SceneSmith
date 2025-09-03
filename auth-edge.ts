import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

// Edge-safe auth() export without Node-only adapters/DB clients.
// Used exclusively by middleware to avoid bundling `mongodb` into the Edge runtime.
export const { auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = (user as any).id
      return token
    },
    async session({ session, token }) {
      if (token?.id) (session.user as any).id = token.id as string
      return session
    },
  },
})
