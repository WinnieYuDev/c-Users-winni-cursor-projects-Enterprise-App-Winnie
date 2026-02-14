"use client";

import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, className = "", id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-cool-gray mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            h-10 w-full rounded-md border bg-slate-blue px-3 py-2 text-sm text-white
            placeholder-slate-500
            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? "border-danger" : "border-slate-600"}
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";
