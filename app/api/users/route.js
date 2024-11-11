import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async (req) => {
  try {
    await connectToDB();

    // Fetch All "usernames"
    const users = await User.find({}, "username"); // Only fetch the username field
    const usernames = users.map((user) => user.username); // Extract usernames from the results

    return new Response(JSON.stringify(usernames), { status: 200 });
  } catch (error) {
    console.error("Error fetching usernames:", error);
    return new Response("Failed to fetch usernames", { status: 500 });
  }
};
