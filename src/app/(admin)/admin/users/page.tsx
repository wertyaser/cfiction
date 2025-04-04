import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import UserTable from "@/components/admin/user-table";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">View and manage user accounts.</p>
      </div>
      <Card>
        <CardContent className="p-6">
          <Suspense fallback={<UserTableSkeleton />}>
            <UserTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

function UserTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="border rounded-md">
        <div className="grid grid-cols-5 gap-4 p-4 border-b bg-muted/50">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="grid grid-cols-5 gap-4 p-4 border-b">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-8 w-32" />
      </div>
    </div>
  );
}
