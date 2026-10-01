(function () {
  "use strict";

  var S = window.SITE || {};

  /* ---- Year ------------------------------------------------------------ */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Contact cards (driven by site.config.js) ------------------------ */
  function card(label, value, href) {
    var tag = href ? "a" : "div";
    var el = document.createElement(tag);
    el.className = "contact-card";
    if (href) {
      el.href = href;
      if (href.indexOf("http") === 0) {
        el.target = "_blank";
        el.rel = "noopener noreferrer";
      }
    }
    el.innerHTML =
      '<span class="c-label"></span><span class="c-value"></span>';
    el.querySelector(".c-label").textContent = label;
    el.querySelector(".c-value").textContent = value;
    return el;
  }

  var grid = document.getElementById("contactGrid");
  if (grid) {
    if (S.email) grid.appendChild(card("Email", S.email, "mailto:" + S.email));
    if (S.phone) {
      grid.appendChild(
        card("Phone", S.phone, "tel:" + S.phone.replace(/[^\d+]/g, ""))
      );
    }
    if (S.linkedin) grid.appendChild(card("LinkedIn", "View profile", S.linkedin));
    if (S.address) grid.appendChild(card("Office", S.address));
    else if (S.city) grid.appendChild(card("Based in", S.city));
  }

  /* ---- Header "Get in touch" falls back to email when available -------- */
  // (kept as an in-page anchor so the contact section is always reachable)

  /* ---- Sticky header state --------------------------------------------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (nav) nav.classList.toggle("is-stuck", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile menu ------------------------------------------------------ */
  var burger = document.getElementById("burger");
  var links = document.getElementById("navLinks");
  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Open menu");
      }
    });
  }

  /* ---- Scroll reveal ---------------------------------------------------- */
  var items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(items, function (n) {
      n.classList.add("in");
    });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          setTimeout(function () {
            el.classList.add("in");
          }, Math.min(i, 5) * 70);
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    Array.prototype.forEach.call(items, function (n) {
      io.observe(n);
    });
  }

  /* ---- Active nav link -------------------------------------------------- */
  var sections = document.querySelectorAll("main section[id]");
  var navAnchors = document.querySelectorAll(".nav-links a[href^='#']");
  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = "#" + entry.target.id;
          Array.prototype.forEach.call(navAnchors, function (a) {
            a.classList.toggle("active", a.getAttribute("href") === id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    Array.prototype.forEach.call(sections, function (s) {
      spy.observe(s);
    });
  }
})();
