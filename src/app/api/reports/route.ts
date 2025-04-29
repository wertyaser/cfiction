import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { getDashboardStats, getPopularBooks } from "@/lib/admin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface DashboardStats {
  totalUsers: number;
  totalSearches: number;
  totalDownloads: number;
  // activeUsers: string | null | number;
}

export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get dashboard stats and popular books
    const stats: DashboardStats = await getDashboardStats();
    const popularBooks = await getPopularBooks();

    // Create workbook and worksheets
    const workbook = XLSX.utils.book_new();

    // Summary worksheet
    const summaryData = [
      ["Book Explorer Report", ""],
      ["Generated on", new Date().toLocaleString()],
      [""],
      ["Metric", "Value"],
      ["Total Users", stats.totalUsers],
      ["Total Books Searched", stats.totalSearches],
      ["Total Books Downloaded", stats.totalDownloads],
    ];

    const summaryWorksheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summaryWorksheet, "Summary");

    // Popular Books worksheet
    const popularBooksData = [
      ["Rank", "Book Title", "Downloads"],
      ...popularBooks.slice(0, 5).map((book, index) => [index + 1, book.title, book.downloads]),
    ];

    const popularBooksWorksheet = XLSX.utils.aoa_to_sheet(popularBooksData);
    XLSX.utils.book_append_sheet(workbook, popularBooksWorksheet, "Top 5 Popular Books");

    // Convert workbook to buffer
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    // Return the Excel file
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="book-explorer-report-${new Date().toISOString().split("T")[0]}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Error generating report:", error);
    return new NextResponse("Error generating report", { status: 500 });
  }
}
