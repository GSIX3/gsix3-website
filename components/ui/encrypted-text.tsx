"use client";

import { useEffect, useMemo, useState } from "react";
import { useHydratedReducedMotion } from "@/hooks/useHydratedReducedMotion";

type EncryptedTextProps = {
  text: string;
  encryptedClassName?: string;
  revealedClassName?: string;
  revealDelayMs?: number;
  startDelayMs?: number;
  characters?: string;
};

const DEFAULT_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function EncryptedText({
  text,
  encryptedClassName = "",
  revealedClassName = "",
  revealDelayMs = 50,
  startDelayMs = 0,
  characters = DEFAULT_CHARACTERS,
}: EncryptedTextProps) {
  const reducedMotion = useHydratedReducedMotion();
  const [revealedCount, setRevealedCount] = useState(0);
  const [scrambleTick, setScrambleTick] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setRevealedCount(text.length);
      return;
    }

    setRevealedCount(0);
    setScrambleTick(0);

    let count = 0;
    let timeout: number;

    const revealNextCharacter = () => {
      count += 1;
      setScrambleTick((tick) => tick + 1);
      setRevealedCount(count);

      if (count < text.length) {
        timeout = window.setTimeout(revealNextCharacter, revealDelayMs);
      }
    };

    timeout = window.setTimeout(revealNextCharacter, startDelayMs);

    return () => window.clearTimeout(timeout);
  }, [reducedMotion, revealDelayMs, startDelayMs, text]);

  const encryptedText = useMemo(() => {
    return text.split("").map((char, index) => {
      if (char === " " || index < revealedCount) {
        return char;
      }

      const randomIndex = (index + scrambleTick) % characters.length;
      return characters[randomIndex];
    });
  }, [characters, revealedCount, scrambleTick, text]);

  return (
    <span aria-label={text}>
      {encryptedText.map((char, index) => (
        <span
          aria-hidden="true"
          className={index < revealedCount ? revealedClassName : encryptedClassName}
          key={index}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
