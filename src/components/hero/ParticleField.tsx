"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  phase: number;
  alpha: number;
}

/**
 * Lightweight bioluminescent motes. The particle budget is strict and scales
 * down on small screens; the loop stops entirely when the hero leaves the
 * viewport, the tab is hidden, or the visitor prefers reduced motion.
 */
export function ParticleField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const budget = () => {
      if (window.innerWidth < 640) return 22;
      if (window.innerWidth < 1024) return 38;
      return 56;
    };

    const seed = () => {
      const count = budget();
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.7 + 0.6,
        speed: Math.random() * 0.16 + 0.05,
        drift: (Math.random() - 0.5) * 0.24,
        phase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.5 + 0.25,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduced) draw();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (const p of particles) {
        const flicker = 0.7 + Math.sin(p.phase) * 0.3;
        context.beginPath();
        context.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        context.fillStyle = `rgba(101, 232, 224, ${p.alpha * flicker})`;
        context.shadowColor = "rgba(101, 232, 224, 0.85)";
        context.shadowBlur = 8;
        context.fill();
      }
      context.shadowBlur = 0;
    };

    const tick = () => {
      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift + Math.sin(p.phase) * 0.12;
        p.phase += 0.012;
        if (p.y < -6) {
          p.y = height + 6;
          p.x = Math.random() * width;
        }
        if (p.x < -6) p.x = width + 6;
        if (p.x > width + 6) p.x = -6;
      }
      draw();
      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduced || !visible || document.hidden) return;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(tick);
    };

    const stop = () => window.cancelAnimationFrame(frame);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0.01 },
    );
    observer.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    resize();

    if (!reduced) start();

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
