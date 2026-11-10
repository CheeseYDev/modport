/* ==========================================================
   ch3z__ | Discord Staff Portfolio
   Main website functionality

   Handles:
   - Mobile navigation
   - Scroll reveal animations
   - Portfolio tabs
   - Active navigation highlighting
   - Profile image fallbacks

   Server functionality is handled separately by
   servers-loader-20261110-8.js
   ========================================================== */

(() => {
  "use strict";

  console.info("[portfolio] Main script loaded: 2026-11-10");

  /* ==========================================================
     ELEMENTS
     ========================================================== */

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  const navLinks = [
    ...document.querySelectorAll(".nav-link")
  ];

  const tabs = [
    ...document.querySelectorAll(".portfolio-tab")
  ];

  const panels = [
    ...document.querySelectorAll(".portfolio-content")
  ];

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* ==========================================================
     SCROLL REVEAL ANIMATIONS
     ========================================================== */

  document.documentElement.classList.add("js-ready");

  const revealItems = document.querySelectorAll(
    "[data-reveal]"
  );

  if (
    "IntersectionObserver" in window &&
    !reducedMotion
  ) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });

  } else {
    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });
  }


  /* ==========================================================
     MOBILE NAVIGATION
     ========================================================== */

  function closeMenu() {
    if (!menuToggle || !mainNav) return;

    mainNav.classList.remove("is-open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Open navigation"
    );
  }

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation"
          : "Open navigation"
      );
    });


    // Close menu when a navigation link is selected.

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });


    // Close menu using Escape.

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });


    // Close menu when clicking outside it.

    document.addEventListener("click", (event) => {
      const clickedInsideMenu = mainNav.contains(
        event.target
      );

      const clickedToggle = menuToggle.contains(
        event.target
      );

      if (!clickedInsideMenu && !clickedToggle) {
        closeMenu();
      }
    });

  }


  /* ==========================================================
     PORTFOLIO TABS
     ========================================================== */

  function activateTab(tab, moveFocus = false) {
    if (!tab) return;

    const selected = tab.dataset.tab;

    // Update tab buttons.

    tabs.forEach((item) => {
      const active = item === tab;

      item.classList.toggle("active", active);

      item.setAttribute(
        "aria-selected",
        String(active)
      );

      item.tabIndex = active ? 0 : -1;
    });


    // Display the matching portfolio panel.

    panels.forEach((panel) => {
      const matches = panel.dataset.panel === selected;

      panel.hidden = !matches;
    });


    if (moveFocus) {
      tab.focus();
    }
  }


  // Mouse and keyboard interaction.

  tabs.forEach((tab, index) => {

    tab.addEventListener("click", () => {
      activateTab(tab);
    });


    tab.addEventListener("keydown", (event) => {

      let nextIndex = index;

      switch (event.key) {

        case "ArrowRight":
          nextIndex = (index + 1) % tabs.length;
          break;

        case "ArrowLeft":
          nextIndex = (
            index - 1 + tabs.length
          ) % tabs.length;
          break;

        case "Home":
          nextIndex = 0;
          break;

        case "End":
          nextIndex = tabs.length - 1;
          break;

        default:
          return;
      }

      event.preventDefault();

      activateTab(
        tabs[nextIndex],
        true
      );

    });

  });


  // Ensure the initially selected tab is displayed correctly.

  if (tabs.length > 0) {

    const initiallySelected =
      tabs.find((tab) =>
        tab.getAttribute("aria-selected") === "true"
      ) || tabs[0];

    activateTab(initiallySelected);

  }


  /* ==========================================================
     ACTIVE NAVIGATION HIGHLIGHTING
     ========================================================== */

  const sectionTargets = navLinks
    .map((link) => {
      const href = link.getAttribute("href");

      if (!href || !href.startsWith("#")) {
        return null;
      }

      return document.querySelector(href);
    })
    .filter(Boolean);


  if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
      (entries) => {

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio -
              a.intersectionRatio
          )[0];

        if (!visible) return;

        navLinks.forEach((link) => {

          const active =
            link.getAttribute("href") ===
            `#${visible.target.id}`;

          link.classList.toggle(
            "is-active",
            active
          );

        });

      },
      {
        rootMargin: "-28% 0px -56% 0px",
        threshold: [0, 0.1, 0.25, 0.5]
      }
    );

    sectionTargets.forEach((section) => {
      sectionObserver.observe(section);
    });

  }


  /* ==========================================================
     DISCORD PROFILE IMAGE FALLBACK
     ========================================================== */

  const profileImages = document.querySelectorAll(
    "img.profile-avatar, .about-photo img, .contact-profile img"
  );

  profileImages.forEach((image) => {

    image.addEventListener("error", () => {

      // Avoid displaying a broken image icon.

      image.style.visibility = "hidden";

      image.classList.add("image-unavailable");

      // Reveal the initial fallback in the main profile card.

      const initial = image.parentElement
        ?.querySelector(".avatar-initial");

      if (initial) {
        initial.style.display = "grid";
      }

      // Mark the parent so CSS can apply a fallback background.

      image.parentElement
        ?.classList.add("image-unavailable");

      console.warn(
        "[portfolio] A profile image could not be loaded:",
        image.src
      );

    }, {
      once: true
    });

  });


  /* ==========================================================
     INITIALIZATION
     ========================================================== */

  console.info("[portfolio] Navigation initialized.");

  console.info("[portfolio] Portfolio tabs initialized.");

  console.info("[portfolio] Scroll animations initialized.");

  console.info("[portfolio] Main website initialization complete.");

})();