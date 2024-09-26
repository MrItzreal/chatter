import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = nextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          await connectToDB(req);
          const user = { username: "", password: "" };

          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (error) {}
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
