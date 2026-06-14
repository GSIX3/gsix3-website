import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant?: ButtonVariant;
  href: string;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-bright border border-transparent",
  secondary:
    "bg-white text-text border border-border hover:border-accent/40 hover:text-accent",
  ghost: "bg-transparent text-text-muted hover:text-text border border-transparent",
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  href,
  ...props
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
