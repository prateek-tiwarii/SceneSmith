import mongoose from "mongoose";

const scriptSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
   genre: { type: String, required: true },              // e.g. "sci-fi, anime, noir"
  negativePrompt: { type: String, default: "" },        // What to avoid globally
  tags: { type: [String], default: [] },                // Search/filters
  scenes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Scene" }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
},
{
  timestamps: true,
});

const Script =  mongoose.models.Script || mongoose.model("Script", scriptSchema);

export default Script;
