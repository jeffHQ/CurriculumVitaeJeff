// Interacciones: viaje del bus, contadores, grafo de habilidades y terminal.
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const cv = window.CV;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Numeración automática de capítulos
  document.querySelectorAll("main .chapter .num").forEach((n, i) => { n.textContent = String(i + 1).padStart(2, "0"); });

  /* ================= 1. Contadores ================= */
  (function stats() {
    const box = $("#stats"); if (!box) return;
    const skills = new Set(cv.skills.filter((g) => g.group !== "Idiomas").flatMap((g) => g.items));
    const data = [
      [cv.certifications.length, "Certificaciones"],
      [skills.size, "Tecnologías y herramientas"],
      [cv.experience.length, "Experiencias profesionales"],
      [cv.volunteering.length, "Roles de liderazgo"],
      [cv.achievements.length, "Primer lugar"]
    ];
    box.innerHTML = data.map(([n, l]) => `<div class="stat"><b data-n="${n}">0</b><span>${esc(l)}</span></div>`).join("");
    const run = (el) => {
      const target = +el.dataset.n; if (reduce) { el.textContent = target; return; }
      const t0 = performance.now(), dur = 1400;
      const f = (now) => {
        const p = clamp((now - t0) / dur, 0, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(f);
      };
      requestAnimationFrame(f);
    };
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.querySelectorAll("b").forEach(run); io.unobserve(e.target); }
    }), { threshold: 0.5 });
    io.observe(box);
  })();

  /* ================= 2. Viaje del bus ================= */
  (function journey() {
    const sec = $("#ruta"), svg = $("#jsvg"), road = $("#jroad"), card = $("#jcard");
    if (!sec || !svg) return;
    const J = cv.journey, n = J.length, NS = "http://www.w3.org/2000/svg";
    const mk = (tag, attrs, parent) => {
      const el = document.createElementNS(NS, tag);
      for (const k in attrs) el.setAttribute(k, attrs[k]);
      (parent || svg).appendChild(el); return el;
    };
    let path, L, prog, bus, stops = [], fr = [], active = -1, W = 0, H = 190;

    const build = () => {
      svg.innerHTML = ""; stops = [];
      W = road.clientWidth; svg.setAttribute("viewBox", `0 0 ${W} ${H}`); svg.setAttribute("width", W); svg.setAttribute("height", H);
      const pad = 30, amp = 38, pts = [];
      for (let i = 0; i <= 160; i++) {
        const x = pad + ((W - 2 * pad) * i) / 160;
        pts.push([x, H / 2 + amp * Math.sin((i / 160) * Math.PI * 3)]);
      }
      const d = "M" + pts.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" L");
      mk("path", { d, fill: "none", stroke: "var(--line)", "stroke-width": 18, "stroke-linecap": "round" });
      path = mk("path", { d, fill: "none", stroke: "#fff", "stroke-width": 2, "stroke-dasharray": "10 10" });
      L = path.getTotalLength();
      prog = mk("path", { d, fill: "none", stroke: "var(--accent)", "stroke-width": 4, "stroke-linecap": "round", "stroke-dasharray": L, "stroke-dashoffset": L });
      fr = J.map((_, i) => 0.04 + (0.92 * i) / (n - 1));
      J.forEach((j, i) => {
        const pt = path.getPointAtLength(fr[i] * L);
        const g = mk("g", {});
        const c = mk("circle", { cx: pt.x, cy: pt.y, r: 9, fill: "var(--bg)", stroke: "var(--muted)", "stroke-width": 3 }, g);
        const up = i % 2 === 0;
        const t = mk("text", { x: pt.x, y: pt.y + (up ? -20 : 32), "text-anchor": "middle", "font-size": 13, "font-weight": 600, fill: "var(--muted)" }, g);
        t.textContent = j.year; stops.push({ c, t });
      });
      bus = mk("g", {});
      bus.innerHTML = `<rect x="-24" y="-21" width="48" height="22" rx="6" fill="#00bfff"/>
        <rect x="-19" y="-17" width="9" height="8" rx="1.5" fill="#fff"/><rect x="-7" y="-17" width="9" height="8" rx="1.5" fill="#fff"/>
        <rect x="5" y="-17" width="9" height="8" rx="1.5" fill="#fff"/><rect x="16" y="-17" width="6" height="14" rx="1.5" fill="#e8f9ff"/>
        <circle cx="-12" cy="2" r="4.6" fill="#231f20"/><circle cx="12" cy="2" r="4.6" fill="#231f20"/>
        <circle cx="-12" cy="2" r="1.6" fill="#fff"/><circle cx="12" cy="2" r="1.6" fill="#fff"/>`;
      update();
    };

    const showCard = (i) => {
      const j = J[i];
      card.classList.remove("swap"); void card.offsetWidth; card.classList.add("swap");
      card.innerHTML = `${j.logo ? `<img src="${esc(j.logo)}" alt="" class="jlogo">` : `<span class="jtrophy" aria-hidden="true">🏆</span>`}
        <div><p class="period">${esc(j.year)} · ${i + 1}/${n}</p><h3>${esc(j.title)}</h3><p class="org">${esc(j.sub)}</p><p>${esc(j.text)}</p></div>`;
    };

    const update = () => {
      if (!path) return;
      const r = sec.getBoundingClientRect();
      const p = clamp(-r.top / (sec.offsetHeight - innerHeight), 0, 1);
      const len = p * L;
      const pt = path.getPointAtLength(len), a = path.getPointAtLength(clamp(len - 3, 0, L)), b = path.getPointAtLength(clamp(len + 3, 0, L));
      const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      bus.setAttribute("transform", `translate(${pt.x.toFixed(1)},${(pt.y - 3).toFixed(1)}) rotate(${ang.toFixed(1)})`);
      prog.setAttribute("stroke-dashoffset", (L - len).toFixed(1));
      let idx = 0; fr.forEach((f, i) => { if (p >= f - 0.015) idx = i; });
      stops.forEach((s, i) => {
        const on = p >= fr[i] - 0.015;
        s.c.setAttribute("fill", on ? "var(--accent)" : "var(--bg)");
        s.c.setAttribute("stroke", on ? "var(--accent-text)" : "var(--muted)");
        s.t.setAttribute("fill", i === idx ? "var(--accent-text)" : "var(--muted)");
      });
      if (idx !== active) { active = idx; showCard(idx); }
    };

    let ticking = false;
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { update(); ticking = false; }); } }, { passive: true });
    let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { active = -1; build(); }, 150); });
    build();
  })();

  /* ================= 3. Grafo de habilidades ================= */
  (function graph() {
    const canvas = $("#graph"); if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const COL = ["#00bfff", "#00789e", "#231f20", "#4c6ef5", "#7b8794"];
    let W = 0, H = 0, dpr = 1, nodes = [], links = [], hover = null, drag = null, visible = false, raf = 0, alpha = 1;
    const byLabel = {};

    const init = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = canvas.parentElement.clientWidth; H = Math.round(clamp(W * 0.85, 480, 660));
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = []; links = []; Object.keys(byLabel).forEach((k) => delete byLabel[k]);
      const add = (o) => { o.x = W / 2 + (Math.random() - 0.5) * 200; o.y = H / 2 + (Math.random() - 0.5) * 200; o.vx = o.vy = 0; o.i = nodes.length; nodes.push(o); return o; };
      const center = add({ label: "Jeffry", r: 22, color: COL[2], kind: 0, fixed: true }); center.x = W / 2; center.y = H / 2;
      cv.skills.forEach((g, gi) => {
        const hub = add({ label: g.group, r: 13, color: COL[gi % COL.length], kind: 1 });
        links.push({ a: center, b: hub, len: Math.min(190, W * 0.3), k: 0.05 });
        g.items.forEach((it) => {
          const leaf = add({ label: it, r: 5, color: COL[gi % COL.length], kind: 2 });
          byLabel[it] = leaf; links.push({ a: hub, b: leaf, len: 88, k: 0.05 });
        });
      });
      (cv.graphLinks || []).forEach(([x, y]) => { if (byLabel[x] && byLabel[y]) links.push({ a: byLabel[x], b: byLabel[y], len: 130, k: 0.008, cross: true }); });
      nodes.forEach((n) => { n.nb = new Set([n.i]); });
      links.forEach((l) => { l.a.nb.add(l.b.i); l.b.nb.add(l.a.i); });
      alpha = 1;
    };

    const tick = () => {
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]; let dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy || 1;
          if (d2 > 90000) continue;
          const f = (5200 / d2) * alpha, d = Math.sqrt(d2); dx /= d; dy /= d;
          a.vx += dx * f; a.vy += dy * f; b.vx -= dx * f; b.vy -= dy * f;
        }
      }
      for (const l of links) {
        const dx = l.b.x - l.a.x, dy = l.b.y - l.a.y, d = Math.hypot(dx, dy) || 1, f = (d - l.len) * l.k;
        const fx = (dx / d) * f, fy = (dy / d) * f;
        l.a.vx += fx; l.a.vy += fy; l.b.vx -= fx; l.b.vy -= fy;
      }
      for (const n of nodes) {
        if (n.fixed || n === drag) { n.vx = n.vy = 0; continue; }
        n.vx += (W / 2 - n.x) * 0.0007; n.vy += (H / 2 - n.y) * 0.0007;
        n.vx += (Math.random() - 0.5) * 0.05; n.vy += (Math.random() - 0.5) * 0.05;
        n.vx *= 0.84; n.vy *= 0.84; n.x += n.vx; n.y += n.vy;
        n.x = clamp(n.x, 14, W - 14); n.y = clamp(n.y, 14, H - 14);
      }
      alpha = Math.max(alpha * 0.985, 0.25);
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const dim = (n) => hover && !hover.nb.has(n.i);
      for (const l of links) {
        const off = dim(l.a) || dim(l.b) || (hover && hover !== l.a && hover !== l.b);
        ctx.strokeStyle = hover && !off ? "rgba(0,150,200,.9)" : off ? "rgba(120,130,140,.08)" : l.cross ? "rgba(0,150,200,.35)" : "rgba(120,130,140,.28)";
        ctx.lineWidth = hover && !off ? 2 : 1; ctx.setLineDash(l.cross ? [4, 4] : []);
        ctx.beginPath(); ctx.moveTo(l.a.x, l.a.y); ctx.lineTo(l.b.x, l.b.y); ctx.stroke();
      }
      ctx.setLineDash([]);
      for (const n of nodes) {
        const off = dim(n); ctx.globalAlpha = off ? 0.2 : 1;
        ctx.fillStyle = n.color; ctx.beginPath(); ctx.arc(n.x, n.y, n.r + (n === hover ? 3 : 0), 0, 7); ctx.fill();
        if (n.kind < 2) { ctx.strokeStyle = "rgba(0,191,255,.3)"; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 5, 0, 7); ctx.stroke(); }
        ctx.fillStyle = "#231f20"; ctx.textAlign = "center";
        ctx.font = (n.kind === 2 ? "500 11px " : "700 13px ") + "system-ui, sans-serif";
        if (n.kind === 0) { ctx.fillStyle = "#fff"; ctx.fillText("JH", n.x, n.y + 4); }
        else ctx.fillText(n.label, n.x, n.y + n.r + 14);
        ctx.globalAlpha = 1;
      }
    };

    const loop = () => { tick(); draw(); raf = visible ? requestAnimationFrame(loop) : 0; };
    const pos = (e) => { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    const pick = (x, y) => { let best = null, bd = 1e9; for (const n of nodes) { const d = Math.hypot(n.x - x, n.y - y); if (d < n.r + 12 && d < bd) { bd = d; best = n; } } return best; };
    canvas.addEventListener("pointermove", (e) => {
      const [x, y] = pos(e);
      if (drag) { drag.x = x; drag.y = y; alpha = 0.6; return; }
      hover = pick(x, y); canvas.style.cursor = hover ? "grab" : "default";
    });
    canvas.addEventListener("pointerleave", () => { hover = null; });
    canvas.addEventListener("pointerdown", (e) => {
      const [x, y] = pos(e), n = pick(x, y); hover = n;
      if (n && e.pointerType === "mouse") { drag = n; canvas.setPointerCapture(e.pointerId); canvas.style.cursor = "grabbing"; }
    });
    const up = () => { drag = null; canvas.style.cursor = hover ? "grab" : "default"; };
    canvas.addEventListener("pointerup", up); canvas.addEventListener("pointercancel", up);
    canvas.style.touchAction = "pan-y";

    init();
    let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(init, 200); });
    new IntersectionObserver((es) => {
      visible = es[0].isIntersecting;
      if (visible && !raf) { if (reduce) { for (let i = 0; i < 300; i++) tick(); draw(); } else raf = requestAnimationFrame(loop); }
    }).observe(canvas);
  })();

  /* ================= 4. Terminal ================= */
  (function terminal() {
    const out = $("#term-out"), inp = $("#term-in"), form = $("#term-form"), chips = $("#term-chips"), box = $("#term");
    if (!out) return;
    const hist = []; let hi = 0;
    const line = (t, c) => { const d = document.createElement("div"); d.className = "ln" + (c ? " " + c : ""); d.textContent = t; out.appendChild(d); out.scrollTop = out.scrollHeight; };
    const lines = (arr, c) => arr.forEach((t) => line(t, c));
    const roleLines = (e) => [`${e.period}  ·  ${e.role} @ ${e.org}`, ...(e.bullets || (e.text ? [e.text] : [])).map((b) => "  • " + b), ""];

    const cmds = {
      help: () => lines(["Comandos disponibles:", "  whoami        quién soy", "  about         perfil profesional", "  experience    experiencia laboral", "  education     estudios", "  skills        habilidades por área", "  achievements  logros", "  community     voluntariado y liderazgo", "  certs         certificaciones", "  contact       cómo encontrarme", "  clear         limpiar pantalla", "  (prueba también: sudo hire jeffry)"], "dim"),
      whoami: () => lines(["Jeffry Arturo Hilario Quintana", cv.headline, cv.location]),
      about: () => line(cv.about),
      experience: () => cv.experience.forEach((e) => lines(roleLines(e))),
      education: () => cv.education.forEach((e) => lines(roleLines(e))),
      skills: () => cv.skills.forEach((g) => line(`${g.group.padEnd(20)}${g.items.join(", ")}`)),
      achievements: () => cv.achievements.forEach((a) => lines([`${a.period}  ·  ${a.title} — ${a.org}`, "  " + a.text])),
      community: () => cv.volunteering.forEach((e) => lines(roleLines(e))),
      certs: () => cv.certifications.forEach((c) => line(`${c.date.padEnd(10)}${c.title} — ${c.org}`)),
      contact: () => cv.contact.forEach((c) => line(`${c.label.padEnd(10)}${c.value}${c.href ? "  " + c.href : ""}`)),
      ls: () => line("about  experience  education  skills  achievements  community  certs  contact"),
      date: () => line(new Date().toLocaleString("es-PE")),
      clear: () => { out.innerHTML = ""; },
      "sudo hire jeffry": () => {
        lines(["[sudo] verificando credenciales…", "✔ Permiso concedido.", "✔ Contratando a Jeffry… 100%", "", "Excelente decisión. Escríbele por LinkedIn:"], "ok");
        const c = cv.contact.find((x) => x.label === "LinkedIn"); if (c) line("  " + c.href, "ok");
      }
    };
    cmds.sudo = () => line("Uso: sudo hire jeffry", "dim");
    const names = Object.keys(cmds).filter((k) => k !== "sudo");

    const run = (raw) => {
      const cmd = raw.trim().toLowerCase().replace(/\s+/g, " ");
      if (!cmd) return;
      line("jeffry@cv:~$ " + raw.trim(), "cmd");
      if (cmds[cmd]) cmds[cmd]();
      else line(`comando no encontrado: ${cmd}. Escribe "help".`, "err");
    };

    form.addEventListener("submit", (e) => { e.preventDefault(); const v = inp.value; if (v.trim()) { hist.push(v); hi = hist.length; } run(v); inp.value = ""; });
    inp.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") { e.preventDefault(); if (hi > 0) inp.value = hist[--hi]; }
      else if (e.key === "ArrowDown") { e.preventDefault(); hi = Math.min(hi + 1, hist.length); inp.value = hist[hi] || ""; }
      else if (e.key === "Tab") { e.preventDefault(); const m = names.filter((n) => n.startsWith(inp.value.toLowerCase())); if (m.length === 1) inp.value = m[0]; }
    });
    box.addEventListener("click", () => inp.focus({ preventScroll: true }));

    ["help", "experience", "skills", "achievements", "certs", "contact", "sudo hire jeffry"].forEach((c) => {
      const b = document.createElement("button"); b.type = "button"; b.textContent = c;
      b.addEventListener("click", () => run(c)); chips.appendChild(b);
    });

    line("Jeffry OS v1.0 — CV interactivo", "dim");
    line('Escribe "help" o toca un comando abajo.', "dim");

    // Demo automática al llegar a la sección
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    new IntersectionObserver(async (es, io) => {
      if (!es[0].isIntersecting) return; io.disconnect();
      if (reduce) { run("whoami"); return; }
      for (const c of ["whoami", "skills"]) {
        for (const ch of c) { inp.value += ch; await sleep(70); }
        await sleep(250); inp.value = ""; run(c); await sleep(700);
      }
    }, { threshold: 0.6 }).observe(box);
  })();
})();
