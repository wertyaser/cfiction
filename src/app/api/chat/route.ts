// /app/api/chat/route.ts
import { NextResponse } from "next/server";
import ollama from "ollama";

// Define interfaces for our chat messages
interface Message {
  role: string;
  content: string;
}

export async function POST(request: Request) {
  try {
    // Get the messages from the request body
    const { messages } = await request.json();

    // Format messages for Ollama API
    // Convert 'bot' role to 'assistant' as Ollama expects
    const formattedMessages = messages.map((msg: Message) => ({
      role: msg.role === "bot" ? "assistant" : msg.role,
      content: msg.content,
    }));

    // Set the Ollama API host if needed (default is http://localhost:11434)
    // ollama.setHost('http://localhost:11434');

    // Generate a response using the ollama client
    const response = await ollama.chat({
      model: "llama3.2:latest", // Adjust model name as needed (e.g., 'llama3', 'llama2', etc.)
      messages: formattedMessages,
      // Optional parameters
      stream: false,
      // options: {
      //   temperature: 0.7,
      //   top_p: 0.9,
      //   num_predict: 128,
      // }
    });

    // Return the AI message content to the client
    return NextResponse.json({ message: response.message.content });
  } catch (error) {
    console.error("Error processing chat request:", error);
    // If the error is from Ollama, it might have useful details
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: `Failed to process chat request: ${errorMessage}` },
      { status: 500 }
    );
  }
}
