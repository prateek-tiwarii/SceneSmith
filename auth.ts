import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

import User from "./models/userModel";
import { connectDB } from "./utils/connectToDb";


 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers:[Google({
    clientId: process.env.AUTH_GOOGLE_ID as string,
    clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
  })],
  callbacks: {

    async signIn({ user }) {

        try{
        await connectDB();
        // Check if user already exists
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          // If not, create a new user
          const newUser = new User({
            email: user.email,
            name: user.name,
          });
          await newUser.save();
        }
        return true;
    } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }

    },

    // async session({ session}) {
    //   // attach the user id from token to session
    //  await connectDB();
    //   const dbUser = await User.findOne({ email: session.user?.email });

    //   if (dbUser) {
    //     session.user.id = dbUser._id.toString();
    //   }

    //   return session;
    // },
    // async jwt({ token, user }) {
    //   if (user) {
    //     await connectDB();
    //     const dbUser = await User.findOne({ email: user.email });
    //     token.id = dbUser?._id.toString();
    //   }
    //   return token;
    // },


     async jwt({ token, user }) {
      if (user) {
        await connectDB();
        const dbUser = await User.findOne({ email: user.email });
        token.id = dbUser?._id.toString();
      }
      return token;
    },

    async session({ session, token }) {
      
      if (token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },

  }

})


