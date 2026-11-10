(() => {
  "use strict";

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const tabs = [...document.querySelectorAll(".portfolio-tab")];
  const panels = [...document.querySelectorAll(".portfolio-content")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reveal elements as they enter the viewport.
  document.documentElement.classList.add("js-ready");
  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Mobile navigation.
  function closeMenu() {
    if (!menuToggle || !mainNav) return;
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
    mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
    document.addEventListener("click", (event) => {
      if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });
  }

  // Switch between the three portfolio areas.
  function activateTab(tab, moveFocus = false) {
    const selected = tab.dataset.tab;
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== selected;
    });
    if (moveFocus) tab.focus();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = tabs.length - 1;
      else return;
      event.preventDefault();
      activateTab(tabs[nextIndex], true);
    });
  });

  // Keep the navigation highlight aligned with the section in view.
  const sectionTargets = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${visible.target.id}`;
        link.classList.toggle("is-active", active);
      });
    }, { rootMargin: "-28% 0px -56% 0px", threshold: [0, .1, .25, .5] });
    sectionTargets.forEach((section) => sectionObserver.observe(section));
  }

  // Gracefully fall back to the initial avatar if the Discord CDN image is unavailable.
  document.querySelectorAll("img.profile-avatar, .about-photo img, .contact-profile img").forEach((image) => {
    image.addEventListener("error", () => {
      image.style.visibility = "hidden";
      if (image.classList.contains("contact-profile")) return;
    }, { once: true });
  });
})();
