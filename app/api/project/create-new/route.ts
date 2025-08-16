import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/utils/connectToDb";
import Script from "@/models/scriptModel";


export async function POST(request: NextRequest) {
    try{
    await connectDB();
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user?.id;

    const {title , description , content, tags} = await request.json();
    if (!title || !description || !content) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    const newScript = new Script({
      title,
      description,
      content,
      tags: tags || [],
      user: userId,
    });

    await newScript.save();
    return NextResponse.json({ message: "Script created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating script:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
