"use client";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  variant?: "default" | "success" | "warning" | "danger";
  icon?: React.ReactNode;
  trend?: string;
}

const variantClasses = {
  default: "border-slate-600 border-l-slate-500",
  success: "border-success/40 border-l-success bg-success/5",
  warning: "border-warning/40 border-l-warning bg-warning/5",
  danger: "border-danger/40 border-l-danger bg-danger/5",
};

export function KPICard({
  title,
  value,
  subtitle,
  variant = "default",
  icon,
  trend,
}: KPICardProps) {
  return (
    <div
      className={`rounded-md border-l-4 border p-6 shadow-card transition-colors ${variantClasses[variant]}`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="table-label">{title}</p>
        {icon && <span className="text-slate-500 flex-shrink-0">{icon}</span>}
      </div>
      <p className="mt-2 metric-value">{value}</p>
      {trend && <p className="mt-1 text-xs text-slate-400">{trend}</p>}
      {subtitle && <p className="mt-1 metadata">{subtitle}</p>}
    </div>
  );
}
