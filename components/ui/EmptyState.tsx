"use client";

interface EmptyStateProps {
  title: string;
  message?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export function EmptyState({ title, message, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      {icon && (
        <div className="mb-4 text-slate-500 opacity-60">
          {icon}
        </div>
      )}
      <p className="section-title mb-1">{title}</p>
      {message && <p className="metadata max-w-sm mb-4">{message}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}

function BoxIcon() {
  return (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}

EmptyState.BoxIcon = BoxIcon;
