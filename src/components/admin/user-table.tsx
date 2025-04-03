// components/UserTable.tsx
import { Suspense } from "react";
import UserTableContent from "./user-table-content";
import { getAllUsers } from "@/lib/admin";

export default async function UserTable() {
  const users = await getAllUsers();

  return (
    <Suspense fallback={<div>Loading users...</div>}>
      <UserTableContent users={users} />
    </Suspense>
  );
}
