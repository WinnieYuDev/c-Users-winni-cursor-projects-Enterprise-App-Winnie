"use client";

import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:bg-accent/90 focus:ring-accent border-transparent",
  secondary: "bg-slate-blue border border-slate-600 text-cool-gray hover:bg-slate-600/50 focus:ring-cool-gray",
  ghost: "bg-transparent text-cool-gray hover:bg-slate-blue/50 focus:ring-cool-gray",
  destructive: "bg-danger/90 text-white hover:bg-danger focus:ring-danger border-transparent",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs rounded-sm",
  md: "h-10 px-4 text-sm rounded-md",
  lg: "h-11 px-6 text-base rounded-md",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          inline-flex items-center justify-center font-medium transition-colors
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantClasses[variant]} ${sizeClasses[size]} ${className}
        `}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
