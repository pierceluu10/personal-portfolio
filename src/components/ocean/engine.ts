/**
 * Procedural jellyfish rendered to a small offscreen light field, then resampled into a grid of monospace glyphs on
 * tinted tiles. Ported from the Kurage dashboard's Ocean, with the pond's page overlay rules layered on top: content
 * marked [data-ocean-avoid] dims the jellies beneath it, [data-ocean-lure] draws them toward it while hovered or
 * focused, and a click on empty water sends out a pulse.
 */

type Rgb = [number, number, number];
type Box = { left: number; top: number; right: number; bottom: number };
type Tentacle = {
  u: number;
  n: number;
  seg: number;
  w0: number;
  w1: number;
  sw: number;
  seed: number;
  arm: boolean;
  pts: { x: number; y: number; px: number; py: number }[];
};
type Jelly = {
  x: number;
  y: number;
  z: number;
  R0: number;
  R: number;
  vx: number;
  vy: number;
  theta: number;
  phase: number;
  c: number;
  rush: boolean;
  rate: number;
  mix: number;
  wander: number;
  tents: Tentacle[];
};
type Snow = { x: number; y: number; vx: number; vy: number; seed: number; g: string; run: number; alpha: number };
type Ripple = { x: number; y: number; t0: number; dur: number; max: number };

export type OceanStats = { jellies: number; pulses: number };

interface Palette {
  a: Rgb;
  b: Rgb;
  accents: string[];
  snow: Rgb;
  /** Cell colours for a hue blend (tb 0..5), light level (lv 0..11) and white core (wb 0..2). */
  cell(base: Rgb, L: number, w: number, hot: boolean): { tile: string; glyph: string };
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
const rgba = (c: number[], a: number) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a.toFixed(3)})`;

const DARK: Palette = {
  a: [92, 226, 240],
  b: [164, 140, 255],
  accents: ["#f9a8d4", "#fcd34d", "#86efac", "#c4b5fd"],
  snow: [150, 172, 205],
  // The hottest cells invert (bright tile, ink glyph); the rest are faint tiles with a lit glyph.
  cell(base, L, w, hot) {
    const tileMix = hot ? 0.5 + w * 0.3 : 0;
    const tile = base.map((v) => lerp(v * 0.58, 236, tileMix));
    const mixW = clamp(0.12 + L * 0.5 + w * 0.34, 0, 0.94);
    const glyph = hot ? [6, 10, 16] : base.map((v) => lerp(v, 246, mixW));
    return { tile: rgba(tile, hot ? 0.9 : 0.1 + L * 0.5), glyph: rgba(glyph, hot ? 1 : 0.4 + L * 0.6) };
  },
};

// Paper page: tiles are washes of the hue with darker ink etched on top; the hottest cells go solid with pale glyphs.
const LIGHT: Palette = {
  a: [16, 150, 172],
  b: [112, 84, 222],
  accents: ["#db2777", "#b45309", "#15803d", "#6d28d9"],
  snow: [52, 72, 104],
  cell(base, L, w, hot) {
    if (hot) return { tile: rgba(base.map((v) => v * (0.62 - w * 0.2)), 0.88), glyph: rgba([244, 248, 250], 1) };
    const glyph = base.map((v, i) => lerp(v, [10, 18, 30][i], clamp(0.2 + L * 0.3 + w * 0.25, 0, 0.8)));
    return { tile: rgba(base, 0.06 + L * 0.3), glyph: rgba(glyph, 0.5 + L * 0.5) };
  },
};

const RAMP = [
  [".", ","],
  ["'", "`"],
  [":", "'"],
  [";", ":"],
  ["o", ";"],
  ["t", "o"],
  ["%", "t"],
  ["S", "%"],
  ["X", "S"],
  ["8", "X"],
  ["@", "8"],
  ["#", "@"],
];
const SNOW = [".", ".", ".", "-", "-", "'", ",", "·"];
const SS = 2; // offscreen samples per cell, per axis
// Starting spots and depths as fractions of the page, so the first frame is already composed.
const SLOTS = [
  [0.2, 0.4, 0.82],
  [0.8, 0.3, 1],
  [0.4, 0.9, 0.92],
  [0.66, 0.72, 0.58],
  [0.07, 0.97, 0.62],
  [0.92, 0.9, 0.5],
];
// Hue A to hue B per jelly, so the first frame always shows both colours.
const HUES = [0.12, 0.9, 0.3, 0.78, 0.55, 0.04];
const TEMPO = 1;
// The water wraps like a torus. Within this many bell radii of an edge (bell plus trailing tentacles) a jelly is also
// drawn on the opposite side, so it slides off one edge and onto the other at the same moment.
const WRAP_REACH = 4.2;
// A click shoves the jellies its ripple reaches away from it, hardest at the centre, and turns them to swim off.
const FLEE_SPEED = 150;
const FLEE_TURN = 1.15;
const LURE_SECONDS = 1.8;
// A click's ripple: one faint ring that reaches this share of the page's short side.
const RIPPLE_REACH = 0.24;
const RIPPLE_SECONDS = 1.4;
const INTERACTIVE = "a, button, input, textarea, select, label, [role='button'], [data-ocean-ignore]";
const AVOID_TARGETS = "[data-ocean-avoid]";
const LURE_TARGETS = "[data-ocean-lure]";
// How visible a jelly stays while it drifts under page content.
const DIM_UNDER_CONTENT = 0.18;
const MEASURE_EVERY_FRAMES = 30;

