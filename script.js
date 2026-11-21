(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const cv = window.CV;

  const item = (e) => `
    <article class="item reveal">
      <p class="period">${esc(e.period)}</p>
      <h3>${esc(e.role)}</h3>
      <p class="org">${esc(e.org)}</p>
      ${e.text ? `<p>${esc(e.text)}</p>` : ""}
      ${e.bullets ? `<ul class="bullets">${e.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
      ${e.tags ? `<div class="chips small">${e.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : ""}
    </article>`;

  $("#headline").textContent = cv.headline;
  $("#location").textContent = cv.location;
  $("#about").textContent = cv.about;
  $("#experience").innerHTML = cv.experience.map(item).join("");
  $("#education").innerHTML = cv.education.map(item).join("");
  $("#volunteering").innerHTML = cv.volunteering.map(item).join("");
  $("#certs").innerHTML = cv.certifications.map((c) => `
    <article class="card reveal"><p class="period">${esc(c.date)}</p><h3>${esc(c.title)}</h3><p>${esc(c.org)}</p>
      ${c.link ? `<a href="${esc(c.link)}" target="_blank" rel="noopener">Ver credencial →</a>` : ""}</article>`).join("");
  $("#skills").innerHTML = cv.skills.map((g) => `
    <div class="group reveal"><h3>${esc(g.group)}</h3>
      <div class="chips">${g.items.map((i) => `<span>${esc(i)}</span>`).join("")}</div></div>`).join("");
  $("#contact").innerHTML = cv.contact.map((c) =>
    `<li><span>${esc(c.label)}</span>${c.href ? `<a href="${esc(c.href)}" target="_blank" rel="noopener">${esc(c.value)}</a>` : `<b>${esc(c.value)}</b>`}</li>`).join("");
  $("#year").textContent = new Date().getFullYear();

  // Navegación por puntos
  const chapters = [...document.querySelectorAll(".chapter")];
  $("#dots").innerHTML = chapters.map((c) =>
    `<a href="#${c.id}" data-for="${c.id}" aria-label="${esc(c.dataset.title)}"><i>${esc(c.dataset.title)}</i></a>`).join("");

  // Barra de progreso
  const bar = $("#progress");
  const onScroll = () => {
    const h = document.documentElement;
    bar.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Revelado al hacer scroll + capítulo activo
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach((el, i) => {
    if (reduce) el.classList.add("in"); else io.observe(el);
  });

  const co = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) {
      document.querySelectorAll("#dots a").forEach((a) => a.classList.toggle("on", a.dataset.for === e.target.id));
      document.body.dataset.chapter = e.target.id;
    }
  }), { rootMargin: "-45% 0px -45% 0px" });
  chapters.forEach((c) => co.observe(c));
})();
