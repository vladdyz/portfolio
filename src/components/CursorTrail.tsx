import { useEffect, useRef } from 'react';
import styles from './CursorTrail.module.css';

interface Cube {
  x: number;
  y: number;
  size: number;
  color: string;
  bornAt: number;
  lifetime: number;
}

// Brighter "digital rain" greens — closer to the phosphor look of the
// Matrix code rain than deep forest tones, which read as low-contrast
// (barely visible) against a dark background and muddy against a light one.
const COLORS = ['#69f0ae', '#00e676', '#22c55e', '#16a34a'];

const LIFETIME_MS = 550; // baseline; each cube randomizes around this — see spawnCluster
const MIN_SPAWN_DISTANCE = 12; // px the cursor must move before the next cluster spawns
const CLUSTER_MIN = 2;
const CLUSTER_MAX = 4;
const CLUSTER_SPREAD = 9; // px jitter radius within one cluster
const MAX_CUBES = 150;
const MAX_OPACITY = 0.38;

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    // Skip entirely on touch devices and when the user has asked for less
    // motion — there's no cursor to trail, and no effect is the right call.
    if (prefersReducedMotion || !hasFinePointer) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    const cubes: Cube[] = [];
    let lastSpawnX = -1000;
    let lastSpawnY = -1000;

    // Spawns a small clustered group at once, each cube with its own
    // randomized lifetime. Because they don't all expire at the same
    // moment, the cluster visibly thins from several cubes down to a
    // single lingering one before that one fades too — the same
    // per-cube shrink/fade below just staggered across a group.
    function spawnCluster(x: number, y: number) {
      const count = CLUSTER_MIN + Math.floor(Math.random() * (CLUSTER_MAX - CLUSTER_MIN + 1));
      for (let i = 0; i < count; i++) {
        cubes.push({
          x: x + (Math.random() - 0.5) * CLUSTER_SPREAD * 2,
          y: y + (Math.random() - 0.5) * CLUSTER_SPREAD * 2,
          size: 4 + Math.random() * 9, // 4–13px, so the trail isn't uniform
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          bornAt: performance.now(),
          lifetime: LIFETIME_MS * (0.6 + Math.random() * 0.7), // ~330–715ms
        });
      }
      while (cubes.length > MAX_CUBES) cubes.shift();
    }

    function handleMouseMove(event: MouseEvent) {
      const dx = event.clientX - lastSpawnX;
      const dy = event.clientY - lastSpawnY;
      if (Math.hypot(dx, dy) < MIN_SPAWN_DISTANCE) return;
      lastSpawnX = event.clientX;
      lastSpawnY = event.clientY;
      spawnCluster(event.clientX, event.clientY);
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let frameId: number;
    function tick(now: number) {
      ctx!.clearRect(0, 0, width, height);
      for (let i = cubes.length - 1; i >= 0; i--) {
        const cube = cubes[i];
        const t = (now - cube.bornAt) / cube.lifetime;
        if (t >= 1) {
          cubes.splice(i, 1);
          continue;
        }
        // Ease-out: lingers near full size briefly, then shrinks/fades faster.
        const eased = 1 - t * t;
        const size = cube.size * eased;
        const half = size / 2;

        ctx!.globalAlpha = MAX_OPACITY * eased;
        ctx!.fillStyle = cube.color;
        ctx!.fillRect(cube.x - half, cube.y - half, size, size);
      }
      ctx!.globalAlpha = 1;
      frameId = requestAnimationFrame(tick);
    }
    frameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={styles.canvas} />;
}
