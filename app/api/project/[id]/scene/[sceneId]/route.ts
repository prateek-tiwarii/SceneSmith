import mongoose from "mongoose";
import Scene from "@/models/sceneModel";
import script from "@/models/scriptModel";
import { connectDB } from "@/utils/connectToDb";
import { NextRequest , NextResponse } from "next/server";
import { auth } from "@/auth";




export async function PATCH(request :NextRequest , {params}: {params: {id: string}}) {
    try {
        await connectDB();

        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const sceneId = params.id;
        if (!sceneId) {
            return NextResponse.json({ error: "Scene ID is required" }, { status: 400 });
        }

       const body = await request.json();

       const updateData = await Scene.findByIdAndUpdate(sceneId, body, { new: true });

       if (!updateData) {
           return NextResponse.json({ error: "Failed to update scene" }, { status: 500 });
       }

       return NextResponse.json(updateData, { status: 200 });

    } catch (error) {
        console.error("Error updating scene:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function DELETE(request: NextRequest, { params }: { params: { id: string; sceneId: string } }) {
    try{
       await connectDB();

       const session = await auth();
       if(!session){
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
       }

        const sceneId = params.sceneId;
       if (!sceneId) {
           return NextResponse.json({ error: "Scene ID is required" }, { status: 400 });
       }

       const deletedScene = await Scene.findByIdAndDelete(sceneId);
       if (!deletedScene) {
           return NextResponse.json({ error: "Scene not found" }, { status: 404 });
       }

       return NextResponse.json({ message: "Scene deleted successfully" }, { status: 200 });

    }catch (error) {
        console.error("Error deleting scene:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}