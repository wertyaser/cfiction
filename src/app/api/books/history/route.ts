import { NextResponse } from "next/server";
import { getSearchHistory } from "../books";

export async function GET() {
  try {
    const history = await getSearchHistory();

    return NextResponse.json(history);
  } catch (error) {
    console.error("Error in search history API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
