/* I created this route in case I need to fetch an user or all users.
However, currently this route is not being used anywhere in the app.*/

// import { connectToDB } from "@/utils/database";
// import User from "@models/user";

// export const GET = async (request) => {
//   try {
//     await connectToDB();
//     const { searchParams } = new URL(request.url);
//     const username = searchParams.get("username");

//     let result;
//     if (username) {
//       // Fetch One User:
//       result = await User.findOne({ username });
//       if (!result) {
//         return new Response("User not found", { status: 404 });
//       }
//     } else {
//       // Fetch All Users:
//       result = await User.find({});
//     }

//     return new Response(JSON.stringify(result), { status: 200 });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return new Response("Failed to fetch users", { status: 500 });
//   }
// };
