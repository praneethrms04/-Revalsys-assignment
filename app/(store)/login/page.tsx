import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Voltura account or continue as a guest.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginForm />;
}
