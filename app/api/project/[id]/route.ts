import Script from "@/models/scriptModel";
import Scene from "@/models/sceneModel";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/utils/connectToDb";
import { auth } from "@/auth";



export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // const scriptId =  params.id;
    // if (!scriptId) {
    //   return NextResponse.json({ error: "Script ID is required" }, { status: 400 });
    // }

      const { id } = await context.params; // ✅ must await
    if (!id) {
      return NextResponse.json({ error: "Script ID is required" }, { status: 400 });
    }

    const script = await Script.findById(id).populate("author", "name email").populate("scenes");

    if (!script) {
      return NextResponse.json({ error: "Script not found" }, { status: 404 });
    }

    return NextResponse.json(script, { status: 200 });
  } catch (error) {
    console.error("Error fetching script:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function PATCH(request :NextRequest , {params}: {params: {id: string}}) {
    try {
        await connectDB();

        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const scriptId = params.id;
        if (!scriptId) {
            return NextResponse.json({ error: "Script ID is required" }, { status: 400 });
        }

        const updateData = await request.json();
        const updatedScript = await Script.findByIdAndUpdate(scriptId, updateData, { new: true });

        if (!updatedScript) {
            return NextResponse.json({ error: "Script not found" }, { status: 404 });
        }

        return NextResponse.json(updatedScript, { status: 200 });
    } catch (error) {
        console.error("Error updating script:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const deletedScript = await Script.findByIdAndDelete(scriptId);

    if (!deletedScript) {
        return NextResponse.json({ error: "Script not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Script deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting script:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}