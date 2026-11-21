// Animaciones: red neuronal con paquetes de datos, typing, decode, timeline y glow en tarjetas.
(function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);

  /* ---------- 1. Red neuronal en la portada ---------- */
  const canvas = $("#net");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const hero = canvas.parentElement;
    const LINK = 150;
    let W = 0, H = 0, nodes = [], pulses = [], visible = true, raf = 0;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const r = hero.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(95, (W * H) / 13000));
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: 1.6 + Math.random() * 2.2, hub: Math.random() < 0.12
      }));
      pulses = [];
      if (reduce) draw();
    };

    const spawnPulse = () => {
      for (let tries = 0; tries < 12; tries++) {
        const a = nodes[(Math.random() * nodes.length) | 0];
        const b = nodes[(Math.random() * nodes.length) | 0];
        if (a === b) continue;
        if (Math.hypot(a.x - b.x, a.y - b.y) < LINK) { pulses.push({ a, b, t: 0, s: 0.012 + Math.random() * 0.014 }); return; }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(0,150,200,${(1 - d / LINK) * 0.32})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.beginPath();
        ctx.fillStyle = n.hub ? "rgba(0,191,255,.95)" : "rgba(0,120,158,.55)";
        ctx.arc(n.x, n.y, n.hub ? n.r + 1.6 : n.r, 0, 7);
        ctx.fill();
        if (n.hub) { ctx.strokeStyle = "rgba(0,191,255,.25)"; ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 6, 0, 7); ctx.stroke(); }
      }
      // paquetes de datos viajando por las conexiones
      for (const p of pulses) {
        const x = p.a.x + (p.b.x - p.a.x) * p.t, y = p.a.y + (p.b.y - p.a.y) * p.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 12);
        g.addColorStop(0, "rgba(0,191,255,.95)"); g.addColorStop(1, "rgba(0,191,255,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 12, 0, 7); ctx.fill();
      }
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        const dx = n.x - mouse.x, dy = n.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 120) { n.x += (dx / d) * 1.2; n.y += (dy / d) * 1.2; }
      }
      for (const p of pulses) p.t += p.s;
      pulses = pulses.filter((p) => p.t < 1);
      if (pulses.length < 14 && Math.random() < 0.18) spawnPulse();
      draw();
      raf = visible ? requestAnimationFrame(step) : 0;
    };

    addEventListener("resize", resize);
    hero.addEventListener("pointermove", (e) => { const r = hero.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    hero.addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });
    resize();
    if (!reduce) {
      new IntersectionObserver((es) => {
        visible = es[0].isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(step);
      }).observe(hero);
      raf = requestAnimationFrame(step);
    }
  }

  /* ---------- 2. Typing del titular ---------- */
  const typed = $("#typed");
  const roles = (window.CV && window.CV.roles) || [];
  if (typed && roles.length && !reduce) {
    let ri = 0, ci = 0, del = false;
    const tick = () => {
      const word = roles[ri];
      typed.textContent = word.slice(0, ci);
      let wait = del ? 28 : 70;
      if (!del && ci === word.length) { del = true; wait = 1700; }
      else if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; wait = 350; }
      else ci += del ? -1 : 1;
      setTimeout(tick, wait);
    };
    tick();
  } else if (typed) {
    typed.textContent = (window.CV && window.CV.headline) || "";
  }

  /* ---------- 3. Decode / scramble de títulos ---------- */
  const GLYPHS = "01<>/{}[]#$%&=+*";
  const decode = (el) => {
    const final = el.textContent; const t0 = performance.now(); const dur = 700;
    const f = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      el.textContent = [...final].map((ch, i) =>
        ch === " " || i < p * final.length ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]).join("");
      if (p < 1) requestAnimationFrame(f); else el.textContent = final;
    };
    requestAnimationFrame(f);
  };
  if (!reduce) {
    const dio = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { decode(e.target); dio.unobserve(e.target); }
    }), { threshold: 0.6 });
    document.querySelectorAll("h2").forEach((h) => dio.observe(h));
  }

  /* ---------- 4. Línea de tiempo que se dibuja con el scroll ---------- */
  const lines = [...document.querySelectorAll(".timeline")];
  const paint = () => {
    const vh = innerHeight;
    for (const t of lines) {
      const r = t.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (vh * 0.65 - r.top) / r.height));
      t.style.setProperty("--p", reduce ? 1 : p.toFixed(3));
    }
  };
  addEventListener("scroll", paint, { passive: true }); addEventListener("resize", paint); paint();

  /* ---------- 5. Chips escalonados + glow que sigue al cursor ---------- */
  document.querySelectorAll(".chips").forEach((ch) =>
    [...ch.children].forEach((s, i) => { s.style.transitionDelay = i * 60 + "ms"; }));
  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest && e.target.closest(".card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", e.clientX - r.left + "px");
    card.style.setProperty("--my", e.clientY - r.top + "px");
  });
})();
