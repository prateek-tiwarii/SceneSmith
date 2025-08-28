import mongoose from "mongoose";


const SceneSchema = new mongoose.Schema(
  {
    scriptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Script", 
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    prompt: {
      type: String,
      required: true,
    },
    negativePrompt: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String, 
    },
    resolution: {
      type: String, 
      default: "1024x1024",
    },
    modelUsed: {
      type: String,
      default: "lama2.0",     
    },
    generationTime: {
      type: Number,
      default: 0,
    },
    order: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Scene =  mongoose.models.Scene ||
  mongoose.model("Scene", SceneSchema);

export default Scene;
