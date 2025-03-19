import { NextResponse } from "next/server";
import ollama from "ollama";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as ChatRequest;

    const response = await ollama.chat({
      model: "llama3.2:latest", // Ensure this model is installed in Ollama
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
