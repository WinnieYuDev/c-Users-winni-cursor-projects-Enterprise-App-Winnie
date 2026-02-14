"use client";

import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL ?? "";
const convex = new ConvexReactClient(convexUrl);

// #region agent log
try {
  fetch("http://127.0.0.1:7242/ingest/b28c620f-1826-4804-86f9-e892a0cc3bef", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      location: "lib/convex.tsx:after-imports",
      message: "convex.tsx module load completed (imports + client init)",
      data: { hasWindow: typeof window !== "undefined" },
      timestamp: Date.now(),
      runId: "build",
      hypothesisId: "H1",
    }),
  }).catch(() => {});
} catch (_) {}
// #endregion

export function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // #region agent log
  try {
    fetch("http://127.0.0.1:7242/ingest/b28c620f-1826-4804-86f9-e892a0cc3bef", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "lib/convex.tsx:ConvexClientProvider-render",
        message: "ConvexClientProvider rendering",
        data: { hasWindow: typeof window !== "undefined" },
        timestamp: Date.now(),
        runId: "build",
        hypothesisId: "H2",
      }),
    }).catch(() => {});
  } catch (_) {}
  // #endregion
  return <ConvexAuthProvider client={convex}>{children}</ConvexAuthProvider>;
}
