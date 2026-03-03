/*
  script.js
  - Smooth scrolling for nav links
  - Highlight active nav section while scrolling (IntersectionObserver)
  - Back to top button appears after scrolling
  - Mobile nav toggle
*/

(function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const navLinksContainer = document.getElementById("navLinks");
  const navToggle = document.querySelector(".nav-toggle");
  const backToTopBtn = document.getElementById("backToTop");

  const HEADER_OFFSET = 84;

  function smoothScrollToId(id) {
    const target = document.querySelector(id);
    if (!target) return;

    const y = target.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;

    window.scrollTo({ top: y, behavior: "smooth" });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      e.preventDefault();
      smoothScrollToId(href);

      if (navLinksContainer.classList.contains("open")) {
        navLinksContainer.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  const brand = document.querySelector(".brand");
  if (brand) {
    brand.addEventListener("click", (e) => {
      const href = brand.getAttribute("href");
      if (href === "#top") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  const sections = ["#problem", "#research", "#design", "#prototype", "#game", "#next"]
    .map((id) => document.querySelector(id))
    .filter(Boolean);

  const linkBySectionId = new Map();
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) linkBySectionId.set(href, link);
  });

  function setActiveLink(sectionId) {
    navLinks.forEach((l) => l.classList.remove("active"));
    const active = linkBySectionId.get(sectionId);
    if (active) active.classList.add("active");
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) setActiveLink("#" + visible.target.id);
    },
    {
      threshold: [0.2, 0.35, 0.5, 0.65],
      rootMargin: "-20% 0px -65% 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));

  function updateBackToTop() {
    if (window.scrollY > 600) backToTopBtn.classList.add("show");
    else backToTopBtn.classList.remove("show");
  }

  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  navToggle.addEventListener("click", () => {
    const isOpen = navLinksContainer.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (e) => {
    const clickedInsideNav = e.target.closest(".nav");
    if (!clickedInsideNav && navLinksContainer.classList.contains("open")) {
      navLinksContainer.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  function setInitialActive() {
    const pos = window.scrollY + HEADER_OFFSET + 10;
    let current = "#problem";
    sections.forEach((sec) => {
      if (pos >= sec.offsetTop) current = "#" + sec.id;
    });
    setActiveLink(current);
  }

  window.addEventListener("load", setInitialActive);
})();