"use client";

import { Card } from "@/components/ui/Card";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  variant?: "default" | "success" | "warning" | "danger";
}

const variantClasses = {
  default: "border-slate-600",
  success: "border-success/40 bg-success/5",
  warning: "border-warning/40 bg-warning/5",
  danger: "border-danger/40 bg-danger/5",
};

export function KPICard({ title, value, subtitle, variant = "default" }: KPICardProps) {
  return (
    <div
      className={`rounded-md border p-6 shadow-card transition-colors ${variantClasses[variant]}`}
    >
      <p className="table-label">{title}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-white">{value}</p>
      {subtitle && <p className="mt-1 metadata">{subtitle}</p>}
    </div>
  );
}
