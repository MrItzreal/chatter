const connectToDB = require("../../../utils/database.js");
import Message from "@models/message";

// DELETE (deletes ENTIRE conversation)
export const DELETE = async (req) => {
  try {
    await connectToDB();

    // For App Router, use searchParams from the URL
    const { searchParams } = new URL(req.url);
    const senderUsername = searchParams.get("senderUsername");
    const recipientUsername = searchParams.get("recipientUsername");

    await Message.deleteMany({
      $or: [
        { senderUsername, recipientUsername },
        {
          senderUsername: recipientUsername, //A to B
          recipientUsername: senderUsername, //B to A
        },
      ],
    });

    // io.emit("conversationDeleted", { senderUsername, recipientUsername });
    return new Response("Conversation deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete conversation", { status: 500 });
  }
};
