"use client";

import type React from "react";
// import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/admin-sidebar";
import { useSession } from "next-auth/react";
// import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if user is authenticated and has admin role

  const { data: session } = useSession();

  if (session?.user?.isAdmin) {
    console.log("User is an admin");
  } else {
    console.log("User is a regular user");
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6 md:p-8">{children}</div>
    </div>
  );
}
