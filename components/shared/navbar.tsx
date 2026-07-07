"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ROUTES, NAV_LINKS, SITE } from "@/lib/constants";
import { useCartStore, selectCartCount } from "@/stores/cart-store";

export function Navbar() {
  const pathname = usePathname();
  const totalItems = useCartStore(selectCartCount);

  function isActive(href: string) {
    if (href === ROUTES.home) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-2xl supports-backdrop-filter:bg-background/60">
      <nav className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-4 sm:px-6">
        <Link
          href={ROUTES.home}
          className="text-lg font-semibold tracking-tight transition-opacity hover:opacity-80"
        >
          {SITE.name}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`
                relative text-sm transition-colors
                ${isActive(link.href)
                  ? "text-foreground font-medium after:absolute after:-bottom-4.5 after:left-0 after:h-0.5 after:w-full after:bg-foreground"
                  : "text-text-secondary hover:text-foreground"
                }
              `}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <Link href={ROUTES.products} aria-label="Search products">
            <Button variant="ghost" size="icon">
              <Search className="size-5" />
            </Button>
          </Link>

          <Link href={ROUTES.cart} aria-label="Open cart">
            <Button variant="ghost" size="icon">
              <span className="relative">
                <ShoppingCart className="size-5" />
                {totalItems > 0 && (
                  <Badge
                    variant="default"
                    className="absolute -top-2.5 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-medium leading-none"
                  >
                    {totalItems}
                  </Badge>
                )}
              </span>
            </Button>
          </Link>

          <Link href={ROUTES.login} aria-label="User account">
            <Button variant="ghost" size="icon">
              <User className="size-5" />
            </Button>
          </Link>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>{SITE.name}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 px-4 pt-8">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-base font-medium transition-colors ${
                        isActive(link.href)
                          ? "text-foreground"
                          : "text-text-secondary hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href={ROUTES.cart}
                    className="flex items-center gap-2 text-base font-medium text-text-secondary transition-colors hover:text-foreground"
                  >
                    <ShoppingCart className="size-4" />
                    Cart
                    {totalItems > 0 && (
                      <Badge variant="default" className="rounded-full">
                        {totalItems}
                      </Badge>
                    )}
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
