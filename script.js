(() => {
  "use strict";

  document.documentElement.classList.add("js-ready");

  const menuButton = document.getElementById("menuButton");
  const primaryNav = document.getElementById("primaryNav");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function closeMenu() {
    if (!menuButton || !primaryNav) return;
    primaryNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  }

  if (menuButton && primaryNav) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      primaryNav.classList.toggle("open", !isOpen);
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    });

    navLinks.forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
    document.addEventListener("click", (event) => {
      if (!primaryNav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
  }

  const tabs = [...document.querySelectorAll(".expertise-tab")];
  const panels = [...document.querySelectorAll(".expertise-panel")];

  function activateTab(name, moveFocus = false) {
    tabs.forEach((tab) => {
      const selected = tab.dataset.tab === name;
      tab.classList.toggle("active", selected);
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && moveFocus) tab.focus();
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== name;
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab.dataset.tab));
    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = tabs.length - 1;
      else return;
      event.preventDefault();
      activateTab(tabs[nextIndex].dataset.tab, true);
    });
  });

  const avatarImages = [...document.querySelectorAll(".profile-avatar, .contact-profile img")];
  avatarImages.forEach((image) => {
    image.addEventListener("error", () => {
      const wrapper = image.closest(".avatar-wrap");
      if (wrapper) wrapper.classList.add("image-failed");
      else {
        image.style.display = "none";
        image.closest(".contact-profile")?.classList.add("image-failed");
      }
    }, { once: true });
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

    document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));

    if (sections.length) {
      const navObserver = new IntersectionObserver((entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!current) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute("href") === `#${current.target.id}`;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }, { rootMargin: "-30% 0px -58% 0px", threshold: [0, 0.15, 0.35, 0.6] });

      sections.forEach((section) => navObserver.observe(section));
    }
  } else {
    document.querySelectorAll("[data-reveal]").forEach((element) => element.classList.add("is-visible"));
  }

  const year = document.getElementById("currentYear");
  if (year) year.textContent = String(new Date().getFullYear());
})();