function hash(x: number, y: number, t: number) {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(t, 1103515245);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

function contraction(p: number) {
  return p < 0.28 ? Math.sin(((p / 0.28) * Math.PI) / 2) : 0.5 + 0.5 * Math.cos(((p - 0.28) / 0.72) * Math.PI);
}

// Field channels: R = hue A weight, B = hue B weight, G = white core. Drawn additively.
function fieldColor(m: number, k: number, w: number) {
  return `rgb(${Math.min(255, (1 - m) * k * 255) | 0},${Math.min(255, w * 255) | 0},${Math.min(255, m * k * 255) | 0})`;
}

export class OceanEngine {
  private ctx: CanvasRenderingContext2D;
  private off = document.createElement("canvas");
  private octx: CanvasRenderingContext2D;
  private W = 0;
  private H = 0;
  private dpr = 1;
  private cw = 10;
  private ch = 15;
  private cols = 0;
  private rows = 0;
  private ow = 0;
  private oh = 0;
  private fs = 11;
  private font = "ui-monospace, monospace";
  private palette = DARK;
  private styles = new Map<number, { tile: string; glyph: string }>();
  private cellDim = new Float32Array(0);

  private jellies: Jelly[] = [];
  private snow: Snow[] = [];
  private ripples: Ripple[] = [];
  private pulses = 0;
  private reported: OceanStats = { jellies: -1, pulses: -1 };
  private time = 0;
  private last = 0;
  private acc = 0;
  private raf = 0;
  private frames = 0;
  private gain = 1;
  private lureUntil = 0;
  private pointer = { x: -1e5, y: -1e5 };
  private target = { x: 0, y: 0 };
  private visible = !document.hidden;
  private disposed = false;
  private reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  private resizeObserver = new ResizeObserver(() => this.resize());

  constructor(
    private host: HTMLElement,
    private canvas: HTMLCanvasElement,
    private onStats: (stats: OceanStats) => void,
  ) {
    const ctx = canvas.getContext("2d");
    const octx = this.off.getContext("2d", { willReadFrequently: true });
    if (!ctx || !octx) throw new Error("2D canvas unavailable");
    this.ctx = ctx;
    this.octx = octx;
    this.font = getComputedStyle(canvas).fontFamily || this.font;
    this.resizeObserver.observe(host);
    this.reducedMotion.addEventListener("change", this.sync);
    document.addEventListener("visibilitychange", this.onVisibility);
    window.addEventListener("pointermove", this.onPointerMove, { passive: true });
    window.addEventListener("pointerover", this.onLure);
    window.addEventListener("focusin", this.onLure);
    window.addEventListener("click", this.onClick);
    document.documentElement.addEventListener("pointerleave", this.onPointerLeave);
    // The glyphs need the real monospace font; redraw once it has loaded.
    document.fonts.ready.then(() => !this.disposed && this.render());
    this.resize();
  }

  destroy() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.resizeObserver.disconnect();
    this.reducedMotion.removeEventListener("change", this.sync);
    document.removeEventListener("visibilitychange", this.onVisibility);
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerover", this.onLure);
    window.removeEventListener("focusin", this.onLure);
    window.removeEventListener("click", this.onClick);
    document.documentElement.removeEventListener("pointerleave", this.onPointerLeave);
  }

  setLight(isLight: boolean) {
    this.palette = isLight ? LIGHT : DARK;
    this.styles.clear();
    this.seedSnowStyles();
    this.render();
  }

  // ── creatures ──────────────────────────────────────────────────────

  private baseRadius() {
    return clamp(Math.min(this.W, this.H * 1.25) * 0.074, 46, 98);
  }

  private desiredCount() {
    return this.W < 600 ? 3 : this.W < 1100 ? 4 : 5;
  }

  private makeJelly(x: number, y: number, z: number): Jelly {
    const R0 = this.baseRadius() * (0.62 + 0.55 * z) * (0.88 + Math.random() * 0.24);
    const j: Jelly = {
      x,
      y,
      z,
      R0,
      R: R0,
      vx: 0,
      vy: 0,
      theta: (Math.random() - 0.5) * 0.6,
      phase: Math.random(),
      c: 0,
      rush: false,
      rate: 0.86 + Math.random() * 0.28,
      mix: Math.random(),
      wander: Math.random() * 100,
      tents: [],
    };
    const fringe = 9;
    for (let i = 0; i < fringe; i++) {
      j.tents.push({
        u: -0.92 + (1.84 * i) / (fringe - 1),
        n: 15,
        seg: 0.25,
        w0: 0.075,
        w1: 0.022,
        sw: 0.6 + Math.random() * 0.8,
        seed: Math.random() * 6.28,
        arm: false,
        pts: [],
      });
    }
    for (const u of [-0.3, -0.1, 0.1, 0.3]) {
      j.tents.push({ u, n: 10, seg: 0.2, w0: 0.17, w1: 0.05, sw: 1.1 + Math.random() * 0.5, seed: Math.random() * 6.28, arm: true, pts: [] });
    }
    this.resetTentacles(j);
    return j;
  }

  private resetTentacles(j: Jelly) {
    const hx = Math.sin(j.theta);
    const hy = -Math.cos(j.theta);
    for (const t of j.tents) {
      const a = this.anchor(j, t, 0);
      t.pts = [];
      for (let k = 0; k < t.n; k++) {
        const x = a.x - hx * k * t.seg * j.R;
        const y = a.y - hy * k * t.seg * j.R;
        t.pts.push({ x, y, px: x, py: y });
      }
    }
  }

  private anchor(j: Jelly, t: Tentacle, c: number) {
    const rx = j.R * (1 - 0.17 * c);
    const ry = j.R * 0.8 * (1 + 0.1 * c);
    const lx = t.u * rx * (t.arm ? 1 : 0.95);
    const ly = t.arm ? ry * 0.05 : -ry * 0.03 * (1 - Math.abs(t.u));
    const cs = Math.cos(j.theta);
    const sn = Math.sin(j.theta);
    return { x: j.x + lx * cs - ly * sn, y: j.y + lx * sn + ly * cs };
  }

  private seedJellies() {
    this.jellies = [];
    for (let i = 0; i < this.desiredCount(); i++) {
      const [sx, sy, z] = SLOTS[i];
      const j = this.makeJelly(sx * this.W, sy * this.H, z);
      j.mix = HUES[i];
      this.jellies.push(j);
    }
    this.jellies.sort((a, b) => a.z - b.z);
  }

  private respawn(j: Jelly) {
    // On the bottom edge, so it rises into view (and, on the torus, trails in from the top).
    j.y = this.H;
    j.x = this.W * (0.08 + Math.random() * 0.84);
    j.vx = 0;
    j.vy = 0;
    j.theta = (Math.random() - 0.5) * 0.5;
    j.mix = Math.random() < 0.5 ? Math.random() * 0.35 : 0.65 + Math.random() * 0.35;
    this.resetTentacles(j);
  }

  private shiftJelly(j: Jelly, dx: number, dy: number) {
    j.x += dx;
    j.y += dy;
    for (const t of j.tents) {
      for (const q of t.pts) {
        q.x += dx;
        q.px += dx;
        q.y += dy;
        q.py += dy;
      }
    }
  }

  private seedSnow() {
    this.snow = [];
    const n = Math.round((this.cols * this.rows) / 80);
    for (let i = 0; i < n; i++) {
      this.snow.push({
        x: Math.random() * this.W,
        y: Math.random() * this.H,
        vy: 3 + Math.random() * 8,
        vx: (Math.random() - 0.5) * 3,
        seed: Math.random() * 6.28,
        g: SNOW[(Math.random() * SNOW.length) | 0],
        run: Math.random() < 0.16 ? 2 + ((Math.random() * 3) | 0) : 1,
        alpha: 0.14 + Math.random() * 0.3,
      });
    }
    this.seedSnowStyles();
  }

  private snowStyles: string[] = [];
  private seedSnowStyles() {
    this.snowStyles = this.snow.map((s) => rgba(this.palette.snow, s.alpha));
  }

  // ── simulation ─────────────────────────────────────────────────────

  private step(dt: number) {
    const { pointer, target } = this;
    this.time += dt;
    const time = this.time;
    const luring = time < this.lureUntil;
    const gTarget = luring ? 1.1 : 1;
    this.gain += (gTarget - this.gain) * Math.min(1, dt * (gTarget < this.gain ? 9 : 2.4));

    const tempo = TEMPO * (luring ? 1.28 : 1);
    for (const j of this.jellies) {
      j.R += (j.R0 - j.R) * Math.min(1, dt * 1.4);
      j.phase += dt * (1 / 2.6) * j.rate * tempo + (j.rush ? dt * 2.2 : 0);
      if (j.phase >= 1) {
        j.phase -= 1;
        j.rush = false;
      }
      const c = contraction(j.phase);
      const dc = c - j.c;
      j.c = c;
      const hx = Math.sin(j.theta);
      const hy = -Math.cos(j.theta);
      if (dc > 0) {
        const thrust = 62 * (0.5 + 0.5 * j.z) * Math.sqrt(tempo);
        j.vx += hx * dc * thrust;
        j.vy += hy * dc * thrust;
      }
      const drag = Math.exp(-dt * 1.15);
      j.vx *= drag;
      j.vy *= drag;
      j.vx += Math.sin(time * 0.07 + j.wander) * 1.6 * dt;
      j.x += j.vx * dt;
      j.y += j.vy * dt;

      let want = Math.sin(time * 0.11 + j.wander) * 0.5;
      if (luring) want = clamp(Math.atan2(target.x - j.x, -(target.y - j.y)), -1.15, 1.15);
      const pdx = j.x - pointer.x;
      const pdy = j.y - pointer.y;
      const pd = Math.hypot(pdx, pdy) || 1;
      if (pd < j.R * 2.4) {
        const push = (1 - pd / (j.R * 2.4)) * 42 * dt;
        j.vx += (pdx / pd) * push;
        j.vy += (pdy / pd) * push;
      }
      j.theta += (want - j.theta) * Math.min(1, dt * (luring ? 0.9 : 0.32));

      if (j.x < 0) this.shiftJelly(j, this.W, 0);
      else if (j.x > this.W) this.shiftJelly(j, -this.W, 0);
      if (j.y < 0) this.shiftJelly(j, 0, this.H);
      else if (j.y > this.H) this.shiftJelly(j, 0, -this.H);

      // Tentacles: follow-the-leader chains with inertia, brushed aside by the pointer.
      const cs = Math.cos(j.theta);
      const sn = Math.sin(j.theta);
      const trail = 0.42 + 0.25 * (1 - c);
      const sway = time * 1.5 * TEMPO;
      for (const t of j.tents) {
        const p = t.pts;
        const a = this.anchor(j, t, c);
        const seg = t.seg * j.R;
        p[0].x = a.x;
        p[0].y = a.y;
        p[0].px = a.x;
        p[0].py = a.y;
        const flare = t.arm ? 0 : t.u * c * 0.7;
        for (let k = 1; k < p.length; k++) {
          const q = p[k];
          const pr = p[k - 1];
          const f = k / p.length;
          const vx = (q.x - q.px) * 0.88;
          const vy = (q.y - q.py) * 0.88;
          q.px = q.x;
          q.py = q.y;
          const s = Math.sin(sway - k * 0.42 + t.seed) * t.sw * (0.25 + f) * 0.55 + flare * (1 - f);
          q.x += vx - hx * trail + cs * s;
          q.y += vy - hy * trail + sn * s;
          const ex = q.x - pointer.x;
          const ey = q.y - pointer.y;
          const ed = ex * ex + ey * ey;
          if (ed < 12100) {
            const d = Math.sqrt(ed) || 1;
            const push = (1 - d / 110) * 2.6;
            q.x += (ex / d) * push;
            q.y += (ey / d) * push;
          }
          const dx = q.x - pr.x;
          const dy = q.y - pr.y;
          const d = Math.hypot(dx, dy) || 1;
          q.x = pr.x + (dx / d) * seg;
          q.y = pr.y + (dy / d) * seg;
        }
      }
    }

    const { cw, ch, W, H } = this;
    for (const s of this.snow) {
      s.y += s.vy * dt;
      s.x += (s.vx + Math.sin(time * 0.3 + s.seed) * 2) * dt;
      if (s.y > H + ch) {
        s.y = -ch;
        s.x = Math.random() * W;
      }
      if (s.x < -cw * 8) s.x += W + cw * 8;
      else if (s.x > W + cw) s.x -= W + cw * 8;
    }

    this.ripples = this.ripples.filter((r) => time - r.t0 <= r.dur);
  }

  // ── drawing: offscreen light field ─────────────────────────────────

  private drawField() {
    const { octx, ow, oh, cw, ch, time } = this;
    octx.setTransform(1, 0, 0, 1, 0, 0);
    octx.globalCompositeOperation = "source-over";
    octx.fillStyle = "#000";
    octx.fillRect(0, 0, ow, oh);
    octx.setTransform(SS / cw, 0, 0, SS / ch, 0, 0);
    octx.globalCompositeOperation = "lighter";
    octx.lineCap = "round";
    octx.lineJoin = "round";

    for (const r of this.ripples) {
      const t = (time - r.t0) / r.dur;
      if (t < 0) continue;
      const rad = (1 - Math.pow(1 - t, 3)) * r.max;
      const fade = 1 - t;
      octx.lineWidth = 3 + 5 * fade;
      octx.strokeStyle = fieldColor(0.5, 0.26 * fade, 0.2 * fade);
      octx.beginPath();
      octx.ellipse(r.x, r.y, rad, rad * 0.56, 0, 0, Math.PI * 2);
      octx.stroke();
    }

    const { W, H } = this;
    for (const j of this.jellies) {
      const reach = j.R * WRAP_REACH;
      const xs = [0, ...(j.x < reach ? [W] : []), ...(j.x > W - reach ? [-W] : [])];
      const ys = [0, ...(j.y < reach ? [H] : []), ...(j.y > H - reach ? [-H] : [])];
      for (const ox of xs) {
        for (const oy of ys) {
          octx.save();
          octx.translate(ox, oy);
          this.drawJelly(j);
          octx.restore();
        }
      }
    }
  }

  private drawJelly(j: Jelly) {
    const { octx } = this;
    const k = this.gain * (0.54 + 0.56 * j.z);
    const m = j.mix;

    for (const t of j.tents) {
      const p = t.pts;
      const n = p.length;
      for (let s = 0; s < n - 1; s += 3) {
        const f = s / (n - 1);
        octx.lineWidth = lerp(t.w0, t.w1, f) * j.R;
        octx.strokeStyle = fieldColor(m, k * (t.arm ? 0.5 : 0.46) * (1 - f * 0.82), t.arm ? 0.1 * k : 0);
        octx.beginPath();
        octx.moveTo(p[s].x, p[s].y);
        for (let q = s + 1; q <= Math.min(n - 1, s + 3); q++) octx.lineTo(p[q].x, p[q].y);
        octx.stroke();
      }
    }

    const c = j.c;
    const rx = j.R * (1 - 0.17 * c);
    const ry = j.R * 0.8 * (1 + 0.1 * c);
    octx.save();
    octx.translate(j.x, j.y);
    octx.rotate(j.theta);

    // The bell.
    octx.beginPath();
    octx.moveTo(-rx, 0);
    octx.bezierCurveTo(-rx, -ry * 0.58, -rx * 0.56, -ry, 0, -ry);
    octx.bezierCurveTo(rx * 0.56, -ry, rx, -ry * 0.58, rx, 0);
    octx.quadraticCurveTo(0, -ry * 0.2, -rx, 0);
    octx.closePath();
    const g = octx.createRadialGradient(0, -ry * 0.38, rx * 0.1, 0, -ry * 0.3, rx * 1.05);
    g.addColorStop(0, fieldColor(m, k * 0.34, 0.1 * k));
    g.addColorStop(0.7, fieldColor(m, k * 0.42, 0.03 * k));
    g.addColorStop(1, fieldColor(m, k * 0.66, 0.08 * k));
    octx.fillStyle = g;
    octx.fill();
    octx.lineWidth = Math.max(5, j.R * 0.085);
    octx.strokeStyle = fieldColor(m, k * 0.55, 0.2 * k);
    octx.stroke();

    // Four gonads: the moon-jelly clover.
    octx.lineWidth = Math.max(3, j.R * 0.05);
    octx.strokeStyle = fieldColor(m, k * 0.14, 0.52 * k);
    for (let i = 0; i < 4; i++) {
      const ang = Math.PI / 4 + (i * Math.PI) / 2;
      octx.beginPath();
      octx.ellipse(Math.cos(ang) * rx * 0.26, -ry * 0.44 + Math.sin(ang) * ry * 0.2, rx * 0.14, ry * 0.12, ang, 0, Math.PI * 2);
      octx.stroke();
    }
    // Marginal bulbs on the rim.
    octx.fillStyle = fieldColor(m, k * 0.4, 0.36 * k);
    for (let i = 0; i <= 8; i++) {
      const u = -0.95 + (1.9 * i) / 8;
      octx.beginPath();
      octx.arc(u * rx, -ry * 0.03 * (1 - Math.abs(u)), Math.max(2.5, j.R * 0.034), 0, Math.PI * 2);
      octx.fill();
    }
    octx.restore();
  }

  // ── drawing: glyph grid ────────────────────────────────────────────

  private style(tb: number, lv: number, wb: number) {
    const key = (tb * 12 + lv) * 3 + wb;
    let s = this.styles.get(key);
    if (s) return s;
    const { a, b } = this.palette;
    const t = tb / 5;
    const base = [0, 1, 2].map((i) => lerp(a[i], b[i], t)) as Rgb;
    s = this.palette.cell(base, (lv + 0.5) / 12, [0, 0.3, 0.62][wb], lv >= 10 && wb > 0);
    this.styles.set(key, s);
    return s;
  }

  private render() {
    const { ctx, octx, W, H, cw, ch, cols, rows, ow, cellDim, time } = this;
    if (!W) return;
    this.drawField();
    const d = octx.getImageData(0, 0, ow, this.oh).data;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.font = `500 ${this.fs}px ${this.font}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const ty = ch / 2 + 0.5;
    const tx = cw / 2;

    this.snow.forEach((s, n) => {
      const cx = Math.floor(s.x / cw);
      const cy = Math.floor(s.y / ch);
      ctx.globalAlpha = cellDim[cy * cols + cx] ?? 1;
      ctx.fillStyle = this.snowStyles[n];
      for (let r = 0; r < s.run; r++) ctx.fillText(s.run > 1 ? "-" : s.g, (cx + r * 2) * cw + tx, cy * ch + ty);
    });

    const tickRate = 1.4;
    const row = ow * 4;
    for (let cy = 0; cy < rows; cy++) {
      for (let cx = 0; cx < cols; cx++) {
        const i = (cy * SS * ow + cx * SS) * 4;
        const a = (d[i] + d[i + 4] + d[i + row] + d[i + row + 4]) / 1020;
        const w = (d[i + 1] + d[i + 5] + d[i + row + 1] + d[i + row + 5]) / 1020;
        const b = (d[i + 2] + d[i + 6] + d[i + row + 2] + d[i + row + 6]) / 1020;
        const L = Math.min(1, a + b + w * 0.55);
        if (L < 0.055) continue;
        const tb = Math.round((b / (a + b + 1e-4)) * 5);
        const lv = Math.min(11, (L * 12) | 0);
        const wb = w < 0.12 ? 0 : w < 0.32 ? 1 : 2;
        const st = this.style(tb, lv, wb);
        const x = cx * cw;
        const y = cy * ch;
        ctx.globalAlpha = cellDim[cy * cols + cx];
        if (lv >= 1) {
          ctx.fillStyle = st.tile;
          ctx.fillRect(x + 1, y + 1, cw - 2, ch - 2);
        }
        // Glyphs flip on a staggered clock; a rare few blink an accent colour.
        const tick = Math.floor(time * tickRate + ((cx * 7 + cy * 13) & 15) / 16);
        const h = hash(cx, cy, tick);
        ctx.fillStyle = lv >= 4 && lv < 10 && h > 0.986 ? this.palette.accents[((h * 1e4) | 0) & 3] : st.glyph;
        ctx.fillText(RAMP[lv][h < 0.55 ? 0 : 1], x + tx, y + ty);
      }
    }
    ctx.globalAlpha = 1;
  }

  // ── page overlay ───────────────────────────────────────────────────

  /** Fade jellies under page content, easing back in over a few cells around it. */
  private measureContent() {
    const { cols, rows, cw, ch, cellDim } = this;
    const origin = this.canvas.getBoundingClientRect();
    cellDim.fill(1);
    const pad = cw * 4;
    for (const el of Array.from(document.querySelectorAll(AVOID_TARGETS))) {
      const r = el.getBoundingClientRect();
      // The layout for the other screen size is display: none and measures as an empty box.
      if (r.width === 0 || r.height === 0) continue;
      const b: Box = { left: r.left - origin.left, top: r.top - origin.top, right: r.right - origin.left, bottom: r.bottom - origin.top };
      const c0 = Math.max(0, Math.floor((b.left - pad) / cw));
      const c1 = Math.min(cols - 1, Math.floor((b.right + pad) / cw));
      const r0 = Math.max(0, Math.floor((b.top - pad) / ch));
      const r1 = Math.min(rows - 1, Math.floor((b.bottom + pad) / ch));
      for (let row = r0; row <= r1; row++) {
        for (let col = c0; col <= c1; col++) {
          const x = col * cw + cw / 2;
          const y = row * ch + ch / 2;
          const dist = Math.hypot(Math.max(b.left - x, 0, x - b.right), Math.max(b.top - y, 0, y - b.bottom));
          const i = row * cols + col;
          cellDim[i] = Math.min(cellDim[i], DIM_UNDER_CONTENT + (1 - DIM_UNDER_CONTENT) * smoothstep(0, pad, dist));
        }
      }
    }
  }

  private report() {
    const stats = { jellies: this.jellies.length, pulses: this.pulses };
    if (stats.jellies === this.reported.jellies && stats.pulses === this.reported.pulses) return;
    this.reported = stats;
    this.onStats(stats);
  }

  private toLocal(e: MouseEvent) {
    const r = this.host.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    return { x, y, inside: x >= 0 && y >= 0 && x <= r.width && y <= r.height };
  }

  private onPointerMove = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    const { x, y } = this.toLocal(e);
    this.pointer.x = x;
    this.pointer.y = y;
  };

  private onPointerLeave = () => {
    this.pointer.x = -1e5;
    this.pointer.y = -1e5;
  };

  // Hovering or focusing a mention draws the jellies toward it, the way typing draws them to the dashboard's composer.
  private onLure = (e: Event) => {
    const lure = e.target instanceof Element && e.target.closest(LURE_TARGETS);
    if (!lure) return;
    const r = lure.getBoundingClientRect();
    const origin = this.host.getBoundingClientRect();
    this.target.x = r.left - origin.left + r.width / 2;
    this.target.y = r.top - origin.top + r.height / 2;
    this.lureUntil = this.time + LURE_SECONDS;
  };

  // A click on open water sends a faint ripple from that spot; links, buttons and text selection are left alone.
  private onClick = (e: MouseEvent) => {
    if (this.reducedMotion.matches) return;
    // The path recorded at dispatch, not target.closest(): a control that re-renders as it's clicked (the theme
    // toggle swaps its icon) can leave the target detached.
    if (e.composedPath().some((n) => n instanceof Element && n.matches(INTERACTIVE))) return;
    if (window.getSelection()?.toString()) return;
    const { x, y, inside } = this.toLocal(e);
    if (!inside) return;
    const max = Math.min(this.W, this.H) * RIPPLE_REACH;
    // Only the jellies the ring reaches startle: a quick pulse, a shove away, and a turn to swim off.
    for (const j of this.jellies) {
      const dx = j.x - x;
      const dy = j.y - y;
      const d = Math.hypot(dx, dy) || 1;
      if (d >= max + j.R) continue;
      const shove = FLEE_SPEED * (1 - d / (max + j.R));
      j.vx += (dx / d) * shove;
      j.vy += (dy / d) * shove;
      j.theta = clamp(Math.atan2(dx, -dy), -FLEE_TURN, FLEE_TURN);
      j.rush = true;
    }
    this.ripples.push({ x, y, t0: this.time, dur: RIPPLE_SECONDS, max });
    this.pulses++;
    this.report();
  };

  private onVisibility = () => {
    this.visible = !document.hidden;
    this.sync();
  };

  // ── loop ───────────────────────────────────────────────────────────

  private loop = (now: number) => {
    this.raf = requestAnimationFrame(this.loop);
    if (!this.last) {
      this.last = now;
      return;
    }
    this.acc += Math.min((now - this.last) / 1000, 0.1);
    this.last = now;
    // Drawn at 30fps with fixed substeps: the glyph grid reads the same and costs half.
    if (this.acc < 1 / 30) return;
    const n = Math.max(1, Math.min(6, Math.round(this.acc * 60)));
    const h = this.acc / n;
    for (let i = 0; i < n; i++) this.step(h);
    this.acc = 0;
    if (++this.frames % MEASURE_EVERY_FRAMES === 0) this.measureContent();
    this.render();
  };

  private sync = () => {
    const playing = this.visible && this.W > 0 && !this.reducedMotion.matches && !this.disposed;
    if (playing && !this.raf) {
      this.last = 0;
      this.raf = requestAnimationFrame(this.loop);
    } else if (!playing && this.raf) {
      cancelAnimationFrame(this.raf);
      this.raf = 0;
    }
    if (!playing) {
      this.measureContent();
      this.render();
    }
  };

  private resize() {
    const r = this.host.getBoundingClientRect();
    const nW = Math.max(1, Math.round(r.width));
    const nH = Math.max(1, Math.round(r.height));
    if (nW === this.W && nH === this.H) return;
    const first = !this.W;
    const sx = first ? 1 : nW / this.W;
    const sy = first ? 1 : nH / this.H;
    this.W = nW;
    this.H = nH;
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.cw = nW < 600 ? 8 : nW < 1100 ? 9 : 10;
    this.ch = Math.round(this.cw * 1.5);
    this.fs = Math.round(this.ch * 0.74);
    this.cols = Math.ceil(nW / this.cw);
    this.rows = Math.ceil(nH / this.ch);
    this.canvas.width = Math.round(nW * this.dpr);
    this.canvas.height = Math.round(nH * this.dpr);
    this.ow = this.cols * SS;
    this.oh = this.rows * SS;
    this.off.width = this.ow;
    this.off.height = this.oh;
    this.cellDim = new Float32Array(this.cols * this.rows).fill(1);
    if (first) {
      this.seedJellies();
      for (let i = 0; i < 200; i++) this.step(1 / 60);
    } else {
      for (const j of this.jellies) this.shiftJelly(j, j.x * (sx - 1), j.y * (sy - 1));
      const n = this.desiredCount();
      while (this.jellies.length > n) this.jellies.pop();
      while (this.jellies.length < n) {
        const j = this.makeJelly(nW * Math.random(), nH + 80, 0.5 + Math.random() * 0.4);
        this.respawn(j);
        this.jellies.unshift(j);
      }
    }
    this.seedSnow();
    this.measureContent();
    this.render();
    this.report();
    this.sync();
  }
}
