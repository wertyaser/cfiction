"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

export function GenerateReportButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateReport = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/reports", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to generate report");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `book-explorer-report-${new Date().toISOString().split("T")[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGenerateReport}
      disabled={isLoading}
      className="ml-auto flex items-center gap-2">
      {isLoading ? "Generating..." : "Generate Report"}
      <FileDown className="h-4 w-4" />
    </Button>
  );
}
