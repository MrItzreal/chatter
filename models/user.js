import { Schema, model, models } from "mongoose";

// Model for user form
const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Full name is required"],
    },
    username: {
      type: String,
      unique: [true, "Username already exists!"],
      required: [true, "Username is required!"],
      match: [
        /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
      ],
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      unique: [true, "Email already exists!"],
      required: [true, "Email is required!"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required!"],
    },
    passwordHash: {
      type: String,
      required: [true, "Password hash is required!"],
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

module.exports = User;
