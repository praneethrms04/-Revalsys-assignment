"use client";

import { useRouter } from "next/navigation";
import { useForm, useController } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, LogIn, UserRound } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores/auth-store";
import { ROUTES } from "@/lib/constants";
import type { User } from "@/types";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const loginAsGuest = useAuthStore((state) => state.loginAsGuest);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const {
    field: checkboxField,
  } = useController({ control, name: "rememberMe" });

  const onSubmit = async (data: LoginFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockUser: User = {
      id: 1,
      email: data.email,
      username: data.email.split("@")[0],
      name: {
        firstname: "John",
        lastname: "Doe",
      },
    };

    login(mockUser);
    router.push(ROUTES.home);
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    router.push(ROUTES.home);
  };

  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-1.5 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-text-secondary">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
            {errors.email && (
              <p id="email-error" className="text-xs text-destructive" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
                className="pr-9"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="text-xs text-destructive" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Label className="flex cursor-pointer items-center gap-2 text-sm font-normal">
              <Checkbox
                checked={checkboxField.value}
                onCheckedChange={(checked) => checkboxField.onChange(checked)}
              />
              Remember me
            </Label>
            <button
              type="button"
              className="text-sm text-accent hover:underline"
              aria-label="Forgot password"
              onClick={() => {}}
            >
              Forgot password?
            </button>
          </div>

          <Button type="submit" size="lg" className="h-11 w-full gap-2 rounded-[10px] text-sm" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <LogIn className="size-4" />
            )}
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="relative">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-text-secondary">
            OR
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-11 w-full gap-2 rounded-[10px] text-sm"
          onClick={handleGuestLogin}
        >
          <UserRound className="size-4" />
          Continue as Guest
        </Button>

        <p className="text-center text-sm text-text-secondary">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            className="text-accent hover:underline"
            aria-label="Create an account"
            onClick={() => {}}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
