import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, BookOpen, BookMarked } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import React from "react";
import { redirect } from "next/navigation";
import { getDashboardStats } from "@/lib/admin";

interface DashboardStats {
  totalUsers: number;
  totalSearches: number;
  totalDownloads: number;
  // activeUsers: string | null | number;
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your Book Explorer platform.</p>
      </div>

      <Suspense fallback={<MetricsSkeleton />}>
        <DashboardMetrics />
      </Suspense>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<RecentActivitySkeleton />}>
              <RecentActivity />
            </Suspense>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Popular Books</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<PopularBooksSkeleton />}>
              <PopularBooks />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// DONE : WORKING DASHBOARD METRICS
async function DashboardMetrics() {
  const stats: DashboardStats = await getDashboardStats();

  // Check if all stats are 0 (indicating an error)
  if (
    stats.totalUsers === 0 &&
    stats.totalSearches === 0 &&
    stats.totalDownloads === 0
    // stats.activeUsers === 0
  ) {
    return (
      <div className="text-red-500">Failed to load dashboard stats. Please try again later.</div>
    );
  }

  // Replace `getDashboardStats` with dummy data
  // const stats = {
  //   totalUsers: 1200,
  //   totalSearches: 4500,
  //   totalDownloads: 3200,
  //   activeUsers: 150,
  // };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <MetricCard
        title="Total Users"
        value={stats.totalUsers}
        icon={Users}
        description="Registered users"
      />
      <MetricCard
        title="Books Searched"
        value={stats.totalSearches}
        icon={BookOpen}
        description="All time"
      />
      <MetricCard
        title="Books Downloaded"
        value={stats.totalDownloads}
        icon={BookMarked}
        description="All time"
      />
      {/* <MetricCard
        title="Active Users"
        value="hindi pa nagagawa"
        icon={Activity}
        description="This week"
      /> */}
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon: Icon,
  description,
}: {
  title: string;
  value: number;
  icon: string | React.ComponentType;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold">{value.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="p-2 bg-primary/10 rounded-full">
            <Icon />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

async function RecentActivity() {
  // This would fetch recent activity data from your API
  const activities = await getRecentActivities();

  return (
    <div className="space-y-4">
      {activities.length > 0 ? (
        activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 text-sm">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              {activity.type === "search" ? (
                <BookOpen className="h-4 w-4 text-primary" />
              ) : (
                <BookMarked className="h-4 w-4 text-primary" />
              )}
            </div>
            <div>
              <p>
                <span className="font-medium">{activity.userName}</span>{" "}
                {activity.type === "search" ? "searched for" : "downloaded"}{" "}
                <span className="font-medium">{activity.bookTitle}</span>
              </p>
              <p className="text-xs text-muted-foreground">{formatDate(activity.timestamp)}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted-foreground text-center py-4">No recent activity</p>
      )}
    </div>
  );
}

async function PopularBooks() {
  // This would fetch popular books data from your API
  const books = await getPopularBooks();

  return (
    <div className="space-y-4">
      {books.length > 0 ? (
        books.map((book, index) => (
          <div key={book.id} className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="font-medium">{index + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{book.title}</p>
              <p className="text-xs text-muted-foreground">{book.downloads} downloads</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted-foreground text-center py-4">No popular books data</p>
      )}
    </div>
  );
}

// Skeleton loaders
function MetricsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function RecentActivitySkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

function PopularBooksSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Helper functions
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

// These would be API calls to your backend
async function getRecentActivities() {
  // Placeholder data
  return [
    {
      id: "1",
      userName: "John Doe",
      type: "search",
      bookTitle: "The Great Gatsby",
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      userName: "Jane Smith",
      type: "download",
      bookTitle: "To Kill a Mockingbird",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    // More activities...
  ];
}

async function getPopularBooks() {
  // Placeholder data
  return [
    { id: "1", title: "1984", downloads: 245 },
    { id: "2", title: "The Great Gatsby", downloads: 189 },
    { id: "3", title: "To Kill a Mockingbird", downloads: 156 },
    { id: "4", title: "Pride and Prejudice", downloads: 132 },
    { id: "5", title: "The Catcher in the Rye", downloads: 98 },
  ];
}
