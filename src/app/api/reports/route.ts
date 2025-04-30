import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { getDashboardStats, getPopularBooks, getPopularAuthors } from "@/lib/admin";
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
    const allPopularAuthors = await getPopularAuthors();

    // Filter out "Unknown Author"
    const popularAuthors = allPopularAuthors.filter((author) => author.author !== "Unknown Author");

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
      ...popularBooks.map((book, index) => [index + 1, book.title, book.downloads]),
    ];

    const popularBooksWorksheet = XLSX.utils.aoa_to_sheet(popularBooksData);
    XLSX.utils.book_append_sheet(workbook, popularBooksWorksheet, "Popular Books");

    // Popular Authors worksheet
    const popularAuthorsData = [
      ["Rank", "Author", "Book Count", "Total Downloads"],
      ...popularAuthors.map((author, index) => [
        index + 1,
        author.author,
        author.bookCount,
        author.downloads,
      ]),
    ];

    const popularAuthorsWorksheet = XLSX.utils.aoa_to_sheet(popularAuthorsData);
    XLSX.utils.book_append_sheet(workbook, popularAuthorsWorksheet, "Popular Authors");

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
