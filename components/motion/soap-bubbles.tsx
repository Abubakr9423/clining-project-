"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Targets that keep their own click behaviour — a tap on them never pops a bubble. */
const INTERACTIVE = "a, button, input, label, select, textarea, [role=tab], form, fieldset";

const vertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

/** Thin-film look: clear centre, iridescent fresnel rim tinted toward the brand aqua, one soft highlight. */
const fragment = /* glsl */ `
  uniform float uTime;
  uniform float uSeed;
  uniform float uAlpha;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vView);
    float f = 1.0 - max(dot(n, v), 0.0);
    float rim = pow(f, 2.4);
    float t = f * 1.8 + uTime * 0.04 + uSeed;
    vec3 film = 0.5 + 0.5 * cos(6.2831 * (vec3(0.0, 0.33, 0.67) + t));
    film = mix(pow(film, vec3(1.6)), vec3(0.2, 0.77, 0.84), 0.22);
    vec3 l = normalize(vec3(-0.45, 0.7, 0.55));
    float spec = pow(max(dot(reflect(-l, n), v), 0.0), 36.0);
    float alpha = (rim * 0.55 + spec * 0.9) * uAlpha;
    gl_FragColor = vec4(mix(film, vec3(1.0), min(spec, 1.0)), alpha);
  }
`;

type Bubble = {
  x: number; y: number; z: number; r: number;
  speed: number; phase: number; sway: number;
  ox: number; oy: number; vx: number; vy: number;
  pop: number; respawnAt: number;
  /** Which edge band the bubble lives in; fixed per bubble so both sides always hold half. */
  side: -1 | 1;
};

type Drop = { x: number; y: number; vx: number; vy: number; life: number };

/**
 * Decorative iridescent soap bubbles behind the hero. three.js is fetched only once the browser
 * is idle, so it never competes with the hero image for LCP. Tap a bubble to pop it.
 * Reduced motion: a single still frame, no loop, no popping.
 */
