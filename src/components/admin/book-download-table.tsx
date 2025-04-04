// components/BookDownloadTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTopDownloadedBooks, TopBookDownload } from "@/lib/admin";

export default async function BookDownloadTable() {
  const topBooks = await getTopDownloadedBooks(10);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className="text-right">Download Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topBooks.length > 0 ? (
            topBooks.map((item: TopBookDownload, index: number) => (
              <TableRow key={item.title}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <span className="font-medium">{item.title}</span>
                </TableCell>
                <TableCell>{item.author}</TableCell>
                <TableCell className="text-right">{item.downloadCount}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No download data available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
