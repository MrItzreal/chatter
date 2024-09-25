import bcrypt from "bcrypt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

// Authentication verification
export const POST = async (req) => {
  try {
    await connectToDB();
    const { username, password } = await req.json(); // Extract username/password from req body

    const user = await User.findOne({ username }); // Find user by username
    if (!user) {
      return new Response("Invalid username or password", { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash); // Compare passwords
    if (!isPasswordValid) {
      return new Response("Invalid username or password", { status: 401 });
    }

    return new Response("Login was successful!", { status: 200 });
  } catch (error) {
    console.error("Error during login");
    return new Response("Error during login", { status: 500 });
  }
};
