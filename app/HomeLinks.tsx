"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

type Variant = "hero" | "footer" | "nav";

export function HomeLinks({ variant = "nav" }: { variant?: Variant }) {
  const me = useQuery(api.users.getMe);

  if (variant === "nav") {
    return (
      <div className="flex items-center gap-4">
        {me == null ? (
          <Link
            href="/login"
            className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
          >
            Log in
          </Link>
        ) : (
          <Link
            href="/dashboard"
            className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
          >
            Dashboard
          </Link>
        )}
        {me == null && (
          <Link
            href="/register"
            className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors"
          >
            Sign up
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Link
        href={me != null ? "/dashboard" : "/login"}
        className="px-6 py-3 rounded-lg bg-accent text-white font-semibold hover:bg-accent/90 transition-colors"
      >
        {me != null ? "View dashboard" : "View demo"}
      </Link>
      <Link
        href="/register"
        className="px-6 py-3 rounded-lg border-2 border-slate-600 text-slate-300 font-medium hover:border-slate-500 hover:bg-slate-700/50 transition-colors"
      >
        Request demo
      </Link>
    </div>
  );
}
