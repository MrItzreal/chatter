import NextAuth from "next-auth";
import { default as CredentialsProvider } from "next-auth/providers/credentials";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import bcrypt from "bcrypt";

// Define the auth options separately
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectToDB();

          if (!credentials?.username || !credentials?.password) {
            return null;
          }

          const user = await User.findOne({ username: credentials.username });
          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.passwordHash
          );
          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            name: user.username,
            username: user.username,
          };
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
        session.user.username = token.name;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.username;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};

// Create the handler using the auth options
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

/* The flow of this NextAuth config works like this:

-User submits login form
-authorize function validates credentials
-If valid, NextAuth creates a JWT with the user info via the jwt callback
-This JWT is stored securely in the browser
-On subsequent requests, the session callback uses the JWT to provide user info to your components
-Your components can access this info via useSession()
*/
