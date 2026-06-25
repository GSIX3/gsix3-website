"use client";

type GlowingEffectProps = {
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  proximity?: number;
  inactiveZone?: number;
};

export function GlowingEffect({
  spread = 190,
  glow = true,
  disabled = false,
}: GlowingEffectProps) {
  if (disabled || !glow) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit] p-[3px] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      style={{
        background: `radial-gradient(${spread}px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(216, 180, 254, 1), rgba(168, 85, 247, 0.95) 26%, rgba(126, 34, 206, 0.6) 55%, transparent 82%)`,
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        mask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
      }}
    />
  );
}
