// app/api/dashboard-stats/route.ts
import { NextResponse } from "next/server";
import { getMonthlyStats } from "@/lib/admin";

export async function GET() {
  const stats = await getMonthlyStats();
  return NextResponse.json(stats.monthlyStats); // Return only monthlyStats for the chart
}
