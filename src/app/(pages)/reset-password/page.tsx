import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm"; // New Client Component

export default function ResetPasswordPage() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <Suspense fallback={<p>Loading reset form...</p>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
