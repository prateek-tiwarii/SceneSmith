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

    const {title , description , genre, tags , negativePrompt} = await request.json();
    if (!title || !description || !genre || !negativePrompt) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    
    const existingScript = await Script.findOne({
      author: userId,
      title,
    })

    if(existingScript){
      return NextResponse.json({ error: "Script already exists" }, { status: 409 });
    }

    const newScript = new Script({
      title,
      description,
      negativePrompt,
      genre,
      tags: tags || [],
      author: userId,
    });

    await newScript.save();
    return NextResponse.json({ message: "Script created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating script:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
