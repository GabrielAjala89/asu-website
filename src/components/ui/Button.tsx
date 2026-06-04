import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  external?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:   "bg-[#F37021] text-white hover:bg-[#d65a14] border-transparent",
  secondary: "bg-[#1b3d6e] text-white hover:bg-[#122a4b] border-transparent",
  outline:   "bg-transparent text-[#1b3d6e] border-[#1b3d6e] hover:bg-[#1b3d6e] hover:text-white",
  ghost:     "bg-transparent text-white border-white hover:bg-white hover:text-[#1b3d6e]",
};

const sizes: Record<ButtonSize, string> = {
  sm:  "px-5 py-2 text-sm",
  md:  "px-7 py-3 text-sm",
  lg:  "px-9 py-4 text-base",
};

export function Button({
  children, variant = "primary", size = "md",
  href, onClick, className, type = "button", disabled, external,
}: ButtonProps) {
  const base = cn(
    "inline-flex items-center justify-center gap-2 rounded-full border font-semibold",
    "font-[family-name:var(--font-heading)] tracking-wide transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F37021] focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={base}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  );
}
