"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";

const nav = [
  { href: "/dashboard/about", label: "About", icon: "about" },
  { href: "/dashboard", label: "Overview", icon: "overview" },
  { href: "/dashboard/shipments", label: "Shipments", icon: "shipments" },
  { href: "/dashboard/excursions", label: "Excursions", icon: "excursions" },
  { href: "/dashboard/audit", label: "Audit Log", icon: "audit" },
  { href: "/dashboard/policies", label: "Policies", adminOnly: true, icon: "policies" },
  { href: "/dashboard/data/upload", label: "Data Upload", supervisorOnly: true, icon: "upload" },
];

const icons: Record<string, React.ReactNode> = {
  about: (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  overview: (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  shipments: (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  excursions: (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  audit: (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  policies: (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  upload: (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  ),
};

function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname?.replace(/^\/dashboard\/?/, "").split("/").filter(Boolean) ?? [];
  const breadcrumbs = [{ label: "Dashboard", href: "/dashboard" }];
  let acc = "/dashboard";
  for (const seg of segments) {
    acc += `/${seg}`;
    const label = seg === "about" ? "About" : seg === "data" ? "Data" : seg === "upload" ? "Upload" : seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " ");
    breadcrumbs.push({ label: /^[a-z0-9]+$/i.test(seg) && seg.length > 10 ? "Detail" : label, href: acc });
  }
  return (
    <nav className="flex items-center gap-2 text-sm">
      {breadcrumbs.map((b, i) => (
        <span key={b.href} className="flex items-center gap-2">
          {i > 0 && <span className="text-slate-500">/</span>}
          {i === breadcrumbs.length - 1 ? (
            <span className="text-white font-medium">{b.label}</span>
          ) : (
            <Link href={b.href} className="text-cool-gray hover:text-white transition-colors">
              {b.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { signOut } = useAuthActions();
  const hasConvexUrl = typeof process.env.NEXT_PUBLIC_CONVEX_URL === "string" && process.env.NEXT_PUBLIC_CONVEX_URL.length > 0;
  const me = useQuery(api.users.getMe);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [profileOpen]);

  async function handleLogout() {
    setProfileOpen(false);
    await signOut();
    router.push("/");
  }

  if (!hasConvexUrl) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-6">
        <div className="rounded-md border border-warning/50 bg-slate-blue/50 p-6 max-w-md text-center shadow-card">
          <h2 className="section-title mb-2">Backend not connected</h2>
          <p className="body-text mb-4">
            Run <code className="bg-slate-blue px-1.5 py-0.5 rounded-sm">npx convex dev</code> in this project first.
            It will create <code className="bg-slate-blue px-1.5 py-0.5 rounded-sm">.env.local</code> with <code className="bg-slate-blue px-1.5 py-0.5 rounded-sm">NEXT_PUBLIC_CONVEX_URL</code>, then start the app with <code className="bg-slate-blue px-1.5 py-0.5 rounded-sm">npm run dev</code>.
          </p>
          <p className="metadata">You can run both in separate terminals.</p>
        </div>
      </div>
    );
  }

  if (me === undefined) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <p className="text-cool-gray">Loading…</p>
      </div>
    );
  }

  if (me === null) {
    router.replace("/login");
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <p className="text-cool-gray">Redirecting to sign in…</p>
      </div>
    );
  }

  const isAdmin = me.role === "admin";
  const isSupervisor = me.role === "supervisor" || isAdmin;

  return (
    <div className="min-h-screen bg-primary flex">
      <aside
        className={`flex flex-col border-r border-slate-600 bg-slate-blue transition-all duration-200 ${
          sidebarCollapsed ? "w-[4.5rem]" : "w-56"
        }`}
      >
        <div className="p-4 border-b border-slate-600 flex items-center justify-between gap-2 min-h-[3.5rem]">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-white min-w-0">
            <Image src="/logo.svg" alt="" width={28} height={28} className="flex-shrink-0" />
            {!sidebarCollapsed && <span className="truncate">ThermoGuard</span>}
          </Link>
          <button
            type="button"
            onClick={() => setSidebarCollapsed((c) => !c)}
            className="p-1.5 rounded-md text-cool-gray hover:text-white hover:bg-slate-600/50 transition-colors flex-shrink-0"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {sidebarCollapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 12h14" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              )}
            </svg>
          </button>
        </div>
        <nav className="p-2 flex-1">
          {nav.map((item) => {
            if (item.adminOnly && !isAdmin) return null;
            if (item.supervisorOnly && !isSupervisor) return null;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={sidebarCollapsed ? item.label : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                  isActive
                    ? "bg-accent text-white"
                    : "text-cool-gray hover:text-white hover:bg-slate-600/50"
                } ${sidebarCollapsed ? "justify-center" : ""}`}
              >
                {icons[item.icon] ?? null}
                {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-slate-600 bg-slate-blue/50 flex items-center justify-between px-6 flex-shrink-0">
          <Breadcrumbs />
          <div className="flex items-center gap-4">
            <input
              type="search"
              placeholder="Search..."
              className="hidden sm:block h-9 w-48 rounded-md border border-slate-600 bg-primary px-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
              readOnly
            />
            <button
              type="button"
              className="relative p-2 rounded-md text-cool-gray hover:text-white hover:bg-slate-600/50 transition-colors"
              aria-label="Notifications"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="relative pl-2 border-l border-slate-600" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen((o) => !o)}
                className="flex items-center gap-2 rounded-md py-1 pr-1 text-left hover:bg-slate-600/50 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
                aria-expanded={profileOpen}
                aria-haspopup="true"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-medium flex-shrink-0">
                  {(me.name ?? me.email ?? "U").charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-white truncate max-w-[120px] hidden md:inline">
                  {me.name ?? me.email ?? "User"}
                </span>
                <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full mt-1 py-1 w-40 rounded-md border border-slate-600 bg-slate-800 shadow-dropdown z-50">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
