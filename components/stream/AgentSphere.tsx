"use client";

import { useEffect, useRef } from "react";

type P3 = { x: number; y: number; z: number };

const ORBITERS = ["Planner", "Retriever", "Tools", "Reviewer", "Memory"];

/**
 * A real-time 3D "agent brain": points on a sphere wired into a graph,
 * messages travelling along the wires, and labelled agents orbiting it.
 * Rendered with plain canvas + perspective projection (no 3D library).
 */
export default function AgentSphere({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;

    // Fibonacci sphere
    const N = 180;
    const pts: P3[] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = Math.PI * (3 - Math.sqrt(5)) * i;
      pts.push({ x: Math.cos(t) * r, y, z: Math.sin(t) * r });
    }
    const edges: [number, number][] = [];
    for (let a = 0; a < N; a++) {
      const near = pts
        .map((p, b) => [b, (p.x - pts[a].x) ** 2 + (p.y - pts[a].y) ** 2 + (p.z - pts[a].z) ** 2] as [number, number])
        .filter(([b]) => b !== a)
        .sort((p, q) => p[1] - q[1])
        .slice(0, 3);
      near.forEach(([b]) => a < b && edges.push([a, b]));
    }
    type Pulse = { e: number; t: number; hot: boolean };
    let pulses: Pulse[] = [];

    let rotY = 0.6;
    let rotX = -0.25;
    let targetX = -0.25;
    let targetY = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let spin = 0.0025;

    const css = (n: string, f: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(n).trim() || f;

    function resize() {
      const r = canvas!.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function project(p: P3, R: number, cx: number, cy: number) {
      // rotate Y then X
      const cy1 = Math.cos(rotY), sy1 = Math.sin(rotY);
      const x1 = p.x * cy1 + p.z * sy1;
      const z1 = -p.x * sy1 + p.z * cy1;
      const cx1 = Math.cos(rotX), sx1 = Math.sin(rotX);
      const y2 = p.y * cx1 - z1 * sx1;
      const z2 = p.y * sx1 + z1 * cx1;
      const persp = 2.6 / (2.6 + z2);
      return { x: cx + x1 * R * persp, y: cy + y2 * R * persp, z: z2, s: persp };
    }

    let raf = 0;
    let time = 0;
    function frame() {
      time += 1;
      const accent = css("--accent", "#7C5CFF");
      const hot = css("--hot", "#FF4D6D");
      const line = css("--line3d", "rgba(255,255,255,.14)");
      const ink = css("--fg", "#fff");
      ctx!.clearRect(0, 0, W, H);
      const R = Math.min(W, H) * 0.33;
      const cx = W * 0.5;
      const cy = H * 0.5;

      if (!dragging) {
        rotY += spin;
        rotX += (targetX - rotX) * 0.04;
        rotY += targetY * 0.002;
      }

      const P = pts.map((p) => project(p, R, cx, cy));

      // glow core
      const g = ctx!.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 1.25);
      g.addColorStop(0, accent + "33");
      g.addColorStop(1, "transparent");
      ctx!.fillStyle = g;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R * 1.25, 0, Math.PI * 2);
      ctx!.fill();

      // edges
      ctx!.lineWidth = 1;
      edges.forEach(([a, b]) => {
        const pa = P[a], pb = P[b];
        const depth = (pa.z + pb.z) / 2;
        ctx!.globalAlpha = depth > 0 ? 0.12 : 0.45;
        ctx!.strokeStyle = line;
        ctx!.beginPath();
        ctx!.moveTo(pa.x, pa.y);
        ctx!.lineTo(pb.x, pb.y);
        ctx!.stroke();
      });

      // pulses
      if (!reduce && Math.random() < 0.18) pulses.push({ e: (Math.random() * edges.length) | 0, t: 0, hot: Math.random() < 0.3 });
      pulses = pulses.filter((p) => {
        p.t += 0.03;
        if (p.t > 1) return false;
        const [a, b] = edges[p.e];
        const pa = P[a], pb = P[b];
        const x = pa.x + (pb.x - pa.x) * p.t;
        const y = pa.y + (pb.y - pa.y) * p.t;
        ctx!.globalAlpha = (pa.z + pb.z) / 2 > 0 ? 0.35 : 1;
        ctx!.fillStyle = p.hot ? hot : accent;
        ctx!.shadowColor = ctx!.fillStyle as string;
        ctx!.shadowBlur = 12;
        ctx!.beginPath();
        ctx!.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.shadowBlur = 0;
        return true;
      });

      // nodes
      P.forEach((p, i) => {
        ctx!.globalAlpha = p.z > 0 ? 0.25 : 0.95;
        ctx!.fillStyle = i % 11 === 0 ? hot : i % 4 === 0 ? accent : ink;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, (i % 11 === 0 ? 2.8 : 1.6) * p.s, 0, Math.PI * 2);
        ctx!.fill();
      });

      // orbiting agents (tilted ring)
      ctx!.globalAlpha = 0.35;
      ctx!.strokeStyle = accent;
      ctx!.beginPath();
      const RX = Math.min(R * 1.55, W / 2 - 70);
      ctx!.ellipse(cx, cy, RX, R * 0.42, -0.25, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.globalAlpha = 1;
      ctx!.font = "600 13px system-ui, -apple-system, \"Segoe UI\", sans-serif";
      ORBITERS.forEach((name, i) => {
        const ang = (time * (reduce ? 0 : 0.006)) + (i / ORBITERS.length) * Math.PI * 2;
        const ex = Math.cos(ang) * RX;
        const ey = Math.sin(ang) * R * 0.42;
        const rot = -0.25;
        const x = cx + ex * Math.cos(rot) - ey * Math.sin(rot);
        const y = cy + ex * Math.sin(rot) + ey * Math.cos(rot);
        const front = Math.sin(ang) > 0;
        ctx!.globalAlpha = front ? 1 : 0.35;
        ctx!.fillStyle = i === 0 ? hot : accent;
        ctx!.beginPath();
        ctx!.arc(x, y, front ? 5 : 3.5, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = ink;
        ctx!.fillText(name, x + 9, y + 4);
      });
      ctx!.globalAlpha = 1;

      if (!reduce) raf = requestAnimationFrame(frame);
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      if (dragging) {
        rotY += (e.clientX - lastX) * 0.008;
        rotX += (e.clientY - lastY) * 0.008;
        lastX = e.clientX;
        lastY = e.clientY;
        return;
      }
      targetX = ((e.clientY - r.top) / r.height - 0.5) * 0.8;
      targetY = ((e.clientX - r.left) / r.width - 0.5) * 2;
    };
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      spin = 0;
      canvas.setPointerCapture(e.pointerId);
    };
    const onUp = () => {
      dragging = false;
      targetX = rotX;
      spin = 0.0025;
    };

    resize();
    frame();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) frame();
    });
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    const vis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", vis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={className}
      aria-label="Interactive 3D model of an AI agent network. Drag to rotate."
      role="img"
    />
  );
}
