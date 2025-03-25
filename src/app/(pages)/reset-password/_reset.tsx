"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {pending ? "Sending..." : "Reset Password"}
    </Button>
  );
}

export default function ResetPassword() {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <h1 className="text-2xl text-center">Reset your password</h1>
        <CardDescription className="text-center">
          Enter your new password below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <div className="">
              <Label>New Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder=""
                required
              />
            </div>
            <div>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder=""
                required
              />
            </div>
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
