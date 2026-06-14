"use client";

import { useEffect, useRef } from "react";

type ShapeKind = "dot" | "ring" | "dash" | "cross" | "square";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  kind: ShapeKind;
  size: number;
  color: string;
};

const COLORS = [
  "#7a3f91",
  "#8b4da8",
  "#9b5fd4",
  "#b87eee",
  "#c59dd9",
  "#a78bcc",
  "#6b2d82",
];

const SHAPE_WEIGHTS: ShapeKind[] = [
  "dot",
  "dot",
  "dot",
  "ring",
  "ring",
  "dash",
  "dash",
  "cross",
  "square",
];

type EllipseLayout = {
  cx: number;
  cy: number;
  radiusX: number;
  radiusY: number;
};

function getLayout(width: number, height: number): EllipseLayout {
  return {
    cx: width * 0.5,
    cy: height * 0.46,
    radiusX: width * 0.495,
    radiusY: Math.max(height * 0.5, width * 0.36),
  };
}

function getNormR(x: number, y: number, layout: EllipseLayout): number {
  const dx = (x - layout.cx) / layout.radiusX;
  const dy = (y - layout.cy) / layout.radiusY;
  return Math.hypot(dx, dy);
}

function pickColor(): string {
  return COLORS[Math.floor(Math.random() * COLORS.length)]!;
}

function pickShape(): ShapeKind {
  return SHAPE_WEIGHTS[Math.floor(Math.random() * SHAPE_WEIGHTS.length)]!;
}

function shapeSize(kind: ShapeKind): number {
  switch (kind) {
    case "dot":
      return 1.4 + Math.random() * 1.6;
    case "ring":
      return 2.2 + Math.random() * 2.2;
    case "dash":
      return 3 + Math.random() * 4;
    case "cross":
      return 2 + Math.random() * 1.5;
    case "square":
      return 2 + Math.random() * 1.5;
    default:
      return 2;
  }
}

function randomVelocity(): { vx: number; vy: number } {
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.08 + Math.random() * 0.14;
  return {
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
  };
}

function createParticles(width: number, height: number): Particle[] {
  const layout = getLayout(width, height);
  const particles: Particle[] = [];
  const { cx, cy, radiusX, radiusY } = layout;
  const target = width < 768 ? 200 : 380;

  let attempts = 0;
  while (particles.length < target && attempts < target * 8) {
    attempts += 1;
    const angle = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * 0.94;
    const x = cx + Math.cos(angle) * radiusX * r;
    const y = cy + Math.sin(angle) * radiusY * r;

    if (getNormR(x, y, layout) > 0.98) continue;

    const kind = pickShape();
    const { vx, vy } = randomVelocity();
    particles.push({
      x,
      y,
      vx,
      vy,
      kind,
      size: shapeSize(kind),
      color: pickColor(),
    });
  }

  return particles;
}

function bounceOffEllipse(p: Particle, layout: EllipseLayout) {
  const dx = p.x - layout.cx;
  const dy = p.y - layout.cy;
  const normR = getNormR(p.x, p.y, layout);

  if (normR <= 1) return;

  const scale = 0.995 / normR;
  p.x = layout.cx + dx * scale;
  p.y = layout.cy + dy * scale;

  let nx = dx / (layout.radiusX * layout.radiusX);
  let ny = dy / (layout.radiusY * layout.radiusY);
  const nLen = Math.hypot(nx, ny) || 1;
  nx /= nLen;
  ny /= nLen;

  const dot = p.vx * nx + p.vy * ny;
  p.vx = (p.vx - 2 * dot * nx) * 0.992;
  p.vy = (p.vy - 2 * dot * ny) * 0.992;
}

function particleAlpha(normR: number): number {
  const edgeFade = normR > 0.78 ? 1 - (normR - 0.78) / 0.22 : 1;
  const midGlow = 0.22 + (1 - Math.abs(normR - 0.55)) * 0.18;
  return midGlow * edgeFade;
}

function drawParticle(
  ctx: CanvasRenderingContext2D,
  p: Particle,
  alpha: number,
) {
  const angle = Math.atan2(p.vy, p.vx);

  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.kind === "dash" ? angle + Math.PI / 2 : angle * 0.15);
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = p.color;
  ctx.fillStyle = p.color;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  switch (p.kind) {
    case "dot": {
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "ring": {
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.stroke();
      break;
    }
    case "dash": {
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -p.size / 2);
      ctx.lineTo(0, p.size / 2);
      ctx.stroke();
      break;
    }
    case "cross": {
      ctx.lineWidth = 0.9;
      const s = p.size * 0.55;
      ctx.beginPath();
      ctx.moveTo(-s, 0);
      ctx.lineTo(s, 0);
      ctx.moveTo(0, -s);
      ctx.lineTo(0, s);
      ctx.stroke();
      break;
    }
    case "square": {
      ctx.lineWidth = 0.9;
      const s = p.size * 0.5;
      ctx.strokeRect(-s, -s, s * 2, s * 2);
      break;
    }
  }

  ctx.restore();
}

type ParticleFieldProps = {
  className?: string;
};

export default function ParticleField({ className = "" }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const frameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const layoutRef = useRef<EllipseLayout>({ cx: 0, cy: 0, radiusX: 0, radiusY: 0 });
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      sizeRef.current = { width: rect.width, height: rect.height, dpr };
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      layoutRef.current = getLayout(rect.width, rect.height);
      particlesRef.current = createParticles(rect.width, rect.height);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inside) {
        mouseRef.current.active = false;
        return;
      }

      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const onLeave = () => {
      mouseRef.current.active = false;
    };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      const { width, height } = sizeRef.current;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const layout = layoutRef.current;

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (!reducedMotion) {
          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            const strikeRadius = 90;

            if (dist < strikeRadius && dist > 0) {
              const power = ((strikeRadius - dist) / strikeRadius) * 0.35;
              p.vx += (dx / dist) * power;
              p.vy += (dy / dist) * power;

              const maxSpeed = 0.38;
              const speed = Math.hypot(p.vx, p.vy);
              if (speed > maxSpeed) {
                p.vx = (p.vx / speed) * maxSpeed;
                p.vy = (p.vy / speed) * maxSpeed;
              }
            }
          }

          p.x += p.vx;
          p.y += p.vy;
          bounceOffEllipse(p, layout);
        }

        const normR = getNormR(p.x, p.y, layout);
        if (normR > 1.02) continue;

        drawParticle(ctx, p, particleAlpha(normR));
      }

      ctx.globalAlpha = 1;
      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      observer.disconnect();
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="pointer-events-none h-full w-full" />
    </div>
  );
}
