import { NextResponse } from "next/server";
import Together from "together-ai";

const together = new Together();
together.apiKey = process.env.TOGETHER_API_KEY3 || "";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query } = body;

    const systemPrompt: { role: "system"; content: string } = {
      role: "system",
      content:
        "You are a helpful book recommendation assistant. Generate 15 specific book search suggestions related to the user's query. Format your response as a JSON array of strings. Each suggestion should be a specific book title, author, genre, or topic that would be useful for someone searching for books. Keep suggestions concise and relevant.",
    };

    const userMessage: { role: "user"; content: string } = {
      role: "user",
      content: `Generate 15 search suggestions related to: "${query}"`,
    };

    const response = await together.chat.completions.create({
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
      messages: [systemPrompt, userMessage],
      response_format: { type: "json_object" },
    });

    const aiReply = response.choices[0]?.message?.content || "[]";

    // Parse the JSON response - handle both array and object formats
    let suggestions = [];
    try {
      const parsedResponse = JSON.parse(aiReply);
      suggestions = Array.isArray(parsedResponse)
        ? parsedResponse
        : parsedResponse.suggestions || parsedResponse.results || [];

      // Ensure we have exactly 15 suggestions
      suggestions = suggestions.slice(0, 15);
    } catch (error) {
      console.error("Error parsing AI response:", error);
      suggestions = [];
    }

    return NextResponse.json({ suggestions }, { status: 200 });
  } catch (error) {
    console.error("Error processing suggestion request:", error);
    return NextResponse.json({ error: "Failed to generate suggestions" }, { status: 500 });
  }
}
