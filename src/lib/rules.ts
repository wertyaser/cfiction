import { z } from "zod";

export const ForgotPassword = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email." })
    .regex(/@rtu.edu.ph$/, {
      message: "RTU email only",
    })
    .trim(),
});

export const RegisterFormSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "password is required" })
      .min(5, { message: "Be at least 5 characters long" })
      .regex(/[a-zA-Z]/, {
        message: "Password must be contain at least one letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      })
      .regex(/[!@#$%^&*.]/, {
        message: "Password must contain at least one special character",
      })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .merge(ForgotPassword)
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });
