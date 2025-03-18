"use client";

import Link from "next/link";
import { useActionState } from "react";
import { register } from "@/actions/validation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Banner from "@/components/ui/cbanner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// Define the type for state
interface RegisterState {
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  email?: string;
  success?: boolean;
}

export default function Register() {
  const [state, action, isPending] = useActionState<RegisterState>(
    register,
    undefined
  );

  const router = useRouter();
  if (state?.success) {
    router.push("/sign-in");
  }
  return (
    <div>
      <section className="flex flex-row min-h-svh items-center justify-center gap-16">
        <Banner />
        <div className="w-full max-w-sm flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Register Here!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form action={action}>
                <div className="flex flex-col gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="2021**@rtu.edu.ph"
                      required
                    />
                    {state?.errors?.email && (
                      <p className="error">{state.errors.email}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input name="password" type="password" required />
                    {state?.errors?.password && (
                      <div className="error">
                        <p>Password must: </p>
                        <ul className="list-disc list-inside ml-4">
                          {state.errors.password.map((err) => (
                            <li key={err}>{err}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Confirm Password</Label>
                    </div>
                    <Input name="confirmPassword" type="password" required />
                    {state?.errors?.confirmPassword && (
                      <p className="error">{state.errors.confirmPassword}</p>
                    )}
                    <Button
                      disabled={isPending}
                      type="submit"
                      className="w-full"
                    >
                      {isPending ? "Loading..." : "Register"}
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  <div>
                    Already have an account?
                    <Link
                      href="/sign-in"
                      className="underline underline-offset-4"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
