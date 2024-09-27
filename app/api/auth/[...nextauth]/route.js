import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          await connectToDB();
          const { username, password } = await req.json(); // Extract username/password from req body

          const user = await User.findOne({ username }); // Find user by username
          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            password,
            user.passwordHash
          );
          if (!isPasswordValid) {
            return null;
          }

          return user;
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
/*
The above export is usually done separately, meaning you handle GET and POST requests individually. However, for Next.js Authentication, this combined approach is necessary.

NOTES:
-[...nextauth] is the current naming convention in order to create a route.js file.
-In Next.js, each route functions as a serverless endpoint, similar to AWS Lambda functions. 
-These endpoints are invoked only when requested, establishing a connection to the database on demand. This approach eliminates the need for a continuously running server, optimizing resource usage.
*/
