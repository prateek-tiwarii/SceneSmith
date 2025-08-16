import Script from "@/models/scriptModel";
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

    const scriptId = params.id;
    if (!scriptId) {
      return NextResponse.json({ error: "Script ID is required" }, { status: 400 });
    }

    const script = await Script.findById(scriptId).populate("author", "name email");

    if (!script) {
      return NextResponse.json({ error: "Script not found" }, { status: 404 });
    }

    return NextResponse.json(script, { status: 200 });
  } catch (error) {
    console.error("Error fetching script:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
