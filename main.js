/* ════════════════════════════════════════════════════════
   ПРИРОДАТА КАТО ОБРАЗ — main.js
   ════════════════════════════════════════════════════════ */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/* ── Helpers ─────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ════════════════════════════════════════════════════════
   INTERSECTION OBSERVER — simple class-toggle reveals
   ════════════════════════════════════════════════════════ */

function observe(els, margin = '0px 0px -10% 0px') {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: margin, threshold: 0.1 });
  els.forEach(el => io.observe(el));
}

observe([
  ...$$('.ink-reveal'),
  ...$$('.ink-left'),
  ...$$('.fade-up'),
  ...$$('.stagger-in'),
  ...$$('.water-emerge'),
  ...$$('.panel-reveal'),
]);

/* ink-line width transition needs its own observer */
observe($$('.ink-line'), '0px 0px -8% 0px');

/* ════════════════════════════════════════════════════════
   FRAGMENTED POEM — Act 3, step 2
   ════════════════════════════════════════════════════════ */
(function () {
  const poem = $('#fragmentedPoem');
  if (!poem) return;
  const words = $$('.pw', poem);
  let done = false;
  const io = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting || done) return;
    done = true;
    io.disconnect();
    words.forEach((w, i) => setTimeout(() => w.classList.add('revealed'), i * 130 + 250));
  }, { rootMargin: '0px 0px -15% 0px', threshold: 0.3 });
  io.observe(poem);
})();

/* ════════════════════════════════════════════════════════
   STORM QUOTE — Act 3, step 3
   ════════════════════════════════════════════════════════ */
(function () {
  const quote = $('#stormQuote');
  if (!quote) return;
  const els = $$('.sw, .sd', quote);
  let done = false;
  const io = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting || done) return;
    done = true;
    io.disconnect();
    els.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('revealed');
        if (el.classList.contains('sd')) {
          el.classList.add('flash-in');
          setTimeout(() => el.classList.remove('flash-in'), 320);
        }
      }, i * 210 + 350);
    });
  }, { rootMargin: '0px 0px -15% 0px', threshold: 0.3 });
  io.observe(quote);
})();

/* ════════════════════════════════════════════════════════
   HAIL — Canvas renderer (replaces 80 animated divs)
   ════════════════════════════════════════════════════════ */
class HailCanvas {
  constructor(container) {
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText =
      'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0;transition:opacity 0.6s ease;';
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.active = false;
    this.raf = null;
    this._slow = false;
    this._resize = () => this.resize();
    window.addEventListener('resize', this._resize, { passive: true });
    this.resize();
    this.initParticles();
  }

  resize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  newParticle(randomY = false) {
    return {
      x:     Math.random() * window.innerWidth,
      y:     randomY ? Math.random() * window.innerHeight : -12,
      w:     Math.random() * 1.2 + 0.4,
      h:     Math.random() * 7 + 3,
      speed: Math.random() * 7 + 5,
      lean:  -(Math.random() * 0.35 + 0.1),   // leftward diagonal
      alpha: Math.random() * 0.45 + 0.25,
    };
  }

  initParticles() {
    for (let i = 0; i < 120; i++) this.particles.push(this.newParticle(true));
  }

  tick() {
    if (!this.active) return;
    const { ctx, canvas, particles } = this;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const speedMult = this._slow ? 0.25 : 1;

    for (const p of particles) {
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = '#c8d8e8';
      // Rotate each drop slightly to lean with the diagonal
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.lean);
      ctx.fillRect(-p.w * 0.5, -p.h * 0.5, p.w, p.h);
      ctx.restore();

      p.y += p.speed * speedMult;
      p.x += p.lean * p.speed * speedMult * 0.5;

      if (p.y > H + 20 || p.x < -20) {
        const np = this.newParticle(false);
        np.x = p.x < -20 ? W + 20 : Math.random() * W;
        p.x = np.x; p.y = np.y; p.w = np.w; p.h = np.h;
        p.speed = np.speed; p.lean = np.lean; p.alpha = np.alpha;
      }
    }

