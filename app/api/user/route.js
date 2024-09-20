import { connectToDB } from "@/utils/database";
import User from "@models/user";

export const GET = async (request) => {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    const user = await User.findOne({ username });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch user!", { status: 500 });
  }
};
