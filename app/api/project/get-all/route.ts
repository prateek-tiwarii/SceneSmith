export const runtime = 'nodejs'
import Script from "@/models/scriptModel";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/utils/connectToDb";    
import { auth } from "@/auth";


export async function GET(request: NextRequest) {
  try {
    await connectDB();
  // Ensure the User model is registered in Mongoose before populate
  User;
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const scripts = await Script.find({ author: session.user?.id }).populate("author", "name email");
    
    return NextResponse.json({scripts}, { status: 200 });
  } catch (error) {
    console.error("Error fetching scripts:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}