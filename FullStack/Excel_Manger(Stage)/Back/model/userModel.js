import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], required: true, default: "user" },
    isActive: { type: Boolean, default: true },
    photo: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);