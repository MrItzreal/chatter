const connectToDB = require("../../../utils/database.js");
import Message from "@models/message";

export const GET = async (req) => {
  try {
    await connectToDB();

    // Fetch "messages"
    const { senderUsername, recipientUsername } = req.query;

    const lastMessage = await Message.findOne(
      {
        $or: [
          { senderUsername, recipientUsername },
          {
            senderUsername: recipientUsername,
            recipientUsername: senderUsername,
          },
        ],
      },
      "content"
    ).sort({ timestamp: -1 });

    return new Response(JSON.stringify(lastMessage), { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return new Response("Failed to fetch messages", { status: 500 });
  }
};
