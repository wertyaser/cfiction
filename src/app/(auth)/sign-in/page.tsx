import Link from "next/link";

import Banner from "@/components/ui/cbanner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignIn() {
  return (
    <section className="flex flex-row min-h-svh items-center justify-center gap-16">
      <Banner />

      <div className="w-full max-w-sm flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login Here!</CardTitle>
            {/* <CardDescription>Login using RTU Email only</CardDescription> */}
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="2021**@rtu.edu.ph"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
              <div className="grid mt-4 text-center text-sm">
                <a
                  href="#"
                  className="inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
                <div>
                  Don&apos;t have an account?
                  <Link
                    href="/register"
                    className="underline underline-offset-4"
                  >
                    Sign up
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
