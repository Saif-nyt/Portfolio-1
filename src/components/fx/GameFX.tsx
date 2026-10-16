"use client";

import { useEffect, useRef } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  warm: boolean;
}

const TRAIL_COLOR = { inner: "rgba(180, 255, 250, 0.95)", outer: "101, 232, 224" };
const BURST_COLOR = { inner: "rgba(255, 244, 200, 0.95)", outer: "255, 214, 120" };

function makeSprite(inner: string, outer: string): HTMLCanvasElement | null {
  const size = 48;
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;
  const ctx = sprite.getContext("2d");
  if (!ctx) return null;
  const glow = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  glow.addColorStop(0, inner);
  glow.addColorStop(0.3, `rgba(${outer}, 0.55)`);
  glow.addColorStop(1, `rgba(${outer}, 0)`);
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);
  return sprite;
}

/**
 * Site-wide game feel: a short spark trail follows fine pointers, and every
 * click/tap bursts a little pickup shower. The rAF loop only runs while
 * sparks are alive — idle cost is zero — and everything is disabled for
 * reduced-motion visitors.
 */
export function GameFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const trailSprite = makeSprite(TRAIL_COLOR.inner, TRAIL_COLOR.outer);
    const burstSprite = makeSprite(BURST_COLOR.inner, BURST_COLOR.outer);
    if (!trailSprite || !burstSprite) return;

    let sparks: Spark[] = [];
    let frame = 0;
    let running = false;
    let last = 0;
    let lastTrail = 0;
    let lastX = 0;
    let lastY = 0;

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const addSpark = (x: number, y: number, vx: number, vy: number, warm: boolean, big = false) => {
      const max = big ? 480 + Math.random() * 260 : 340 + Math.random() * 180;
      sparks.push({
        x,
        y,
        vx,
        vy,
        life: 0,
        max,
        size: big ? 7 + Math.random() * 6 : 3.5 + Math.random() * 3,
        warm,
      });
    };

    const burst = (x: number, y: number) => {
      const count = coarse ? 10 : 16;
      for (let i = 0; i < count; i += 1) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
        const speed = 1.6 + Math.random() * 3.4;
        addSpark(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed - 0.6, Math.random() > 0.35, true);
      }
    };

    const trail = (x: number, y: number, now: number) => {
      if (lastTrail === 0) {
        // First movement sample: remember the origin, don't streak from (0,0).
        lastTrail = now;
        lastX = x;
        lastY = y;
        return;
      }
      if (now - lastTrail < 22) return;
      const dx = x - lastX;
      const dy = y - lastY;
      const speed = Math.min(Math.hypot(dx, dy), 40);
      lastTrail = now;
      lastX = x;
      lastY = y;
      if (speed < 1.5) return;
      addSpark(
        x,
        y,
        -dx * 0.04 + (Math.random() - 0.5) * 0.5,
        -dy * 0.04 + (Math.random() - 0.5) * 0.5,
        false,
      );
    };

    const drawSprite = (sprite: HTMLCanvasElement, x: number, y: number, size: number, alpha: number) => {
      context.globalAlpha = alpha;
      context.drawImage(sprite, x - size / 2, y - size / 2, size, size);
    };

    const tick = (now: number) => {
      const dt = Math.min(now - (last || now), 34);
      last = now;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const s of sparks) {
        s.life += dt;
        s.x += s.vx * (dt / 16);
        s.y += s.vy * (dt / 16);
        s.vy += 0.035 * (dt / 16);
        s.vx *= 0.985;
        const t = s.life / s.max;
        if (t >= 1) continue;
        const alpha = (1 - t) * (1 - t);
        drawSprite(s.warm ? burstSprite : trailSprite, s.x, s.y, s.size * (1 + t * 0.8), alpha);
      }

      sparks = sparks.filter((s) => s.life < s.max);
      context.globalAlpha = 1;

      if (sparks.length > 0) {
        frame = window.requestAnimationFrame(tick);
      } else {
        running = false;
        last = 0;
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      last = 0;
      frame = window.requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (coarse) return;
      trail(event.clientX, event.clientY, performance.now());
      start();
    };

    const onPointerDown = (event: PointerEvent) => {
      burst(event.clientX, event.clientY);
      start();
    };

    const onVisibility = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frame);
        running = false;
        sparks = [];
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[65] h-full w-full"
    />
  );
}
