import { NextResponse } from "next/server";
import ollama from "ollama";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await ollama.chat({
      model: "gemma3:4b", // Ensure this model is installed in Ollama
      messages,
    });

    return NextResponse.json({ message: response.message.content });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json(
      { message: "Error getting response." },
      { status: 500 }
    );
  }
}
