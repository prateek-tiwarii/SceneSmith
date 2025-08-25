import mongoose from "mongoose";
import Scene from "@/models/sceneModel";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import Script from "@/models/scriptModel";
import { connectDB } from "@/utils/connectToDb";


const generatePrompt = async(ScriptDescription :string , title:string , negative:string , resolution:string , genre:string , SceneDescription:string )=>{

    const prompt = `You are a scene generator. Create a scene based on the following details:
    - Script Description: ${ScriptDescription}
    - Title: ${title}
    - Negative Prompt: ${negative}
    - Resolution: ${resolution}
    - Genre: ${genre}
    - Scene Description: ${SceneDescription}
    `;

    return prompt;

}


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

        const{title , description , negativePrompt , order ,resolution } = await req.json();

        if(!title || !description || !negativePrompt || !order || !resolution) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const script = await Script.findById(scriptId);
        if (!script) {
            return NextResponse.json({ error: "Script not found" }, { status: 404 });
        }

        const prompt = await generatePrompt(script.description, title, negativePrompt, resolution, script.genre, description);

        const newScene = new Scene({
            scriptId,
            title,
            description,
            negativePrompt,
            order,
            prompt,
            resolution
        });

        await newScene.save();

        return NextResponse.json({ message: "Scene created successfully", scene: newScene }, { status: 201 });
    } catch (error) {
        console.error("Error creating scene:", error);
        return NextResponse.json({ message: "Error creating scene" }, { status: 500 });
    }
}