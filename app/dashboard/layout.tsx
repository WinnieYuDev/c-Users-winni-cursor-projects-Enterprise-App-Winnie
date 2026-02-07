"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/shipments", label: "Shipments" },
  { href: "/dashboard/excursions", label: "Excursions" },
  { href: "/dashboard/audit", label: "Audit Log" },
  { href: "/dashboard/policies", label: "Policies", adminOnly: true },
  { href: "/dashboard/data/upload", label: "Data Upload", supervisorOnly: true },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hasConvexUrl = typeof process.env.NEXT_PUBLIC_CONVEX_URL === "string" && process.env.NEXT_PUBLIC_CONVEX_URL.length > 0;

  if (!hasConvexUrl) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-6">
        <div className="rounded-xl border border-warning/50 bg-slate-800/50 p-6 max-w-md text-center">
          <h2 className="text-lg font-semibold text-white mb-2">Backend not connected</h2>
          <p className="text-slate-400 text-sm mb-4">
            Run <code className="bg-slate-700 px-1.5 py-0.5 rounded">npx convex dev</code> in this project first.
            It will create <code className="bg-slate-700 px-1.5 py-0.5 rounded">.env.local</code> with <code className="bg-slate-700 px-1.5 py-0.5 rounded">NEXT_PUBLIC_CONVEX_URL</code>, then start the app with <code className="bg-slate-700 px-1.5 py-0.5 rounded">npm run dev</code>.
          </p>
          <p className="text-slate-500 text-xs">You can run both in separate terminals.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary flex">
      <aside className="w-56 border-r border-slate-700 bg-slate-900/50 flex flex-col">
        <div className="p-4 border-b border-slate-700">
          <Link href="/dashboard" className="font-semibold text-white">
            Cold Chain Monitor
          </Link>
        </div>
        <nav className="p-2 flex-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-lg text-sm ${
                pathname === item.href
                  ? "bg-accent text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
