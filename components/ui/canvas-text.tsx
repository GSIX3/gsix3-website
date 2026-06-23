"use client";

import { useEffect, useRef } from "react";

type CanvasTextProps = {
  text: string;
  backgroundClassName?: string;
  colors?: string[];
  lineGap?: number;
  animationDuration?: number;
};

const defaultColors = [
  "rgba(0, 153, 255, 1)",
  "rgba(0, 153, 255, 0.8)",
  "rgba(0, 153, 255, 0.6)",
  "rgba(0, 153, 255, 0.4)",
  "rgba(0, 153, 255, 0.2)",
];

function parseRgba(color: string) {
  const values = color.match(/[\d.]+/g)?.map(Number) ?? [0, 153, 255, 1];
  return {
    r: values[0] ?? 0,
    g: values[1] ?? 153,
    b: values[2] ?? 255,
    a: values[3] ?? 1,
  };
}

function mixColor(from: string, to: string, amount: number) {
  const start = parseRgba(from);
  const end = parseRgba(to);
  const mix = (a: number, b: number) => a + (b - a) * amount;

  return `rgba(${mix(start.r, end.r)}, ${mix(start.g, end.g)}, ${mix(
    start.b,
    end.b,
  )}, ${mix(start.a, end.a)})`;
}

export function CanvasText({
  text,
  backgroundClassName: _backgroundClassName = "bg-blue-600",
  colors = defaultColors,
  lineGap = 4,
  animationDuration = 20,
}: CanvasTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const activeColorsRef = useRef(colors);
  const previousColorsRef = useRef(colors);
  const targetColorsRef = useRef(colors);
  const transitionStartRef = useRef(performance.now());

  useEffect(() => {
    previousColorsRef.current = activeColorsRef.current;
    targetColorsRef.current = colors;
    transitionStartRef.current = performance.now();
  }, [colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const textElement = textRef.current;
    if (!canvas || !textElement) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    let startTime = performance.now();

    const resize = () => {
      const rect = textElement.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;

      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      context.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const draw = (time: number) => {
      const rect = textElement.getBoundingClientRect();
      const style = window.getComputedStyle(textElement);
      const progress =
        ((time - startTime) / (animationDuration * 1000)) % 1;
      const transitionProgress = Math.min(
        1,
        (time - transitionStartRef.current) / 1500,
      );
      const activeColors = targetColorsRef.current.map((color, index) =>
        mixColor(
          previousColorsRef.current[index % previousColorsRef.current.length],
          color,
          transitionProgress,
        ),
      );
      activeColorsRef.current = activeColors;
      const offset = progress * lineGap * activeColors.length * 2;

      context.clearRect(0, 0, rect.width, rect.height);

      const gradient = context.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, activeColors[0]);
      gradient.addColorStop(0.55, activeColors[Math.min(2, activeColors.length - 1)]);
      gradient.addColorStop(1, activeColors[0]);

      context.fillStyle = gradient;
      context.fillRect(0, 0, rect.width, rect.height);

      for (let y = -offset; y < rect.height + lineGap; y += lineGap * 2) {
        const colorIndex =
          Math.abs(Math.floor((y + offset) / lineGap)) % activeColors.length;
        context.fillStyle = activeColors[colorIndex];
        context.fillRect(0, y, rect.width, 2);
      }

      context.globalCompositeOperation = "destination-in";
      context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      context.textAlign = "left";
      context.textBaseline = "middle";
      context.fillStyle = "#000";
      context.fillText(text, 0, rect.height / 2);
      context.globalCompositeOperation = "source-over";

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(textElement);
    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      startTime = 0;
    };
  }, [animationDuration, lineGap, text]);

  return (
    <span className="relative inline-block font-inherit text-[1em] leading-[inherit] align-baseline">
      <canvas
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-80"
        ref={canvasRef}
      />
      <span
        className="whitespace-nowrap font-inherit text-[1em] leading-[inherit]"
        ref={textRef}
        style={{ color: colors[0] }}
      >
        {text}
      </span>
    </span>
  );
}
