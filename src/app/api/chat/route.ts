// /app/api/chat/route.ts
import { NextResponse } from "next/server";
import Together from "together-ai";
// import ollama from "ollama";

// Define interfaces for our chat messages
// interface Message {
//   role: string;
//   content: string;
// }

const together = new Together();
together.apiKey = process.env.TOGETHER_API_KEY || process.env.TOGETHER_API_KEY2 || "";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body;

    const systemPrompt = {
      role: "system",
      content:
        "Your name is Ctrl. You have to act as a AI-Librarian and answer the questions of related to books and library. Users can ask you about the books, authors, etc. You have to answer any related questions about school. Also you can suggest the books to the users. You also a summazier tool, and paraphraser tool. You can use these tools to help the users.",
    };

    const response = await together.chat.completions.create({
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
      messages: [systemPrompt, ...messages],
    });

    const aiReply = response.choices[0]?.message?.content || "No response from AI";

    const updatedMessages = [...messages, { role: "assistant", content: aiReply }];

    return NextResponse.json({ messages: updatedMessages }, { status: 200 });
  } catch (error) {
    console.error("Error processing chat request:", error);
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 });
  }

  // try {
  //   const { messages } = await request.json();
  //   const formattedMessages = messages.map((msg: Message) => ({
  //     role: msg.role === "bot" ? "assistant" : msg.role,
  //     content: msg.content,
  //   }));
  //   const response = await ollama.chat({
  //     model: "llama3.2:latest", // Adjust model name as needed (e.g., 'llama3', 'llama2', etc.)
  //     messages: formattedMessages,
  //     stream: false,
  //   });
  //   // Return the AI message content to the client
  //   return NextResponse.json({ message: response.message.content });
  // } catch (error) {
  //   console.error("Error processing chat request:", error);
  //   const errorMessage =
  //     error instanceof Error ? error.message : "Unknown error";
  //   return NextResponse.json(
  //     { error: `Failed to process chat request: ${errorMessage}` },
  //     { status: 500 }
  //   );
  // }
}
