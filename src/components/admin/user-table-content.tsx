// components/UserTableContent.tsx
"use client";

import { startTransition, useState } from "react";
import { editUser } from "@/lib/admin";
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
import { MoreHorizontal, Edit, Trash, Key } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  registeredAt: string;
  adminStatus: "admin" | "user";
}

export default function UserTableContent({ users }: { users: User[] }) {
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [resetPasswordUser, setResetPasswordUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleEditSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        await editUser(formData);
        setUserToEdit(null); // Close dialog on success
      } catch (error) {
        console.error("Failed to edit user:", error);
        alert("Failed to save changes. Check the console for details.");
      }
    });
  };

  return (
    <>
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
                    <Badge variant={user.adminStatus === "admin" ? "default" : "secondary"}>
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
                        <DropdownMenuItem onClick={() => setResetPasswordUser(user)}>
                          <Key className="mr-2 h-4 w-4" /> Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setDeleteUser(user)}>
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={!!userToEdit} onOpenChange={() => setUserToEdit(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Make changes to the user account.</DialogDescription>
          </DialogHeader>
          <form action={handleEditSubmit} method="POST" className="grid gap-4 py-4">
            <input type="hidden" name="id" value={userToEdit?.id} />
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" defaultValue={userToEdit?.name} className="col-span-3" />
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
                className="col-span-3 flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm">
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setUserToEdit(null)}>
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={!!resetPasswordUser} onOpenChange={() => setResetPasswordUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>Set a new password for {resetPasswordUser?.name}.</DialogDescription>
          </DialogHeader>
          <form action="/admin/users/reset-password" method="POST" className="grid gap-4 py-4">
            <input type="hidden" name="id" value={resetPasswordUser?.id} />
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-password" className="text-right">
                New Password
              </Label>
              <Input id="new-password" name="new-password" type="password" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirm-password" className="text-right">
                Confirm Password
              </Label>
              <Input id="confirm-password" type="password" className="col-span-3" />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setResetPasswordUser(null)}>
                Cancel
              </Button>
              <Button type="submit">Reset Password</Button>
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
              Are you sure you want to delete {deleteUser?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <form action="/admin/users/delete" method="POST">
            <input type="hidden" name="id" value={deleteUser?.id} />
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteUser(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="destructive">
                Delete
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
