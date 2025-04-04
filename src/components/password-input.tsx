// components/ui/PasswordInput.tsx
"use client";

import { useState } from "react";
import { Input } from "../components/ui/input"; // Assuming this is your Shadcn UI Input component
import { Button } from "../components/ui/button"; // Assuming this is your Shadcn UI Button component
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  id: string;
  name: string;
  required?: boolean;
  className?: string; // Allow custom styling
  [key: string]: unknown; // Allow additional props for Input (e.g., placeholder, onChange)
}

export default function PasswordInput({
  id,
  name,
  required = false,
  className = "",
  ...rest
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid relative col-span-3">
      <Input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        className={`pr-10 ${className}`} // Ensure padding for the icon
        required={required}
        {...rest} // Spread additional props (e.g., placeholder, onChange)
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute inset-y-0 right-0 flex items-center pr-3"
        onClick={() => setShowPassword(!showPassword)}
        aria-label="Toggle password visibility">
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </Button>
    </div>
  );
}
