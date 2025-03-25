"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect } from "react";
import { forgotPassword, EmailState } from "@/actions/validation";
import { useToast } from "@/hooks/use-toast";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {pending ? "Sending..." : "Submit"}
    </Button>
  );
}

export default function ForgotPassword() {
  const [state, action] = useActionState<EmailState | undefined, FormData>(
    forgotPassword,
    undefined
  );
  const { toast } = useToast();

  // Show success toast when form submission is successful
  useEffect(() => {
    // if (state?.success) {
    //   toast({
    //     title: "Success",
    //     description: "A password reset link has been sent to your email.",
    //   });
    // }

    // Show error toast when there's an error

    const errorMessage = state?.errors?.email?.[0] || state?.errors?.form?.[0];
    if (errorMessage) {
      toast({
        variant: "destructive", // Make it red for errors
        title: "Error",
        description: errorMessage,
      });
    }
  }, [state, toast]);

  return (
    <div>
      <Card className=" w-full max-w-3xl">
        <CardHeader>
          <h1 className="text-2xl text-center">Forgot Password</h1>
          <CardDescription className="text-center">
            Enter your email address below and we&apos;ll send you a link to
            reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
