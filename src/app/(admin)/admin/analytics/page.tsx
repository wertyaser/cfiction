import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import BookSearchTable from "@/components/admin/book-search-table";
import BookDownloadTable from "@/components/admin/book-download-table";
import BookAnalyticsChart from "@/components/admin/book-analytics-chart";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Book Analytics</h1>
        <p className="text-muted-foreground">Analyze book search and download patterns.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search & Download Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div className="h-80 w-full bg-muted/20 animate-pulse rounded-md" />}>
            <BookAnalyticsChart />
          </Suspense>
        </CardContent>
      </Card>

      <Tabs defaultValue="searches">
        <TabsList>
          <TabsTrigger value="searches">Most Searched Books</TabsTrigger>
          <TabsTrigger value="downloads">Most Downloaded Books</TabsTrigger>
        </TabsList>
        <TabsContent value="searches">
          <Card>
            <CardContent className="p-6">
              <Suspense fallback={<TableSkeleton />}>
                <BookSearchTable />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="downloads">
          <Card>
            <CardContent className="p-6">
              <Suspense fallback={<TableSkeleton />}>
                <BookDownloadTable />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="border rounded-md">
        <div className="grid grid-cols-4 gap-4 p-4 border-b bg-muted/50">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="grid grid-cols-4 gap-4 p-4 border-b">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
