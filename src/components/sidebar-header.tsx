"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordInput from "./password-input";
import { CircleUser, ChevronDown, UserCog, KeyRound } from "lucide-react";
import { edit, resetPass } from "@/lib/admin";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { signIn, signOut } from "next-auth/react";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function AccountInformation() {
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [isPending, startTransition] = useTransition();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

  // Fetch current user when dialog opens
  const handleOpenDialog = async () => {
    try {
      const response = await fetch("/api/editUser");
      if (!response.ok) throw new Error("Failed to fetch user");
      const user: User = await response.json();
      setUserToEdit(user);
    } catch (error) {
      console.error("Error fetching current user:", error);
      alert("Failed to load user data");
    }
  };

  const handleEditSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        await edit(formData);
        setEditDialogOpen(false);
        alert("Information updated successfully!");
        await signOut({ redirect: false });
        window.location.reload(); // Refresh the page to reflect changes
      } catch (error) {
        console.error("Failed to edit user:", error);
      }
    });
  };

  const handlePasswordSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        await resetPass(formData);
        setPasswordDialogOpen(false);

        // After password reset, sign out and sign in with new credentials
        const email = userToEdit?.email || "";
        const newPassword = formData.get("new-password") as string;
        await signOut({ redirect: false }); // Sign out without redirect
        await signIn("credentials", {
          email,
          password: newPassword,
          redirect: false, // Stay on the same page
        });

        alert("Password updated successfully!");
      } catch (error) {
        console.error("Failed to reset password:", error);
      }
    });
  };

  //   const handlePasswordSubmit = (formData: FormData) => {
  //     startTransition(async () => {
  //       try {
  //         await resetPassword(formData);
  //         setPasswordDialogOpen(false);
  //         // session refresh
  //       } catch (error) {
  //         console.error("Failed to reset password:", error);
  //         // alert("Failed to reset password. Check the console for details.");
  //       }
  //     });
  //   };

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <CircleUser className="h-4 w-4" />
                <span>Account</span>
                <ChevronDown className="ml-auto h-4 w-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              <DropdownMenuItem
                onClick={() => {
                  handleOpenDialog();
                  setEditDialogOpen(true);
                }}>
                <UserCog className="mr-2 h-4 w-4" />
                <span>Edit Information</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleOpenDialog();
                  setPasswordDialogOpen(true);
                }}>
                <KeyRound className="mr-2 h-4 w-4" />
                <span>Change Password</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* Edit Information Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Information</DialogTitle>
            <DialogDescription>Make changes to your account details.</DialogDescription>
          </DialogHeader>
          <form action={handleEditSubmit} className="grid gap-4 py-4">
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
                type="email"
                defaultValue={userToEdit?.email}
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setEditDialogOpen(false)}
                disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>Update your account password.</DialogDescription>
          </DialogHeader>
          <form action={handlePasswordSubmit} className="grid gap-4 py-4">
            <input type="hidden" name="id" value={userToEdit?.id || ""} />
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-password" className="text-right">
                New Password
              </Label>
              <PasswordInput id="new-password" name="new-password" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirm-password" className="text-right">
                Confirm Password
              </Label>
              <PasswordInput id="confirm-password" name="confirm-password" className="col-span-3" />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setPasswordDialogOpen(false)}
                disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Update Password"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </SidebarHeader>
  );
}
