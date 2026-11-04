'use client';

import { useEffect, useRef } from 'react';
import { MOTION_EVENT, motionAllowed } from '@/lib/motion';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
  pulse: number;
}

/** The ambient particle field: drifting motes in the brand blues that lean toward the cursor. Off for reduced motion. */
export function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !motionAllowed()) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const palette = ['--color-electric', '--color-cyan', '--color-chrome', '--color-accent-2'].map((name) =>
      styles.getPropertyValue(name).trim(),
    );

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const count = window.innerWidth < 768 ? 30 : 65;
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      color: palette[Math.floor(Math.random() * palette.length)],
      vx: (Math.random() - 0.5) * 0.45,
      vy: -Math.random() * 0.55 - 0.15,
      alpha: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * 0.02 + 0.01,
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;
    let hasMouse = false;
    let frame = 0;
    let running = false;

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      hasMouse = true;
    };
    const begin = () => {
      if (running || document.hidden || !motionAllowed()) return;
      running = true;
      frame = requestAnimationFrame(render);
    };
    const end = () => {
      running = false;
      cancelAnimationFrame(frame);
      ctx.clearRect(0, 0, width, height);
    };
    const onVisibility = () => (document.hidden ? end() : begin());
    const onMotion = () => (motionAllowed() ? begin() : end());

    function render() {
      if (!running || !ctx) return;
      ctx.clearRect(0, 0, width, height);
      const now = Date.now();
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += Math.sin(now * p.pulse * 0.1) * 0.005;

        if (hasMouse) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 0) {
            p.x += (dx / dist) * 0.4;
            p.y += (dy / dist) * 0.4;
          }
        }

        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(0.85, p.alpha));
        ctx.shadowBlur = p.radius * 6;
        ctx.shadowColor = p.color;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      frame = requestAnimationFrame(render);
    }

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener(MOTION_EVENT, onMotion);
    begin();

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener(MOTION_EVENT, onMotion);
    };
  }, []);

  return <canvas ref={ref} className="ambient" aria-hidden="true" />;
}
