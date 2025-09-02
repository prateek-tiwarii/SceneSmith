import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role : { type: String, required: true, enum: ["admin", "writer"], default: "writer" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
},
{
  timestamps: true,
});

const User =  mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
