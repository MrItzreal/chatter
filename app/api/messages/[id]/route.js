const connectToDB = require("../../../../utils/database.js");
import Message from "@models/message";

// GET (read)
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    // Fetch "messages"
    // For App Router, use searchParams from the URL
    const { searchParams } = new URL(req.url);
    const senderUsername = searchParams.get("senderUsername");
    const recipientUsername = searchParams.get("recipientUsername");

    // Check ensures both usernames are present in the query parameters
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
      "content" //Projection to only retrieve "content" field
    ).sort({ timestamp: -1 });

    return new Response(JSON.stringify(latestMessage), { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return new Response("Failed to fetch messages", { status: 500 });
  }
};

// PATCH (update)
export const PATCH = async (req, { params }) => {
  const { message } = await req.json();

  try {
    await connectToDB();

    const existingMessage = await Message.findById(params.id);

    if (!existingMessage) {
      return new Response("Message not found", { status: 404 });
    }

    // If message exists then save updated version
    existingMessage.content = message;
    await existingMessage.save();

    return new Response(JSON.stringify(existingMessage), { status: 200 });
  } catch (error) {
    return new Response("Failed to update message", { status: 500 });
  }
};

// DELETE (deletes ONE message)
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await Message.findByIdAndDelete(params.id);

    return new Response("Message deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete message", { status: 500 });
  }
};

// DELETEMANY (deletes ENTIRE conversation)
export const DELETEMANY = async (req, { params }) => {
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

/*
NOTES:
 -findByIdAndDelete() function is part of the Mongoose library and is used to find a matching document, remove it, and pass the found document (if any) to the callback.

PATCH vs PUT:
-If you need to entirely replace an existing resource with new data, use "PUT".
-If you only want to modify specific parts of a resource, use "PATCH".In this case we only want to modify: prompts & Tags. */
