import Link from "next/link";
import type { Metadata } from "next";
import {
  Lightbulb,
  ShieldCheck,
  HeartHandshake,
  Package,
  Users,
  Globe,
  Award,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE, ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${SITE.name}'s story, mission, and commitment to premium electronics.`,
  openGraph: {
    title: `About ${SITE.name}`,
    description: `Discover what drives ${SITE.name} — innovation, quality, and customer-first values.`,
  },
};

const stats = [
  { icon: Package, value: "10,000+", label: "Products Delivered" },
  { icon: Users, value: "5,000+", label: "Happy Customers" },
  { icon: Globe, value: "30+", label: "Countries Reached" },
  { icon: Award, value: "99.9%", label: "Satisfaction Rate" },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We stay ahead of the curve, curating only the most cutting-edge electronics that push the boundaries of what's possible.",
  },
  {
    icon: ShieldCheck,
    title: "Quality",
    description:
      "Every product in our catalog is rigorously vetted for performance, durability, and reliability. We stand by what we sell.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    description:
      "Your satisfaction drives everything we do. From seamless shopping to dedicated support, we put you at the center.",
  },
];

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@voltura.com",
    href: "mailto:hello@voltura.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "742 Evergreen Terrace, San Francisco, CA 94102",
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero />
      <BrandStory />
      <MissionVision />
      <CoreValues />
      <Statistics />
      <Contact />
      <CTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-surface px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,oklch(0.55_0.22_260/0.08),transparent_50%)]" />
      <div className="mx-auto max-w-[1280px] text-center">
        <p className="mb-3 text-sm font-medium text-accent uppercase tracking-wider">
          About {SITE.name}
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Power meets precision
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
          We believe great technology should be accessible, reliable, and
          beautifully designed. {SITE.name} was built to make that a reality.
        </p>
      </div>
    </section>
  );
}

function BrandStory() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our Story
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary sm:text-base">
              <p>
                {SITE.name} started with a simple observation: finding premium
                electronics shouldn&apos;t be a compromise between quality and
                convenience. In 2020, our founders set out to build a
                destination where every product earns its place.
              </p>
              <p>
                What began as a small selection of carefully chosen gadgets has
                grown into a curated marketplace spanning audio, wearables,
                smart home, and beyond — each item chosen for its design,
                performance, and lasting value.
              </p>
              <p>
                Today, we serve thousands of customers across 30+ countries, and
                we&apos;re just getting started.
              </p>
            </div>
          </div>
          <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 p-8">
            <div className="text-center">
              <p className="text-7xl font-bold tracking-tight text-accent/20 sm:text-8xl">
                {SITE.name}
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                Est. 2020
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionVision() {
  return (
    <section className="bg-surface px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-border bg-background p-8">
            <h3 className="mb-3 text-xl font-semibold">Our Mission</h3>
            <p className="text-sm leading-relaxed text-text-secondary">
              To empower people with technology that enhances their daily lives
              — delivering premium electronics that are thoughtfully curated,
              fairly priced, and built to last.
            </p>
          </article>
          <article className="rounded-2xl border border-border bg-background p-8">
            <h3 className="mb-3 text-xl font-semibold">Our Vision</h3>
            <p className="text-sm leading-relaxed text-text-secondary">
              A world where everyone has access to exceptional technology
              experiences, and where quality and trust are the default — not the
              exception.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function CoreValues() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What we stand for
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            The principles that guide every decision we make.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <article
                key={value.title}
                className="group rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="size-5" />
                </div>
                <h3 className="mb-2 font-semibold">{value.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {value.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Statistics() {
  return (
    <section className="bg-surface px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-background p-6 text-center"
              >
                <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="size-5" />
                </div>
                <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                <p className="mt-0.5 text-sm text-text-secondary">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28" id="contact">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get in touch
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Have a question or just want to say hi? We&apos;d love to hear from
            you.
          </p>
        </div>
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-3">
          {contactDetails.map((detail) => {
            const Icon = detail.icon;
            const Wrapper = detail.href ? "a" : "div";
            const wrapperProps = detail.href
              ? { href: detail.href, className: "block" }
              : {};

            return (
              <div
                key={detail.label}
                className="rounded-2xl border border-border bg-surface p-6 text-center"
              >
                <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="size-5" />
                </div>
                <h3 className="mb-1 text-sm font-semibold">{detail.label}</h3>
                <Wrapper {...wrapperProps}>
                  <p
                    className={
                      detail.href
                        ? "text-sm text-text-secondary transition-colors hover:text-accent"
                        : "text-sm text-text-secondary"
                    }
                  >
                    {detail.value}
                  </p>
                </Wrapper>
              </div>
            );
          })}
        </div>
        <div className="mt-8 flex justify-center gap-4">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex size-9 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="size-4" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-4 pb-24 sm:px-6 sm:pb-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent to-accent/80 px-8 py-16 text-center text-white sm:px-16 sm:py-24">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,white/15%,transparent_60%)]" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to find your next favorite device?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
            Browse our curated collection of premium electronics — each product
            selected for quality, design, and performance.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={ROUTES.products}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 gap-2 rounded-[10px] bg-white text-accent text-sm shadow-lg hover:bg-white/90"
              )}
            >
              Shop Now
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const socialLinks = [
  { label: "Twitter", href: "#", icon: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )},
  {
    label: "GitHub",
    href: "#",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];
