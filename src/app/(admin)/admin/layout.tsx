import type React from "react";
import type { Metadata } from "next";
// import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/admin-sidebar";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin Dashboard | Book Explorer",
  description: "Admin dashboard for Book Explorer",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if user is authenticated and has admin role

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6 md:p-8">{children}</div>
    </div>
  );
}
