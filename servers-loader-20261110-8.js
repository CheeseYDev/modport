(() => {
  "use strict";

  console.info("[portfolio] build: server-grid-fit-20261110-8");

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

  // Add one entry for every server you want to show.
  // serverId is the numeric Discord server ID.
  // inviteCode is optional. It can be a code or a full discord.gg invite URL.
  // name is optional and is only used as a display fallback if Discord cannot return the name.
  const SERVERS = [
    {
      serverId: "1467537541686231291",
      inviteCode: "QHNRWx4Fdz",
    },
    {
      serverId: "1360908527207583784",
      inviteCode: "e8scdpHZbz",
    },
  ];

  const serversSection = document.getElementById("servers");
  const serverTrack = document.getElementById("serverTrack");
  const serverVerb = document.getElementById("serverVerb");
  const serverVerbAnnouncement = document.getElementById("serverVerbAnnouncement");

  // Animate the heading. This runs even if no servers are configured yet.
  if (serverVerb && !reducedMotion) {
    const verbs = ["MODERATED", "ADMINISTERED", "MANAGED"];
    let wordIndex = 0;
    let charIndex = verbs[0].length;
    let deleting = false;

    const typeNext = () => {
      const current = verbs[wordIndex];
      if (!deleting) {
        charIndex += 1;
        serverVerb.textContent = current.slice(0, charIndex);
        if (charIndex >= current.length) {
          if (serverVerbAnnouncement) serverVerbAnnouncement.textContent = current;
          deleting = true;
          window.setTimeout(typeNext, 1600);
          return;
        }
        window.setTimeout(typeNext, 105);
        return;
      }

      charIndex -= 1;
      serverVerb.textContent = current.slice(0, Math.max(0, charIndex));
      if (charIndex <= 0) {
        wordIndex = (wordIndex + 1) % verbs.length;
        deleting = false;
        window.setTimeout(typeNext, 260);
        return;
      }
      window.setTimeout(typeNext, 45);
    };

    window.setTimeout(typeNext, 1700);
  }

  const formatCount = (value) => {
    if (!Number.isFinite(value) || value < 0) return "Not available";
    return `~${new Intl.NumberFormat().format(value)}`;
  };

  const safeServerId = (value) => /^\d{17,20}$/.test(String(value || "").trim());

  function normalizeInviteCode(value) {
    const raw = String(value || "").trim();
    if (!raw) return "";
    const match = raw.match(/(?:https?:\/\/)?(?:www\.)?(?:discord\.gg|discord(?:app)?\.com\/invite)\/([A-Za-z0-9_-]+)/i);
    const code = match ? match[1] : raw;
    return /^[A-Za-z0-9_-]{2,100}$/.test(code) ? code : "";
  }

  function discordImageUrl(kind, serverId, hash, size = 256) {
    if (!hash || !/^[A-Za-z0-9_]+$/.test(hash)) return "";
    const extension = hash.startsWith("a_") ? "gif" : "png";
    return `https://cdn.discordapp.com/${kind}/${serverId}/${hash}.${extension}?size=${size}`;
  }

  // The Discord REST API is called by a small Render backend, not directly
  // from the visitor's browser. Set this URL to your Render API service URL.
  const SERVER_API_BASE = "https://modport.onrender.com";
  console.info(`[servers] API base: ${SERVER_API_BASE}`);

  async function getServerDetails(config) {
    const serverId = String(config.serverId || "").trim();
    if (!safeServerId(serverId)) {
      throw new Error("Invalid server ID. Use the numeric ID copied with Discord Developer Mode.");
    }

    const inviteCode = normalizeInviteCode(config.inviteCode);
    if (!inviteCode) {
      throw new Error("No valid invite code is configured for this server. Add inviteCode to its SERVERS entry.");
    }

    const query = new URLSearchParams({ invite: inviteCode });
    const base = SERVER_API_BASE.replace(/\/$/, "");
    const endpoint = `${base}/api/servers/${encodeURIComponent(serverId)}?${query.toString()}`;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);

    console.info(`[servers] Requesting ${endpoint}`);
    console.info(`[servers] Page origin: ${window.location.origin}`);

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        mode: "cors",
        credentials: "omit",
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal: controller.signal,
      });

      let payload;
      try {
        payload = await response.json();
      } catch {
        throw new Error(`The server API returned a non-JSON response (HTTP ${response.status}). Check the API URL and Render deployment.`);
      }

      if (!response.ok || payload?.ok !== true) {
        const parts = [payload?.error || `Server API request failed (HTTP ${response.status}).`];
        if (payload?.diagnostics) parts.push(`Discord diagnostics: ${payload.diagnostics}`);
        throw new Error(parts.join(" "));
      }

      if (String(payload.id || "") !== serverId) {
        throw new Error(`Server ID mismatch. Requested ${serverId}, but the API returned ${payload.id || "no ID"}.`);
      }

      const details = {
        id: serverId,
        name: payload.name || config.name || "Discord server",
        icon: payload.icon || null,
        banner: payload.banner || null,
        members: payload.members ?? null,
        online: payload.online ?? null,
        inviteCode: payload.inviteCode || inviteCode,
        source: payload.source || "Discord",
      };

      console.info(`[servers] Loaded ${details.name} (${details.id}) via ${details.source}.`);
      return details;
    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error("The server API request timed out. Check the Render service logs and try again.");
      }
      if (error instanceof TypeError) {
        throw new Error(`The browser could not read ${endpoint}. This is usually a CORS or network issue. Confirm the API allows https://chezmodport.onrender.com. Browser detail: ${error.message}`);
      }
      throw error;
    } finally {
      window.clearTimeout(timeout);
    }
  }

  function makeElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function createServerCard(config) {
    const card = makeElement("article", "server-card is-loading");
    card.setAttribute("aria-label", "Loading Discord server information");

    const main = makeElement("div", "server-card-main");
    const iconWrap = makeElement("div", "server-icon-wrap", "D");
    const textWrap = makeElement("div", "server-card-info");
    const title = makeElement("h3", "", config.name || "Loading server...");
    const subtitle = makeElement("p", "", "Fetching public Discord information");
    textWrap.append(title, subtitle);
    main.append(iconWrap, textWrap);
    card.append(main);

    const stats = makeElement("div", "server-stats");
    card.append(stats);

    return { card, title, subtitle, iconWrap, stats };
  }

  function addStat(container, label, value) {
    const stat = makeElement("span", "server-stat");
    const strong = makeElement("strong", "", value);
    const labelNode = makeElement("span", "", label);
    stat.append(strong, labelNode);
    container.append(stat);
  }

  function showServerError(parts, config, error) {
    const { card, title, subtitle, stats } = parts;
    const rawMessage = error.message || String(error);
    let publicMessage = "No public server preview is available. Try adding a valid invite code.";

    if (rawMessage.includes("Invalid server ID")) {
      publicMessage = "Check the numeric server ID in script.js.";
    } else if (/browser could not read|CORS|Could not reach|timed out|fetch|NetworkError|Load failed|AbortError/i.test(rawMessage)) {
      publicMessage = "The website could not read the server API. This usually means a CORS or network issue. Check that the API allows https://chezmodport.onrender.com.";
    } else if (/No valid invite|Invalid invite|invite lookup|does not belong/i.test(rawMessage)) {
      publicMessage = "The invite could not be used. Check that the invite is valid and belongs to this exact server.";
    } else if (/not discoverable|public preview|invite|unknown guild|not found|404/i.test(rawMessage)) {
      publicMessage = "Discord could not provide a public preview for this server. It may not be discoverable, and its public widget may be disabled. Add a valid inviteCode for this server if you have one.";
    }

    card.classList.remove("is-loading");
    card.classList.add("is-unavailable");
    title.textContent = config.name || "Server preview unavailable";
    subtitle.textContent = "Public information unavailable";
    stats.replaceChildren();
    const note = makeElement("p", "server-card-error", publicMessage);
    const technical = makeElement("p", "server-card-error-detail", `Diagnostic: ${rawMessage.slice(0, 420)}`);
    stats.append(note, technical);
    card.setAttribute("aria-label", `${title.textContent}. Server information unavailable.`);
    console.error(`[servers] Could not load Discord server ${config.serverId}:`, error);
    card.dataset.serverError = rawMessage.slice(0, 500);
  }

  async function populateServerCard(config, parts) {
    const { card, title, subtitle, iconWrap, stats } = parts;
    try {
      const details = await getServerDetails(config);
      title.textContent = details.name;
      subtitle.textContent = details.source === "widget" ? "Public server widget" : "Discord community";
      card.setAttribute("aria-label", `${details.name}, approximate server statistics`);
      card.classList.remove("is-loading");

      const iconUrl = discordImageUrl("icons", details.id, details.icon, 128);
      if (iconUrl) {
        const icon = document.createElement("img");
        icon.src = iconUrl;
        icon.alt = "";
        icon.loading = "lazy";
        icon.addEventListener("error", () => {
          icon.remove();
          iconWrap.textContent = details.name.slice(0, 1).toUpperCase();
        }, { once: true });
        iconWrap.replaceChildren(icon);
      } else {
        iconWrap.textContent = details.name.slice(0, 1).toUpperCase();
      }

      // Only create the banner element when Discord actually returns a banner hash.
      const bannerUrl = discordImageUrl("banners", details.id, details.banner, 1024);
      if (bannerUrl) {
        const banner = makeElement("div", "server-banner");
        const image = document.createElement("img");
        image.src = bannerUrl;
        image.alt = "";
        image.loading = "lazy";
        image.addEventListener("error", () => {
          banner.remove();
          card.classList.remove("has-banner");
        }, { once: true });
        banner.append(image);
        card.classList.add("has-banner");
        card.insertBefore(banner, card.firstChild);
      }

      stats.replaceChildren();
      addStat(stats, "Members", formatCount(details.members));
      addStat(stats, "Online", formatCount(details.online));

      if (details.inviteCode) {
        const footer = makeElement("div", "server-card-footer");
        const link = makeElement("a", "", "View server");
        link.href = `https://discord.gg/${encodeURIComponent(details.inviteCode)}`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        footer.append(link);
        card.append(footer);
      }
    } catch (error) {
      showServerError(parts, config, error instanceof Error ? error : new Error(String(error)));
    }
  }

  async function renderServers() {
    if (!serversSection || !serverTrack) return;

    const marquee = serverTrack.closest(".server-marquee");

    // Remove accidental duplicate entries while preserving the first configuration.
    const uniqueServers = new Map();
    SERVERS.forEach((server) => {
      if (!server || !String(server.serverId || "").trim()) return;
      const id = String(server.serverId).trim();
      if (!uniqueServers.has(id)) uniqueServers.set(id, server);
    });
    const configuredServers = [...uniqueServers.values()];

    // Always reveal the section. An empty list gets a useful setup message.
    serversSection.hidden = false;
    serverTrack.replaceChildren();
    serverTrack.classList.remove("is-centered", "is-overflowing", "is-looping", "is-static-scroll");
    if (marquee) marquee.classList.remove("is-centered", "is-overflowing", "is-static-scroll");
    serverTrack.style.animation = "none";
    serverTrack.style.removeProperty("--marquee-duration");

    if (configuredServers.length === 0) {
      const emptyState = makeElement("div", "server-empty-state",
        "No servers added yet. Add server IDs and invite codes to the SERVERS array in script.js.");
      serverTrack.append(emptyState);
      serverTrack.classList.add("is-centered");
      if (marquee) marquee.classList.add("is-centered");
      console.info("[servers] SERVERS is empty. Add a numeric serverId and its inviteCode.");
      return;
    }

    const firstGroup = makeElement("div", "server-group");
    firstGroup.setAttribute("role", "list");
    serverTrack.append(firstGroup);

    const cardParts = configuredServers.map((config) => {
      const parts = createServerCard(config);
      parts.card.setAttribute("role", "listitem");
      firstGroup.append(parts.card);
      return { config, parts };
    });

    // Keep cards centered until their combined width actually exceeds the viewport.
    // When they overflow, append a matching copy and animate the two groups as a loop.
    let layoutFrame = 0;
    let lastLayout = "";

    const updateMarqueeLayout = () => {
      if (!marquee || !firstGroup.isConnected) return;

      const availableWidth = marquee.clientWidth;
      const contentWidth = firstGroup.getBoundingClientRect().width;
      const overflowing = contentWidth > availableWidth + 2;
      const nextLayout = overflowing ? "overflow" : "centered";
      if (nextLayout === lastLayout) return;
      lastLayout = nextLayout;

      const oldDuplicate = [...serverTrack.children].find((child) => child !== firstGroup);
      if (oldDuplicate) oldDuplicate.remove();

      serverTrack.classList.remove("is-centered", "is-overflowing", "is-looping", "is-static-scroll");
      marquee.classList.remove("is-centered", "is-overflowing", "is-static-scroll");
      serverTrack.style.animation = "none";
      serverTrack.style.removeProperty("--marquee-duration");

      if (!overflowing) {
        serverTrack.classList.add("is-centered");
        marquee.classList.add("is-centered");
        return;
      }

      if (reducedMotion) {
        serverTrack.classList.add("is-overflowing", "is-static-scroll");
        marquee.classList.add("is-overflowing", "is-static-scroll");
        return;
      }

      const duplicate = firstGroup.cloneNode(true);
      duplicate.setAttribute("aria-hidden", "true");
      duplicate.setAttribute("inert", "");
      duplicate.classList.add("server-group-clone");
      serverTrack.append(duplicate);
      serverTrack.classList.add("is-overflowing", "is-looping");
      marquee.classList.add("is-overflowing");

      // Keep a consistent slow speed as the number of servers changes.
      const durationSeconds = Math.max(26, contentWidth / 22);
      serverTrack.style.setProperty("--marquee-duration", `${durationSeconds}s`);
      // Restart the animation after changing from the centered layout.
      void serverTrack.offsetWidth;
      serverTrack.style.animation = "";
    };

    const scheduleLayoutUpdate = () => {
      if (layoutFrame) cancelAnimationFrame(layoutFrame);
      layoutFrame = requestAnimationFrame(() => {
        layoutFrame = 0;
        updateMarqueeLayout();
      });
    };

    // Load every primary card first. We never clone loading or error placeholders.
    await Promise.all(cardParts.map(({ config, parts }) =>
      populateServerCard(config, parts)
    ));

    // Measure after the cards have their final content, then react to viewport changes.
    scheduleLayoutUpdate();
    if ("ResizeObserver" in window && marquee) {
      const resizeObserver = new ResizeObserver(scheduleLayoutUpdate);
      resizeObserver.observe(marquee);
      resizeObserver.observe(firstGroup);
    }
    window.addEventListener("resize", scheduleLayoutUpdate, { passive: true });
  }

  renderServers();
})();
