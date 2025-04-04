"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { MonthlyStat } from "@/lib/admin";

export default function BookAnalyticsChart() {
  const [analyticsData, setAnalyticsData] = useState<MonthlyStat[]>([]);

  useEffect(() => {
    async function fetchAnalyticsData() {
      try {
        const response = await fetch("/api/dashboard-stats");
        if (!response.ok) throw new Error("Failed to fetch analytics data");
        const data: MonthlyStat[] = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    }
    fetchAnalyticsData();
  }, []);
  return (
    <ChartContainer
      config={{
        searches: {
          label: "Searches",
          color: "hsl(var(--chart-1))",
        },
        downloads: {
          label: "Downloads",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={analyticsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line type="monotone" dataKey="searches" stroke="var(--color-searches)" strokeWidth={2} />
          <Line type="monotone" dataKey="books" stroke="var(--color-downloads)" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
