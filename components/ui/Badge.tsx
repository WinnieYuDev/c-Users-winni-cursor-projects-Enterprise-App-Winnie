"use client";

type BadgeVariant = "normal" | "warning" | "critical" | "offline";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  normal: "bg-success/15 text-success border-success/30",
  warning: "bg-warning/15 text-warning border-warning/30",
  critical: "bg-danger/15 text-danger border-danger/30",
  offline: "bg-slate-500/15 text-cool-gray border-slate-500/30",
};

export function Badge({ variant = "normal", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function severityToBadgeVariant(severity: string | undefined): BadgeVariant {
  if (!severity) return "offline";
  switch (severity) {
    case "critical":
    case "high":
      return "critical";
    case "medium":
      return "warning";
    case "low":
      return "normal";
    default:
      return "offline";
  }
}
