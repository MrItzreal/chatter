import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import bcrypt from "bcrypt";

// Session based authentication + NextAuth as management library:
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      callbacks: {
        async session({ session }) {
          const sessionUser = await User.findOne({
            username: session.user.name,
          });
          session.user.id = sessionUser._id.toString();
          return session;

          //1-Gets current user
          //2-Updates current user ID
          //3-Identifies which user is logged in
        },
      },
      async signIn({ profile }) {
        try {
          await connectToDB();

          //Checks if "username" exists:
          const userExists = await User.findOne({
            username: profile.username,
          });

          //If "username" does not exist, creates new one
          if (!userExists) {
            await User.create({
              username: profile.username.replace(" ", "").toLowerCase(),
              image: profile.image,
              password: profile.password,
            });
          }
        } catch (err) {
          console.log(err);
          return false;
        }
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
-The **session** callback allows you to fetch the user's ID from the database based on their username and add it to the session object. This ensures that your application can accurately identify the logged-in user and associate their actions (like sending messages) with their unique ID.
*/
