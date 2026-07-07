import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

const trustItems = [
  { icon: Truck, label: "Fast Delivery", description: "2-3 business days" },
  { icon: ShieldCheck, label: "2 Year Warranty", description: "Full coverage" },
  { icon: Lock, label: "Secure Checkout", description: "256-bit SSL" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-[1280px] px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:pb-28 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative z-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.08em] text-accent">
              New Arrivals
            </span>

            <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Power meets
              <br />
              precision
            </h1>

            <p className="mt-4 max-w-md text-base leading-relaxed text-text-secondary sm:text-lg">
              Discover premium electronics engineered for those who demand
              excellence. Curated technology that elevates your everyday.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={ROUTES.products}>
                <Button size="lg" className="h-11 rounded-[10px] px-6 text-sm font-medium">
                  Shop Now
                  <ArrowRight className="ml-1.5 size-4" />
                </Button>
              </Link>
              <Link href={ROUTES.products}>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-11 rounded-[10px] px-6 text-sm font-medium"
                >
                  Explore Products
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[320px] w-[320px] rounded-full bg-gradient-to-br from-accent/10 via-accent/5 to-transparent blur-3xl" />
            </div>

            <div className="relative mx-auto aspect-[4/3] max-w-md">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/8 to-transparent" />

              <div className="absolute right-0 top-4 w-64 rounded-xl border border-border bg-background/60 p-4 shadow-lg backdrop-blur-xl">
                <div className="mb-2 h-32 w-full rounded-lg bg-gradient-to-br from-accent/20 to-accent/5" />
                <div className="h-3 w-3/4 rounded-full bg-muted" />
                <div className="mt-2 h-3 w-1/2 rounded-full bg-muted" />
              </div>

              <div className="absolute bottom-4 left-0 w-56 rounded-xl border border-border bg-background/60 p-4 shadow-lg backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="size-7 rounded-full border-2 border-background bg-muted"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="h-3 w-20 rounded-full bg-muted" />
                    <div className="mt-1 h-2.5 w-14 rounded-full bg-muted" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-[10px] border border-border bg-surface p-4 transition-shadow hover:shadow-sm"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-4 text-text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center pb-6">
        <div className="flex flex-col items-center gap-1 text-text-tertiary">
          <span className="text-[10px] font-medium uppercase tracking-widest">
            Scroll
          </span>
          <div className="h-8 w-px bg-border" />
        </div>
      </div>
    </section>
  );
}
