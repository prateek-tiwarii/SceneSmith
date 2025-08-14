import mongoose from "mongoose";

const scriptSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  scenes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Scene" }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
},
{
  timestamps: true,
});

const Script =  mongoose.models.Script || mongoose.model("Script", scriptSchema);

export default Script;
