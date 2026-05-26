import { useEffect, type ReactNode } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { BookOpenIcon, Squares2X2Icon, SwatchIcon } from "@heroicons/react/24/outline";
import { cn } from "@palashjain/touchable";
import { DocsAppearanceControls } from "./DocsAppearanceControls";
import { DocsBrandLogo } from "./DocsBrandLogo";
import { applyDefaultPrimary } from "../../lib/demoPrimary";

const NAV = [
  { to: "/", label: "Components", end: true, icon: Squares2X2Icon },
  { to: "/docs/tokens", label: "Tokens", end: false, icon: SwatchIcon },
  { to: "/docs/how-to-use", label: "How to use", end: false, icon: BookOpenIcon },
] as const;

function navItemClass(isActive: boolean) {
  return cn(
    "relative flex h-10 w-full shrink-0 items-center gap-0 overflow-hidden rounded-lg text-base whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] md:h-8 md:text-sm",
    isActive
      ? "bg-[hsl(var(--muted-active))] font-medium"
      : "hover:bg-[hsl(var(--muted-hover))]",
  );
}

export function DocsShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    applyDefaultPrimary();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="min-h-dvh bg-[hsl(var(--background))]">
      <aside
        aria-label="Sidebar"
        className="fixed inset-y-0 left-0 z-30 hidden w-56 shrink-0 flex-col overflow-x-hidden overflow-y-auto pl-3.5 lg:flex"
      >
        <div className="flex min-h-full flex-col gap-3 py-3.5 pr-3.5">
          <div className="flex items-start justify-between gap-2">
            <Link
              to="/"
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-[hsl(var(--muted-hover))]"
              aria-label="Touchable home"
            >
              <span className="font-display text-xl font-semibold leading-none text-[var(--fg-primary)]">T</span>
            </Link>
            <DocsAppearanceControls />
          </div>

          <nav aria-label="Main menu" className="flex flex-col gap-1">
            <p className="text-muted-foreground flex h-9 items-center px-2 text-base md:h-8 md:text-sm">
              Docs
            </p>
            {NAV.map(({ to, label, end, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => navItemClass(isActive)}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="min-w-0 truncate">{label}</span>
              </NavLink>
            ))}
          </nav>

          <footer className="mt-auto border-t border-[hsl(var(--border-subtle))] pt-4">
            <Link
              to="/docs/designer"
              className="flex items-center gap-3 rounded-lg p-1 transition-colors hover:bg-[hsl(var(--muted-hover))]"
            >
              <DocsBrandLogo className="h-8 w-8 shrink-0" alt="" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[var(--fg-primary)]">Palash Jain</p>
                <p className="text-xs text-[var(--fg-tertiary)]">Designer</p>
              </div>
            </Link>
          </footer>
        </div>
      </aside>

      {/* Mobile: top bar when sidebar is hidden on small screens */}
      <div className="sticky top-0 z-20 border-b border-[hsl(var(--border-subtle))] bg-[hsl(var(--background))] pl-0 lg:hidden">
        <div className="flex h-14 items-center gap-3 px-4">
          <Link
            to="/"
            className="min-w-0 shrink font-display text-lg font-semibold text-[var(--fg-primary)]"
          >
            Touchable
          </Link>
          <div className="ml-auto shrink-0">
            <DocsAppearanceControls />
          </div>
        </div>
        <nav
          aria-label="Main menu"
          className="flex gap-1 overflow-x-auto px-2 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {NAV.map(({ to, label, end, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => cn(navItemClass(isActive), "w-auto px-3")}
            >
              <Icon className="size-4 shrink-0" aria-hidden />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <main className="flex min-w-0 flex-1 flex-col overflow-x-clip lg:pl-56">
        <div className="mx-auto w-full max-w-3xl min-w-0 flex-1 px-4 py-8 lg:px-8 lg:py-10">
          {children}
        </div>
        <footer className="border-t border-[hsl(var(--border-subtle))] px-4 py-8 lg:hidden">
          <Link
            to="/docs/designer"
            className="mx-auto flex max-w-3xl items-center gap-3 rounded-lg transition-colors hover:bg-[hsl(var(--muted-hover))] active:bg-[hsl(var(--muted-active))]"
          >
            <DocsBrandLogo className="h-8 w-8 shrink-0" alt="" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-[var(--fg-primary)]">Palash Jain</p>
              <p className="text-xs text-[var(--fg-tertiary)]">Designer</p>
            </div>
          </Link>
        </footer>
      </main>
    </div>
  );
}
