// Scroll motion, following .impeccable.md: one expressive idea (the change path traced by scroll),
// everything else quiet and informative. Content is complete without this script, and nothing runs
// when the reader prefers reduced motion.

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));
const clamp = (v: number) => Math.max(0, Math.min(1, v));

/* Reading progress: a hairline along the nav bar, plus the current section in the nav. Runs even with reduced motion (it is not animation, it tracks position). */
const progress = document.querySelector<HTMLElement>('.progress');
const navLinks = $$<HTMLAnchorElement>('.bar nav a[data-sections]');
const spy = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const id = (e.target as HTMLElement).id;
      for (const a of navLinks) a.setAttribute('aria-current', (a.dataset.sections ?? '').split(' ').includes(id) ? 'true' : 'false');
    }
  },
  { rootMargin: '-40% 0px -55% 0px' },
);
$$('main > section[id], main > .sec[id]').forEach((s) => spy.observe(s));
const hero = document.querySelector('.hero');
if (hero) {
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) for (const a of navLinks) a.setAttribute('aria-current', 'false');
  }, { rootMargin: '-40% 0px -55% 0px' }).observe(hero);
}

/* The change path: the line and dot follow the reader's eye line down the diagram, and each stage is marked as the dot reaches it. Scrolling up rewinds it. */
type Path = { fig: HTMLElement; wrap: HTMLElement; items: HTMLElement[]; step: HTMLElement | null; y0: number; y1: number; stops: number[]; last: number };
const paths: Path[] = reduce
  ? []
  : $$('.flow').map((fig) => ({
      fig,
      wrap: fig.querySelector<HTMLElement>('.flow-path')!,
      items: $$('li', fig),
      step: fig.querySelector<HTMLElement>('.flow-step'),
      y0: 0, y1: 0, stops: [], last: -1,
    }));

function measure() {
  for (const p of paths) {
    const tags = p.items.map((li) => li.querySelector<HTMLElement>('b')!);
    const centre = (b: HTMLElement) => b.offsetTop + (b.closest('li') as HTMLElement).offsetTop + b.offsetHeight / 2;
    const first = tags[0], lastTag = tags[tags.length - 1];
    p.y0 = centre(first);
    p.y1 = centre(lastTag);
    p.stops = tags.map((b) => (centre(b) - p.y0) / Math.max(1, p.y1 - p.y0));
    p.wrap.style.setProperty('--x', `${first.offsetLeft + first.offsetWidth / 2}px`);
    p.wrap.style.setProperty('--y0', `${p.y0}px`);
    p.wrap.style.setProperty('--y1', `${p.y1}px`);
  }
}

function frame() {
  ticking = false;
  const max = document.documentElement.scrollHeight - innerHeight;
  progress?.style.setProperty('--p', String(max > 0 ? clamp(scrollY / max) : 0));
  const eye = innerHeight * 0.62;
  for (const p of paths) {
    const top = p.wrap.getBoundingClientRect().top;
    const t = clamp((eye - (top + p.y0)) / Math.max(1, p.y1 - p.y0));
    p.wrap.style.setProperty('--p', t.toFixed(4));
    let reached = -1;
    p.items.forEach((li, i) => {
      const on = t >= p.stops[i] - 0.001 && t > 0;
      li.classList.toggle('on', on);
      if (on) reached = i;
    });
    if (reached !== p.last && p.step) {
      p.last = reached;
      p.step.textContent = reached < 0 ? '' : `Stage ${reached + 1} of ${p.items.length}`;
    }
  }
}
let ticking = false;
const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };

if (paths.length) {
  for (const p of paths) p.fig.classList.add('traced');
  measure();
  addEventListener('resize', () => { measure(); onScroll(); });
  document.fonts?.ready.then(() => { measure(); onScroll(); });
}
addEventListener('scroll', onScroll, { passive: true });
frame();

if (!reduce) {
  /* Case studies: each part arrives in reading order. Only cases below the fold at load are held back. */
  const reveal = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        $$('.pre', e.target).forEach((el) => el.classList.remove('pre'));
        reveal.unobserve(e.target);
      }
    },
    { threshold: 0.12 },
  );
  for (const c of $$('.case')) {
    if (c.getBoundingClientRect().top < innerHeight) continue;
    const parts = [c.querySelector('.case-head'), ...$$('.spec > div', c), c.querySelector('.flow')].filter(Boolean) as HTMLElement[];
    parts.forEach((el, i) => { el.style.setProperty('--d', String(i)); el.classList.add('rv', 'pre'); });
    reveal.observe(c);
  }

  /* Headline numbers count up while their drawing builds. */
  const run = (fact: HTMLElement) => {
    const b = fact.querySelector<HTMLElement>('[data-count]');
    const viz = fact.querySelector<HTMLElement>('.fviz');
    viz?.classList.add('go');
    if (!b) return;
    const m = (b.getAttribute('aria-label') ?? '').match(/^(\D*)(\d+)(.*)$/);
    if (!m) return;
    const [, pre, num, suf] = m;
    const to = Number(num), t0 = performance.now(), dur = 1400;
    const tick = (t: number) => {
      const k = clamp((t - t0) / dur), e = 1 - Math.pow(1 - k, 4);
      b.textContent = pre + Math.round(to * e) + suf;
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const counter = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        counter.unobserve(e.target);
        setTimeout(() => run(e.target as HTMLElement), 150);
      }
    },
    { threshold: 0.5 },
  );
  for (const f of $$('.fact')) {
    if (f.getBoundingClientRect().top < innerHeight * 0.9) continue; // already on screen: leave it finished
    const b = f.querySelector<HTMLElement>('[data-count]');
    const m = b?.textContent?.match(/^(\D*)(\d+)(.*)$/);
    if (b && m) b.textContent = m[1] + '0' + m[3];
    f.querySelector('.fviz')?.classList.add('armed');
    counter.observe(f);
  }
}
