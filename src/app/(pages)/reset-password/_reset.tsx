// "use client";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { ChevronLeft } from "lucide-react";
// import { useActionState, useEffect } from "react";
// import { forgotPassword, EmailState } from "@/actions/validation";
// import { useToast } from "@/hooks/use-toast";
// import { useFormStatus } from "react-dom";

// function SubmitButton() {
//   const { pending } = useFormStatus();
//   return (
//     <Button disabled={pending} type="submit">
//       {pending ? "Sending..." : "Reset Password"}
//     </Button>
//   );
// }

// export default function ResetPassword() {
//   const [state, action] = useActionState<EmailState | undefined, FormData>(
//     forgotPassword,
//     undefined
//   );
//   const { toast } = useToast();

//   // Show success toast when form submission is successful
//   useEffect(() => {
//     if (state?.success) {
//       toast({
//         title: "Success",
//         description: "A password reset link has been sent to your email.",
//       });
//     }

//     // Show error toast when there's an error

//     const errorMessage = state?.errors?.email?.[0] || state?.errors?.form?.[0];
//     if (errorMessage) {
//       toast({
//         variant: "destructive", // Make it red for errors
//         title: "Error",
//         description: errorMessage,
//       });
//     }
//   }, [state, toast]);

//   return (
//     <div>

//       <SubmitButton />
//     </div>
//   );
// }
