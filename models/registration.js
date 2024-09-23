import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
import User from "@models/user";

// Model for registration form
const RegistrationSchema = new Schema(
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
    email: {
      type: String,
      unique: [true, "Email already exists!"],
      required: [true, "Email is required!"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required!"],
    },
    password: {
      // Temporary field for plaintext password
      type: String,
      required: [true, "Password is required!"],
      select: false, // Don't include in query results
    },
    passwordHash: {
      type: String,
    },
  },
  { timestamps: true }
);

// Hash the password before saving
RegistrationSchema.pre("save", async function (next) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds); //generate a random salt value
  this.passwordHash = await bcrypt.hash(this.password, salt);
  this.password = undefined; // Clear the plaintext password
  next(); // Must be called to avoid an indefinite hang
});

// Transfer New Users to the Users collection
RegistrationSchema.post("save", async function () {
  const { username, passwordHash } = this;
  try {
    const newUser = new User({
      username: username,
      passwordHash: passwordHash,
    });

    await newUser.save();
  } catch (error) {
    console.log("Error transferring registration data to User");
  }
});

const Registration =
  models.Registration || model("Registration", RegistrationSchema);

export default Registration;
