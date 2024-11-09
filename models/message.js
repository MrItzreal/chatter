import { Schema, model, models } from "mongoose";

// Model for user form
const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId, //unique ID of user who sent msg
      ref: "User", // Reference to the User model
      required: true,
    },
    chatId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Message = models.Message || model("Message", MessageSchema);

export default Message;
