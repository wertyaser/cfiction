import { NextResponse } from "next/server";
import ollama from "ollama";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

interface ChatResponse {
  message: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { message: "Invalid request format" },
        { status: 400 }
      );
    }

    const { messages } = body as ChatRequest;

    const response = await ollama.chat({
      model: "llama3.2:latest", // Ensure this model is installed in Ollama
      messages,
    });

    return NextResponse.json({
      message: response.message.content,
    } as ChatResponse);
  } catch (error) {
    console.error("Error in API:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: `Error: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
