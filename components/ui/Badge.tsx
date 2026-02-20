"use client";

type BadgeVariant = "normal" | "success" | "warning" | "critical" | "offline";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  normal: "bg-slate-600/30 text-slate-300 border-slate-500/40",
  success: "bg-success/20 text-emerald-400 border-success/40",
  warning: "bg-warning/20 text-amber-400 border-warning/40",
  critical: "bg-danger/20 text-red-400 border-danger/40",
  offline: "bg-slate-500/20 text-cool-gray border-slate-500/40",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 text-[10px]",
  md: "px-2 py-0.5 text-xs",
};

export function Badge({
  variant = "normal",
  size = "md",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
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