    ctx.globalAlpha = 1;
    this.raf = requestAnimationFrame(() => this.tick());
  }

  start() {
    if (this.active) return;
    this.active = true;
    this.canvas.style.opacity = '1';
    this.raf = requestAnimationFrame(() => this.tick());
  }

  stop() {
    this.active = false;
    cancelAnimationFrame(this.raf);
    this.canvas.style.opacity = '0';
    // Clear after fade
    setTimeout(() => {
      if (!this.active) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }, 700);
  }

  slow()  { this._slow = true; }
  unslow(){ this._slow = false; }
}

/* ── Boot hail ───────────────────────────────────────── */
let hail = null;
const hailLayer = $('#hailLayer');
if (hailLayer) {
  hail = new HailCanvas(hailLayer);

  ScrollTrigger.create({
    trigger: '#act-3',
    start: 'top 80%',
    end: 'bottom 20%',
    onEnter:     () => hail.start(),
    onLeave:     () => hail.stop(),
    onEnterBack: () => hail.start(),
    onLeaveBack: () => hail.stop(),
  });

  ScrollTrigger.create({
    trigger: '.step-yavorov-silence',
    start: 'top center',
    onEnter:     () => hail.slow(),
    onLeaveBack: () => hail.unslow(),
  });
}

/* ════════════════════════════════════════════════════════
   LIGHTNING — double-rAF restart (no forced reflow)
   ════════════════════════════════════════════════════════ */
(function () {
  const flash = $('#lightningFlash');
  if (!flash) return;
  let timer = null;

  function doFlash() {
    // Remove then re-add class using double rAF to restart animation
    // without triggering a synchronous layout (avoids offsetWidth trick)
    flash.classList.remove('flash');
    requestAnimationFrame(() => requestAnimationFrame(() => flash.classList.add('flash')));
    flash.addEventListener('animationend', () => flash.classList.remove('flash'), { once: true });
  }

  function schedule() {
    timer = setTimeout(() => { doFlash(); schedule(); }, Math.random() * 2500 + 2500);
  }

  ScrollTrigger.create({
    trigger: '#act-3',
    start: 'top 70%',
    end: 'bottom 30%',
    onEnter:     () => { doFlash(); schedule(); },
    onLeave:     () => clearTimeout(timer),
    onEnterBack: () => { doFlash(); schedule(); },
    onLeaveBack: () => clearTimeout(timer),
  });
})();

/* ════════════════════════════════════════════════════════
   RIPPLE — pause when off-screen
   ════════════════════════════════════════════════════════ */
ScrollTrigger.create({
  trigger: '.step-slaveykov-scene',
  start: 'top 75%',
  end: 'bottom 25%',
  onEnter:     () => $$('.ripple').forEach(r => r.style.animationPlayState = 'running'),
  onLeave:     () => $$('.ripple').forEach(r => r.style.animationPlayState = 'paused'),
  onEnterBack: () => $$('.ripple').forEach(r => r.style.animationPlayState = 'running'),
  onLeaveBack: () => $$('.ripple').forEach(r => r.style.animationPlayState = 'paused'),
});

/* ════════════════════════════════════════════════════════
   KEYBOARD NAVIGATION — presenter arrow keys
   ════════════════════════════════════════════════════════ */
(function () {
  const steps = $$('.step');
  let cur = 0;

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      cur = Math.min(cur + 1, steps.length - 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      cur = Math.max(cur - 1, 0);
    } else return;
    steps[cur].scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // Track current step with a lightweight passive scroll listener
  // instead of ScrollTrigger.onUpdate (which reads layout every frame)
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const mid = window.scrollY + window.innerHeight * 0.5;
      for (let i = steps.length - 1; i >= 0; i--) {
        if (steps[i].offsetTop <= mid) { cur = i; break; }
      }
      ticking = false;
    });
  }, { passive: true });
})();

/* ── Refresh after fonts/images load ────────────────── */
window.addEventListener('load', () => ScrollTrigger.refresh());
