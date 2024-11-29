const connectToDB = require("../../../utils/database.js");
import Message from "@models/message";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    // Fetch "messages"
    // For App Router, use searchParams from the URL
    const { searchParams } = new URL(req.url);
    const senderUsername = searchParams.get("senderUsername");
    const recipientUsername = searchParams.get("recipientUsername");

    if (!senderUsername || !recipientUsername) {
      return new Response("Missing username parameters", { status: 400 });
    }

    const latestMessage = await Message.findOne(
      {
        $or: [
          { senderUsername, recipientUsername },
          {
            senderUsername: recipientUsername, //A to B
            recipientUsername: senderUsername, //B to A
          },
        ],
      },
      "content" //projection to only retrieve "content" field
    ).sort({ timestamp: -1 });

    return new Response(JSON.stringify(latestMessage), { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return new Response("Failed to fetch messages", { status: 500 });
  }
};
