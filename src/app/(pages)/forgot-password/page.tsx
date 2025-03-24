import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div className="flex flex-row min-h-svh items-center justify-center gap-16">
      <Card className=" w-full max-w-3xl">
        <CardHeader>
          <CardDescription>
            Enter your email address below and we&apos;ll send you a link to
            reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Enter your school email</label>
              <Input type="email" id="email" name="email" required />
            </div>
            <Button type="submit">Reset Password</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
