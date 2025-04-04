// components/BookSearchTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTopSearchedQueries, TopSearchQuery } from "@/lib/admin";

export default async function BookSearchTable() {
  const topQueries = await getTopSearchedQueries(10);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Query</TableHead>
            <TableHead className="text-right">Search Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topQueries.length > 0 ? (
            topQueries.map((item: TopSearchQuery, index: number) => (
              <TableRow key={item.query}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{item.query}</TableCell>
                <TableCell className="text-right">{item.searchCount}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground">
                No search data available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
