// components/UserTableContent.tsx
"use client";

import { useState, useTransition } from "react";
import {
  editUser,
  resetPassword,
  deleteUser as deleteUsers,
  addUser,
} from "@/lib/admin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MoreHorizontal,
  Edit,
  Trash,
  Key,
  Search,
  RefreshCw,
} from "lucide-react";
import PasswordInput from "../password-input";

interface User {
  id: string;
  name: string;
  email: string;
  registeredAt: string;
  adminStatus: "admin" | "user";
}

export default function UserTableContent({
  users: initialUsers,
}: {
  users: User[];
}) {
  const [users, setUsers] = useState<User[]>(initialUsers); // Manage users as state
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [resetPasswordUser, setResetPasswordUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleAddUser = (formData: FormData) => {
    startTransition(async () => {
      try {
        await addUser(formData);
        setIsAddUserOpen(false); // Close dialog on success
        handleRefresh(); // Refresh table
      } catch (error) {
        console.error("Failed to add user:", error);
        alert("Failed to add user. Check the console for details.");
      }
    });
  };

  const handleRefresh = () => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const updatedUsers: User[] = await response.json();
        setUsers(updatedUsers);
      } catch (error) {
        console.error("Failed to refresh users:", error);
        alert("Failed to refresh table. Check the console for details.");
      }
    });
  };

  const handleEditSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        await editUser(formData);
        setUserToEdit(null);
        handleRefresh(); // Refresh table after edit
      } catch (error) {
        console.error("Failed to edit user:", error);
        alert("Failed to save changes. Check the console for details.");
      }
    });
  };

  const handleResetPassword = (formData: FormData) => {
    startTransition(async () => {
      try {
        await resetPassword(formData);
        setResetPasswordUser(null);
        handleRefresh(); // Refresh table after reset
      } catch (error) {
        console.error("Failed to reset password:", error);
        alert("Failed to reset password. Check the console for details.");
      }
    });
  };

  const handleDeleteUser = (formData: FormData) => {
    startTransition(async () => {
      try {
        await deleteUsers(formData);
        setDeleteUser(null);
        handleRefresh(); // Refresh table after delete
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert("Failed to delete user. Check the console for details.");
      }
    });
  };

  return (
    <>
      <div className="flex flex-col justify-end sm:flex-row gap-4 mb-6">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleRefresh}
          disabled={isPending}
        >
          <RefreshCw className={`h-4 w-4 ${isPending ? "animate-spin" : ""}`} />
          <span>{isPending ? "Refreshing..." : "Refresh"}</span>
        </Button>
        <Button
          onClick={() => setIsAddUserOpen(true)}
          className="flex items-center gap-2" 
        >
          <Edit className="h-4 w-4" />
          <span>Add User</span>
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Registered</TableHead>
              <TableHead>Admin Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{formatDate(user.registeredAt)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.adminStatus === "admin" ? "default" : "secondary"
                      }
                    >
                      {user.adminStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setUserToEdit(user)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setResetPasswordUser(user)}
                        >
                          <Key className="mr-2 h-4 w-4" /> Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setDeleteUser(user)}
                        >
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground"
                >
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new user account.</DialogDescription>
          </DialogHeader>
          <form action={handleAddUser} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <PasswordInput id="password" name="password" required />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="adminStatus" className="text-right">
                Admin Status
              </Label>
              <select
                id="adminStatus"
                name="adminStatus"
                defaultValue="user"
                className="col-span-3 flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddUserOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Adding..." : "Add User"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={!!userToEdit} onOpenChange={() => setUserToEdit(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Make changes to the user account.
            </DialogDescription>
          </DialogHeader>
          <form
            action={handleEditSubmit}
            method="POST"
            className="grid gap-4 py-4"
          >
            <input type="hidden" name="id" value={userToEdit?.id} />
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={userToEdit?.name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                defaultValue={userToEdit?.email}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="adminStatus" className="text-right">
                Admin Status
              </Label>
              <select
                id="adminStatus"
                name="adminStatus"
                defaultValue={userToEdit?.adminStatus}
                className="col-span-3 flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setUserToEdit(null)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog
        open={!!resetPasswordUser}
        onOpenChange={() => setResetPasswordUser(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Set a new password for {resetPasswordUser?.name}.
            </DialogDescription>
            <DialogDescription className="text-center text-red-500">
              Password must be at least 6 characters long
            </DialogDescription>
          </DialogHeader>
          <form
            action={handleResetPassword}
            method="POST"
            className="grid gap-4 py-4"
          >
            <input type="hidden" name="id" value={resetPasswordUser?.id} />
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-password" className="text-right">
                New Password
              </Label>
              <PasswordInput id="new-password" name="new-password" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirm-password" className="text-right">
                Confirm Password
              </Label>
              <PasswordInput
                id="confirm-password"
                name="confirm-password"
                required
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setResetPasswordUser(null)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Resetting..." : "Reset Password"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={!!deleteUser} onOpenChange={() => setDeleteUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {deleteUser?.name}? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <form action={handleDeleteUser}>
            <input type="hidden" name="id" value={deleteUser?.id} />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteUser(null)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" variant="destructive" disabled={isPending}>
                {isPending ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
