import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/connectToDb";
import Script from "@/models/scriptModel";
import mongoose, { Types } from "mongoose";

export async function GET(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid user ID" },
        { status: 400 }
      );
    }

    await connectDB();

    const stats = await Script.aggregate([
      { $match: { author: new Types.ObjectId(id) } },
      {
        $project: {
          scenesCount: { $size: "$scenes" },
        },
      },
      {
        $group: {
          _id: "$author",
          totalScripts: { $sum: 1 },
          totalScenes: { $sum: "$scenesCount" },
          avgScenesPerScript: { $avg: "$scenesCount" },
        },
      },
    ]);

    const result = stats[0] || {
      totalScripts: 0,
      totalScenes: 0,
      avgScenesPerScript: 0,
    };

    return NextResponse.json(result);
    
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}