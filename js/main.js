// Behavior only — content lives in data.js, layout in index.html/style.css.
(function () {
  "use strict";

  const d = RESUME_DATA;
  const reducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 啟用 JS 模式：.win 先隱藏，之後依序開窗
  document.body.classList.add("js");

  // --- Character panel ---
  document.getElementById("char-name").textContent = d.about.name;
  document.getElementById("char-level").textContent = "Lv." + d.about.level;
  document.getElementById("char-title").textContent = d.about.title;
  document.getElementById("char-exp-text").textContent =
    d.about.level + " 年實務經驗｜" + d.about.location;

  // --- 開窗動畫：可見視窗依序展開（reduced motion 直接全開） ---
  const visibleWins = () =>
    Array.from(document.querySelectorAll(".win")).filter(
      (w) => !w.classList.contains("tab") || w.classList.contains("active"));
  if (reducedMotion) {
    visibleWins().forEach((w) => w.classList.add("open"));
  } else {
    visibleWins().forEach((w, i) =>
      setTimeout(() => w.classList.add("open"), 120 + i * 110));
  }

  // --- Typewriter（打字內容以 data.js 為準；HTML 內文字為 no-JS fallback） ---
  const intro = document.getElementById("intro-text");
  intro.textContent = "";
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.textContent = "▌";
  intro.appendChild(cursor);
  function typewriter(text, i) {
    if (i > text.length) return;
    intro.insertBefore(
      document.createTextNode(text.charAt(i - 1) || ""), cursor);
    setTimeout(() => typewriter(text, i + 1), 40);
  }
  if (reducedMotion) {
    intro.insertBefore(document.createTextNode(d.about.intro), cursor);
  } else {
    setTimeout(() => typewriter(d.about.intro, 1), 500); // 等對話框開窗完
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
    fill.className = "bar-fill";
    fill.dataset.width = s.level * 10 + "%";
    bar.appendChild(fill);
    const desc = document.createElement("div");
    desc.className = "skill-desc";
    desc.textContent = s.desc;
    li.append(name, bar, desc);
    skillList.appendChild(li);
  });

  // --- 能力條進場：捲到可視範圍才填滿 ---
  const fills = document.querySelectorAll("#skill-list .bar-fill");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    fills.forEach((f) => { f.style.width = f.dataset.width; });
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.style.width = en.target.dataset.width;
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.4 });
    fills.forEach((f) => io.observe(f));
  }

  // --- Experience (quest log) ---
  const log = document.getElementById("quest-log");
  d.experience.forEach((e) => {
    const li = document.createElement("li");
    li.className = "quest";
    const head = document.createElement("div");
    head.className = "quest-head";
    const company = document.createElement("span");
    company.className = "quest-company";
    company.textContent = e.company;
    const period = document.createElement("span");
    period.className = "quest-period";
    period.textContent = e.period;
    head.append(company, period);
    const role = document.createElement("div");
    role.className = "quest-role";
    role.textContent = e.role;
    const desc = document.createElement("div");
    desc.className = "quest-desc";
    desc.textContent = "主線任務：" + e.desc;
    li.append(head, role, desc);
    log.appendChild(li);
  });

  // --- Contact（指令選單） ---
  const contact = document.getElementById("contact-links");
  function cmdItem(href, text, flavor, external) {
    const li = document.createElement("li");
    li.className = "cmd";
    const a = document.createElement("a");
    a.href = href;
    a.textContent = text;
    if (external) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    const f = document.createElement("span");
    f.className = "cmd-flavor";
    f.textContent = flavor;
    li.append(a, f);
    return li;
  }
  contact.append(
    cmdItem("mailto:" + d.contact.email, "Email", d.contact.emailFlavor, false),
    cmdItem(d.contact.linkedin, "LinkedIn", d.contact.linkedinFlavor, true));

  // --- 分頁切換：舊窗收合 → 新窗展開 ---
  const buttons = document.querySelectorAll(".menu-btn");
  const tabs = document.querySelectorAll(".tab");
  let tabTimer = null;
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("active")) return;
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      clearTimeout(tabTimer); // 丟棄前一次未完成的切換，避免雙 active
      const current = document.querySelector(".tab.active");
      const next = document.getElementById("tab-" + btn.dataset.tab);
      const swap = () => {
        tabs.forEach((t) => t.classList.remove("active", "closing", "open"));
        next.classList.add("active");
        void next.offsetWidth; // 強制 reflow，重新觸發開窗動畫
        next.classList.add("open");
      };
      if (reducedMotion) {
        swap();
      } else {
        current.classList.add("closing");
        tabTimer = setTimeout(swap, 170);
      }
    });
  });
})();
