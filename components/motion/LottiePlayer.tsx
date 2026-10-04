"use client";

import { useEffect, useRef } from "react";
import { useHydratedReducedMotion } from "@/hooks/useHydratedReducedMotion";

type LottiePlayerProps = {
  src: string;
  className?: string;
  ariaLabel?: string;
};

// Loads a Lottie JSON from /public and plays it on loop. lottie-web touches the
// DOM on import, so it's loaded lazily on the client. Reduced motion shows the
// final frame as a still image instead of animating.
export default function LottiePlayer({ src, className = "", ariaLabel }: LottiePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useHydratedReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let destroy: (() => void) | undefined;

    import("lottie-web/build/player/lottie_light").then(({ default: lottie }) => {
      if (cancelled) return;
      const animation = lottie.loadAnimation({
        container,
        renderer: "svg",
        loop: !reducedMotion,
        autoplay: !reducedMotion,
        path: src,
        rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
      });
      if (reducedMotion) {
        animation.addEventListener("DOMLoaded", () => {
          animation.goToAndStop(animation.totalFrames - 1, true);
        });
      }
      destroy = () => animation.destroy();
    });

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, [src, reducedMotion]);

  return <div ref={containerRef} className={className} role="img" aria-label={ariaLabel} />;
}
