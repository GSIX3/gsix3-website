"use client";

import { useEffect, useRef, useState } from "react";
import { useHydratedReducedMotion } from "@/hooks/useHydratedReducedMotion";

type TypewriterTextProps = {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
};

export default function TypewriterText({
  text,
  speed = 42,
  className = "",
  onComplete,
}: TypewriterTextProps) {
  const reducedMotion = useHydratedReducedMotion();
  const onCompleteRef = useRef(onComplete);
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(text);
      setDone(true);
      onCompleteRef.current?.();
      return;
    }

    setDisplayed("");
    setDone(false);

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(interval);
        setDone(true);
        onCompleteRef.current?.();
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [text, speed, reducedMotion]);

  return (
    <span className={className}>
      {displayed}
      {!done && (
        <span
          className="typewriter-cursor ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.08em] bg-accent align-middle"
          aria-hidden="true"
        />
      )}
    </span>
  );
}