export function SoapBubbles({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const area = host?.parentElement;
    if (!host || !area) return;
    let disposed = false;
    let cleanup = () => {};

    const start = async () => {
      const THREE = await import("three");
      if (disposed) return;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      const canvas = renderer.domElement;
      canvas.style.cssText = "width:100%;height:100%;display:block;opacity:0;transition:opacity 600ms cubic-bezier(0.22,1,0.36,1)";
      host.appendChild(canvas);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
      camera.position.z = 10;
      let viewW = 1;
      let viewH = 1;

      const geometry = new THREE.SphereGeometry(1, 48, 32);
      const count = window.innerWidth < 768 ? 7 : 14;
      type Item = { b: Bubble; mesh: InstanceType<typeof THREE.Mesh>; material: InstanceType<typeof THREE.ShaderMaterial>; uTime: { value: number }; uAlpha: { value: number } };
      const items: Item[] = [];

      // Spawn over the photo column (and a little past it) so the headline stays readable.
      // Two mirrored bands at the left and right edges, half the bubbles each, so the sides stay balanced
      // and the headline in the middle-left stays readable.
      const spawnX = (side: -1 | 1) => side * (0.5 - (0.015 + Math.random() * 0.12)) * viewW;
      const reset = (b: Bubble, initial: boolean) => {
        b.r = 0.22 + Math.random() * 0.5;
        b.x = spawnX(b.side);
        b.y = initial ? (Math.random() - 0.5) * viewH : -viewH / 2 - b.r - Math.random() * 1.5;
        b.z = -2 + Math.random() * 2.5;
        b.speed = 0.18 + Math.random() * 0.22;
        b.phase = Math.random() * Math.PI * 2;
        b.sway = 0.15 + Math.random() * 0.3;
        b.ox = b.oy = b.vx = b.vy = 0;
        b.pop = -1;
      };

      for (let i = 0; i < count; i++) {
        const uTime = { value: 0 };
        const uAlpha = { value: 1 };
        const material = new THREE.ShaderMaterial({
          vertexShader: vertex,
          fragmentShader: fragment,
          transparent: true,
          depthWrite: false,
          uniforms: { uTime, uSeed: { value: Math.random() }, uAlpha },
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        const b: Bubble = { x: 0, y: 0, z: 0, r: 1, speed: 0, phase: 0, sway: 0, ox: 0, oy: 0, vx: 0, vy: 0, pop: -1, respawnAt: 0, side: i % 2 === 0 ? -1 : 1 };
        items.push({ b, mesh, material, uTime, uAlpha });
      }

      // Pop spray: a small pool of droplets shared by all bubbles.
      const DROPS = 64;
      const drops: Drop[] = Array.from({ length: DROPS }, () => ({ x: 0, y: 0, vx: 0, vy: 0, life: 0 }));
      const dropPositions = new Float32Array(DROPS * 3);
      const dropGeometry = new THREE.BufferGeometry();
      const dropAttribute = new THREE.BufferAttribute(dropPositions, 3);
      dropGeometry.setAttribute("position", dropAttribute);
      const dropMaterial = new THREE.PointsMaterial({ color: 0x1d5fa8, size: 0.06, transparent: true, opacity: 0.55, depthWrite: false });
      const points = new THREE.Points(dropGeometry, dropMaterial);
      scene.add(points);

      const resize = () => {
        const { width, height } = host.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        viewH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
        viewW = viewH * camera.aspect;
      };
      resize();
      items.forEach(({ b }) => reset(b, true));

      const pointer = { x: 0, y: 0, active: false };
      const toWorld = (e: PointerEvent) => {
        const rect = host.getBoundingClientRect();
        return { nx: ((e.clientX - rect.left) / rect.width) * 2 - 1, ny: -((e.clientY - rect.top) / rect.height) * 2 + 1 };
      };
      const onMove = (e: PointerEvent) => {
        const { nx, ny } = toWorld(e);
        pointer.x = (nx * viewW) / 2;
        pointer.y = (ny * viewH) / 2;
        pointer.active = true;
      };
      const onLeave = () => (pointer.active = false);

      const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const raycaster = new THREE.Raycaster();
      let time = 0;
      const onDown = (e: PointerEvent) => {
        if (reducedQuery.matches || (e.target as Element).closest?.(INTERACTIVE)) return;
        const { nx, ny } = toWorld(e);
        raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera);
        // The cursor push nudges bubbles away as the pointer approaches, so an exact ray hit is
        // too strict: pick the nearest live bubble within 1.6 radii of the click on its own depth plane.
        const { origin, direction } = raycaster.ray;
        let b: Bubble | undefined;
        let best = 1.6;
        for (const { b: candidate, mesh } of items) {
          if (candidate.pop >= 0) continue;
          const t = (mesh.position.z - origin.z) / direction.z;
          const d = Math.hypot(origin.x + direction.x * t - mesh.position.x, origin.y + direction.y * t - mesh.position.y) / candidate.r;
          if (d < best) {
            best = d;
            b = candidate;
          }
        }
        if (!b) return;
        b.pop = time;
        b.respawnAt = time + 1.6 + Math.random() * 1.5;
        let spawned = 0;
        for (const d of drops) {
          if (d.life > 0 || spawned >= 8) continue;
          const a = (spawned / 8) * Math.PI * 2 + Math.random() * 0.4;
          const s = 1.2 + Math.random() * 1.4;
          d.x = b.x + b.ox + Math.cos(a) * b.r;
          d.y = b.y + b.oy + Math.sin(a) * b.r;
          d.vx = Math.cos(a) * s;
          d.vy = Math.sin(a) * s;
          d.life = 1;
          spawned++;
        }
      };

      const step = (dt: number) => {
        time += dt;
        items.forEach(({ b, mesh, uTime, uAlpha }) => {
          if (b.pop >= 0) {
            const p = (time - b.pop) / 0.18;
            if (time >= b.respawnAt) reset(b, false);
            else {
              mesh.visible = p < 1;
              mesh.scale.setScalar(b.r * (1 + Math.min(p, 1) * 0.35));
              uAlpha.value = Math.max(0, 1 - p);
              return;
            }
          }
          b.y += b.speed * dt;
          if (b.y - b.r > viewH / 2) reset(b, false);
          // Spring the offset back to rest; the pointer adds a soft outward push.
          let fx = -10 * b.ox - 4 * b.vx;
          let fy = -10 * b.oy - 4 * b.vy;
          if (pointer.active) {
            const dx = b.x + b.ox - pointer.x;
            const dy = b.y + b.oy - pointer.y;
            const dist = Math.hypot(dx, dy) || 1;
            const reach = b.r + 1.4;
            if (dist < reach) {
              const push = (1 - dist / reach) * 14;
              fx += (dx / dist) * push;
              fy += (dy / dist) * push;
            }
          }
          b.vx += fx * dt;
          b.vy += fy * dt;
          b.ox += b.vx * dt;
          b.oy += b.vy * dt;
          mesh.visible = true;
          mesh.position.set(b.x + Math.sin(time * 0.6 + b.phase) * b.sway + b.ox, b.y + b.oy, b.z);
          mesh.scale.setScalar(b.r * (1 + Math.sin(time * 1.3 + b.phase) * 0.015));
          uAlpha.value = 1;
          uTime.value = time;
        });
        drops.forEach((d, i) => {
          if (d.life > 0) {
            d.life -= dt * 2.2;
            d.vy -= 3.5 * dt;
            d.x += d.vx * dt;
            d.y += d.vy * dt;
          }
          dropPositions.set(d.life > 0 ? [d.x, d.y, 0.5] : [0, 0, -100], i * 3);
        });
        dropAttribute.needsUpdate = true;
        renderer.render(scene, camera);
      };

      let raf = 0;
      let last = 0;
      let inView = true;
      const loop = (now: number) => {
        step(Math.min((now - last) / 1000, 0.05));
        last = now;
        raf = requestAnimationFrame(loop);
      };
      const sync = () => {
        cancelAnimationFrame(raf);
        raf = 0;
        if (reducedQuery.matches) {
          items.forEach(({ b }) => (b.pop = -1));
          step(0);
        } else if (inView && !document.hidden) {
          last = performance.now();
          raf = requestAnimationFrame(loop);
        }
      };

      const io = new IntersectionObserver((entries) => {
        inView = entries.some((entry) => entry.isIntersecting);
        sync();
      });
      io.observe(area);
      const ro = new ResizeObserver(() => {
        resize();
        if (!raf) step(0);
      });
      ro.observe(host);
      area.addEventListener("pointermove", onMove);
      area.addEventListener("pointerleave", onLeave);
      area.addEventListener("pointerdown", onDown);
      document.addEventListener("visibilitychange", sync);
      reducedQuery.addEventListener("change", sync);

      step(0);
      sync();
      requestAnimationFrame(() => (canvas.style.opacity = "1"));

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        area.removeEventListener("pointermove", onMove);
        area.removeEventListener("pointerleave", onLeave);
        area.removeEventListener("pointerdown", onDown);
        document.removeEventListener("visibilitychange", sync);
        reducedQuery.removeEventListener("change", sync);
        geometry.dispose();
        items.forEach(({ material }) => material.dispose());
        dropGeometry.dispose();
        dropMaterial.dispose();
        renderer.dispose();
        canvas.remove();
      };
    };

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(() => void start(), { timeout: 2500 })
      : window.setTimeout(() => void start(), 1200);
    return () => {
      disposed = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      cleanup();
    };
  }, []);

  return <div ref={hostRef} aria-hidden className={cn("pointer-events-none", className)} />;
}
