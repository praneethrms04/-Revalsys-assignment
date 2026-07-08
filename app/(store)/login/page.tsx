import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Voltura account or continue as a guest.",
  alternates: {
    canonical: `${SITE.url}/login`,
  },
  openGraph: {
    title: "Sign In | Voltura",
    description: "Sign in to your Voltura account or continue as a guest.",
    url: `${SITE.url}/login`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign In | Voltura",
    description: "Sign in to your Voltura account or continue as a guest.",
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
