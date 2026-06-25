import { type ReactNode } from "react";

type GradientHeadingProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "lg" | "xl" | "xxl" | "hero";
};

const sizes = {
  md: "text-2xl md:text-3xl",
  lg: "text-3xl md:text-4xl",
  xl: "text-4xl md:text-5xl",
  xxl: "text-6xl md:text-8xl",
  hero: "text-[clamp(1.5rem,7vw,3rem)] md:text-5xl lg:text-6xl xl:text-7xl",
};

const variants = {
  primary: "from-slate-950 via-slate-800 to-slate-950",
  secondary: "from-slate-700 via-slate-950 to-slate-700",
};

export function GradientHeading({
  children,
  variant = "primary",
  size = "lg",
}: GradientHeadingProps) {
  return (
    <h2
      className={`font-heading bg-gradient-to-r ${variants[variant]} bg-clip-text text-center font-bold leading-[1.1] tracking-tight text-transparent ${sizes[size]}`}
    >
      {children}
    </h2>
  );
}
