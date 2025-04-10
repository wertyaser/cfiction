"use client";

import Link from "next/link";
import { useActionState } from "react";
import { register, RegisterState } from "@/actions/validation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Banner from "@/components/ui/cbanner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className="w-full">
      {pending ? "Registering..." : "Register"}
    </Button>
  );
}

export default function Register() {
  const [state, action] = useActionState<RegisterState | undefined, FormData>(register, undefined);

  const router = useRouter();
  if (state?.success) {
    router.push("/sign-in");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <section className="flex flex-col lg:flex-row items-center justify-center gap-16 w-full max-w-7xl">
        {/* Banner Section */}
        <div className="hidden lg:block w-full max-w-md">
          <Banner />
        </div>

        {/* Registration Form */}
        <div className="w-full max-w-md flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Register Here!</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={action} className="space-y-4">
                <div className="grid gap-4">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input type="text" name="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input type="text" name="lastName" required />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input name="email" type="email" placeholder="2021**@rtu.edu.ph" required />
                    {state?.errors?.email && (
                      <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
                    )}
                  </div>

                  {/* Password Fields */}
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input name="password" type="password" required />
                    {state?.errors?.password && (
                      <div className="text-red-500 text-sm mt-1">
                        <p>Password must:</p>
                        <ul className="list-disc list-inside ml-4">
                          {state.errors.password.map((err) => (
                            <li key={err}>{err}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input name="confirmPassword" type="password" required />
                    {state?.errors?.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{state.errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <SubmitButton />
                </div>

                {/* Login Link */}
                <div className="mt-4 text-center text-sm">
                  <div>
                    Already have an account?{" "}
                    <Link href="/sign-in" className="underline underline-offset-4">
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
