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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Mock data - in a real app, this would come from your API
const analyticsData = [
  { month: "Jan", searches: 120, downloads: 45 },
  { month: "Feb", searches: 150, downloads: 60 },
  { month: "Mar", searches: 180, downloads: 70 },
  { month: "Apr", searches: 220, downloads: 90 },
  { month: "May", searches: 280, downloads: 110 },
  { month: "Jun", searches: 310, downloads: 130 },
  { month: "Jul", searches: 350, downloads: 150 },
  { month: "Aug", searches: 410, downloads: 180 },
  { month: "Sep", searches: 450, downloads: 200 },
  { month: "Oct", searches: 480, downloads: 220 },
  { month: "Nov", searches: 520, downloads: 240 },
  { month: "Dec", searches: 550, downloads: 260 },
];

export default function BookAnalyticsChart() {
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
      className="h-80"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={analyticsData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="searches"
            stroke="var(--color-searches)"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="downloads"
            stroke="var(--color-downloads)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
