document.addEventListener("DOMContentLoaded", () => {
  // Fade in on page load
  document.body.classList.add("page-loaded");

  // Smooth page transition for internal links
  const links = document.querySelectorAll("a[href]");

  links.forEach((link) => {
    const href = link.getAttribute("href");

    const isInternalPage =
      href &&
      !href.startsWith("#") &&
      !href.startsWith("http") &&
      !href.startsWith("mailto:") &&
      !href.startsWith("tel:") &&
      !link.hasAttribute("target");

    if (isInternalPage) {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        document.body.classList.remove("page-loaded");
        document.body.classList.add("page-exit");

        setTimeout(() => {
          window.location.href = href;
        }, 200);
      });
    }
  });

  // Back to top button smooth scroll
  const backToTop = document.querySelector(".footer-top");

  if (backToTop) {
    backToTop.addEventListener("click", (e) => {
      const href = backToTop.getAttribute("href");

      if (href === "#" || href === "#top") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }
});