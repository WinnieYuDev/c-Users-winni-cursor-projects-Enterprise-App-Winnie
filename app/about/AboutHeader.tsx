"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function AboutHeader() {
  const me = useQuery(api.users.getMe);

  return (
    <header className="border-b border-slate-700 bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-semibold text-white">
          <Image src="/logo.svg" alt="" width={36} height={36} />
          <span>
            <span className="block leading-tight">ThermoGuard</span>
            <span className="block text-xs font-normal text-slate-400 tracking-wide">
              Cold Chain Compliance. Verified.
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">
            Home
          </Link>
          {me == null && (
            <Link href="/login" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">
              Sign in
            </Link>
          )}
          {me != null && (
            <Link href="/dashboard" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">
              Dashboard
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
