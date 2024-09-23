import { connectToDB } from "@utils/database";
import Registration from "@models/registration";

export const POST = async (req, res) => {
  const { fullname, username, email, phone, password } = await req.json();

  try {
    await connectToDB();
    const newUser = new Registration({
      fullname,
      username,
      email,
      phone,
      password,
    });

    await newUser.save(); //save new user in DB
    console.log("New user saved successfully!");

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      // 11000 = MongoDB duplicate key error
      return new Response("Username or email already exists", { status: 400 });
    }
    return new Response("Failed to create a new user", { status: 500 });
  }
};

// useNewUrlParser and useUnifiedTopology are deprecated and not needed.
