export const runtime = 'nodejs'
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const { prompt, width, height, model, negativePrompt } = await req.json();

    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

  
    const taskUUID = uuidv4();

    
    const requestBody = [
      {
        taskType: "imageInference",
        taskUUID: taskUUID,
        outputType: "URL",
        outputFormat: "JPG",
        positivePrompt: prompt,
        negativePrompt: negativePrompt,
        height: height || 1024,
        width: width || 1024,
        model: model || "runware:101@1",
        steps: 20,
        CFGScale: 7.5,
        numberResults: 1
      }
    ];

    console.log("Request body:", JSON.stringify(requestBody, null, 2));

    const response = await fetch("https://api.runware.ai/v1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.RUNWARE_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    
    console.log("Response:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      return NextResponse.json(
        { 
          error: "Failed to generate image", 
          details: data,
          status: response.status 
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to generate image", details: error.message },
      { status: 500 }
    );
  }
}