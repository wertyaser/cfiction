"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/password-input";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const response = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword, confirmPassword }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to reset password");
        setMessage("Password reset successfully! Please sign in.");
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "An error occurred. Try again.");
      }
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      {!token ? (
        <p>Invalid or missing token. Please request a new reset link.</p>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <Label htmlFor="new-password">New Password</Label>
            <PasswordInput
              name="new-password"
              id="new-password"
              value={newPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <PasswordInput
              name="confirm-password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              required
            />
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Resetting..." : "Reset Password"}
          </Button>
          {message && <p className="text-center">{message}</p>}
        </form>
      )}
    </div>
  );
}
