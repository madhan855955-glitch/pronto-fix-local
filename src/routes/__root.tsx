import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { ThemeToggle } from "@/components/fixnear/theme-toggle";
import { FixNearProvider, useFixNear } from "@/lib/fixnear/store";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl">404</h1>
        <h2 className="mt-4 text-xl">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button className="mt-6" asChild>
          <Link to="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </Button>
          <Button variant="soft" asChild>
            <a href="/">Go home</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FixNear — Electricians & Plumbers Near You" },
      {
        name: "description",
        content:
          "FixNear connects you with trusted local electricians and plumbers. Compare ratings, request service and track the job.",
      },
      { property: "og:site_name", content: "FixNear" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Instrument+Sans:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const NAV = [
  { to: "/", label: "Home" },
  { to: "/electricians", label: "Electricians" },
  { to: "/plumbers", label: "Plumbers" },
  { to: "/my-requests", label: "My Requests" },
  { to: "/emergency", label: "Emergency" },
] as const;

function SiteHeader() {
  const { account, signOut } = useFixNear();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-primary font-display text-lg font-extrabold text-primary-foreground">
            F
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight">FixNear</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-accent text-accent-foreground" }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          {account ? (
            <>
              <Link
                to={
                  account.role === "admin"
                    ? "/dashboard/admin"
                    : account.role === "provider"
                      ? "/dashboard/provider"
                      : "/my-requests"
                }
                className="hidden rounded-lg px-3 py-2 text-sm font-semibold sm:block"
              >
                {account.name.split(" ")[0]}
              </Link>
              <Button variant="soft" size="sm" onClick={signOut}>
                Log out
              </Button>
            </>
          ) : (
            <Button size="sm" asChild>
              <Link to="/auth">Login / Sign up</Link>
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-border bg-background px-5 py-3 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-3 lg:px-8">
        <div>
          <span className="font-display text-lg font-extrabold">FixNear</span>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Verified local electricians and plumbers, with transparent pricing and live job
            tracking.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="eyebrow">Services</p>
          <Link to="/electricians" className="block text-muted-foreground hover:text-foreground">
            Electricians
          </Link>
          <Link to="/plumbers" className="block text-muted-foreground hover:text-foreground">
            Plumbers
          </Link>
          <Link to="/emergency" className="block text-muted-foreground hover:text-foreground">
            Emergency service
          </Link>
        </div>
        <div className="space-y-2 text-sm">
          <p className="eyebrow">For professionals</p>
          <Link
            to="/dashboard/provider"
            className="block text-muted-foreground hover:text-foreground"
          >
            Provider dashboard
          </Link>
          <Link to="/dashboard/admin" className="block text-muted-foreground hover:text-foreground">
            Admin dashboard
          </Link>
          <Link to="/auth" className="block text-muted-foreground hover:text-foreground">
            Register as a professional
          </Link>
        </div>
      </div>
      <div className="border-t border-border px-5 py-5 text-center text-xs text-muted-foreground lg:px-8">
        © {new Date().getFullYear()} FixNear. Find → Compare → Request → Track → Review.
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <FixNearProvider>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            {/* Required: nested routes render here. */}
            <Outlet />
          </main>
          <SiteFooter />
        </div>
        <Toaster />
      </FixNearProvider>
    </QueryClientProvider>
  );
}
