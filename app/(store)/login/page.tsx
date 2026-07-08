import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

const LoginForm = dynamic(() => import("./login-form").then((m) => ({ default: m.LoginForm })), {
  ssr: true,
  loading: () => (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-1.5 text-center">
          <div className="mx-auto h-8 w-48 rounded-lg bg-muted" />
          <div className="mx-auto h-4 w-64 rounded-lg bg-muted" />
        </div>
        <div className="space-y-4">
          <div className="h-16 w-full rounded-lg bg-muted" />
          <div className="h-16 w-full rounded-lg bg-muted" />
          <div className="h-11 w-full rounded-lg bg-muted" />
        </div>
      </div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Voltura account or continue as a guest.",
  robots: { index: false, follow: true },
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
