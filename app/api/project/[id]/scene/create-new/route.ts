import mongoose from "mongoose";
import Scene from "@/models/sceneModel";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import Script from "@/models/scriptModel";
import { connectDB } from "@/utils/connectToDb";





export async function POST(req: NextRequest , { params }: { params: { id: string } }) {
    try{
        await connectDB();

        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const scriptId = params.id;

        if (!scriptId) {
            return NextResponse.json({ error: "Script ID is required" }, { status: 400 });
        }

        const{title , description , negativePrompt , prompt , order ,imageUrl } = await req.json();

        if(!title || !imageUrl || !negativePrompt || !order ) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const script = await Script.findById(scriptId);
        if (!script) {
            return NextResponse.json({ error: "Script not found" }, { status: 404 });
        }

        

        const newScene = new Scene({
            scriptId,
            title,
            description,
            negativePrompt,
            imageUrl,
            order,
            prompt,
            status : "completed"
        });

        await newScene.save();

        return NextResponse.json({ message: "Scene created successfully", scene: newScene }, { status: 201 });
    } catch (error) {
        console.error("Error creating scene:", error);
        return NextResponse.json({ message: "Error creating scene" }, { status: 500 });
    }
}