"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import Banner from "@/components/ui/cbanner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import PasswordInput from "@/components/password-input";

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      const session = await getSession();
      if (!session?.user) {
        setError("Session not found. Please try again.");
        return;
      }

      const isAdmin = session.user.isAdmin;

      if (isAdmin) {
        router.push("/admin");
      } else {
        router.push("/chatbot");
      }
      router.refresh();
    } catch {
      setError("An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-16 px-4 sm:px-6 lg:px-8">
      {/* Banner Section */}
      <div className="hidden lg:block w-full max-w-md">
        <Banner />
      </div>

      {/* Login Form */}
      <div className="w-full max-w-sm flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login Here!</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                {/* Email Field */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="2021**@rtu.edu.ph"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <div className="relative">
                    <PasswordInput id="password" name="password" required />
                  </div>
                </div>

                {/* Error Message */}
                {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Login"}
                </Button>
              </div>

              {/* Links */}
              <div className="grid mt-4 text-center text-sm">
                <Link
                  href="/forgot-password"
                  className="inline-block text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </Link>
                <div>
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="underline underline-offset-4">
                    Register
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
