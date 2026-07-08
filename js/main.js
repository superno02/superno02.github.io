// Behavior only — content lives in data.js, layout in index.html/style.css.
(function () {
  "use strict";

  const d = RESUME_DATA;
  const reducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Character panel ---
  document.getElementById("char-name").textContent = d.about.name;
  document.getElementById("char-level").textContent = "Lv." + d.about.level;
  document.getElementById("char-title").textContent = d.about.title;
  document.getElementById("char-exp-text").textContent =
    d.about.level + " 年實務經驗｜" + d.about.location;

  // --- Typewriter intro (instant when reduced motion) ---
  const intro = document.getElementById("intro-text");
  const cursor = intro.querySelector(".cursor");
  function typewriter(text, i) {
    if (i > text.length) return;
    intro.insertBefore(
      document.createTextNode(text.charAt(i - 1) || ""), cursor);
    setTimeout(() => typewriter(text, i + 1), 45);
  }
  if (reducedMotion) {
    intro.insertBefore(document.createTextNode(d.about.intro), cursor);
  } else {
    typewriter(d.about.intro, 1);
  }

  // --- Skills ---
  const skillList = document.getElementById("skill-list");
  d.skills.forEach((s) => {
    const li = document.createElement("li");
    const name = document.createElement("div");
    name.className = "skill-name";
    const label = document.createElement("span");
    label.textContent = s.name;
    const lv = document.createElement("span");
    lv.className = "skill-lv";
    lv.textContent = "Lv." + s.level;
    name.append(label, lv);
    const bar = document.createElement("div");
    bar.className = "bar";
    const fill = document.createElement("div");
    fill.className = "bar-fill animate";
    fill.dataset.width = s.level * 10 + "%";
    bar.appendChild(fill);
    const desc = document.createElement("div");
    desc.className = "skill-desc";
    desc.textContent = s.desc;
    li.append(name, bar, desc);
    skillList.appendChild(li);
  });

  // Animate bars after first paint so the width transition is visible
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.querySelectorAll(".bar-fill").forEach((f) => {
      f.style.width = f.dataset.width;
    });
  }));

  // --- Experience (quest log) ---
  const log = document.getElementById("quest-log");
  d.experience.forEach((e) => {
    const li = document.createElement("li");
    li.className = "quest";
    const head = document.createElement("div");
    head.className = "quest-head";
    const company = document.createElement("span");
    company.className = "quest-company";
    company.textContent = "★ " + e.company;
    const period = document.createElement("span");
    period.className = "quest-period";
    period.textContent = e.period;
    head.append(company, period);
    const role = document.createElement("div");
    role.className = "quest-role";
    role.textContent = e.role;
    const desc = document.createElement("div");
    desc.className = "quest-desc";
    desc.textContent = e.desc;
    li.append(head, role, desc);
    log.appendChild(li);
  });

  // --- Contact ---
  const contact = document.getElementById("contact-links");
  const mailLink = document.createElement("a");
  mailLink.href = "mailto:" + d.contact.email;
  mailLink.textContent = "✉ " + d.contact.email;
  const sep = document.createTextNode("　｜　");
  const linkedinLink = document.createElement("a");
  linkedinLink.href = d.contact.linkedin;
  linkedinLink.target = "_blank";
  linkedinLink.rel = "noopener noreferrer";
  linkedinLink.textContent = "LinkedIn ↗";
  contact.append(mailLink, sep, linkedinLink);

  // --- Tab switching (game menu) ---
  const buttons = document.querySelectorAll(".menu-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".tab").forEach((t) =>
        t.classList.remove("active"));
      document.getElementById("tab-" + btn.dataset.tab)
        .classList.add("active");
    });
  });
})();
