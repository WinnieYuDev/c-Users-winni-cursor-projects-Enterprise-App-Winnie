"use client";

type StatusVariant = "active" | "warning" | "error" | "neutral";

interface StatusIndicatorProps {
  variant?: StatusVariant;
  label: string;
  className?: string;
}

const dotClasses: Record<StatusVariant, string> = {
  active: "bg-emerald-500 ring-emerald-500/40",
  warning: "bg-amber-500 ring-amber-500/40",
  error: "bg-red-500 ring-red-500/40",
  neutral: "bg-slate-500 ring-slate-500/40",
};

export function StatusIndicator({
  variant = "neutral",
  label,
  className = "",
}: StatusIndicatorProps) {
  const pulse = variant === "active";
  return (
    <span className={`inline-flex items-center gap-2 text-sm text-slate-400 ${className}`}>
      <span
        className={`h-2 w-2 rounded-full ${dotClasses[variant]} ${pulse ? "animate-pulse ring-2 ring-offset-2 ring-offset-transparent" : ""}`}
        aria-hidden
      />
      {label}
    </span>
  );
}
