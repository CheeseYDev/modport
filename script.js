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

  // Add one entry for every server you want to show.
  // serverId is the numeric Discord server ID.
  // inviteCode is optional. It can be a code or a full discord.gg invite URL.
  // name is optional and is only used as a display fallback if Discord cannot return the name.
  const SERVERS = [
    { serverId: "1467537541686231291" }
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
  const SERVER_API_BASE = "https://ch3z-discord-api.onrender.com/";

  async function getServerDetails(config) {
    const serverId = String(config.serverId || "").trim();
    if (!safeServerId(serverId)) {
      throw new Error("Invalid server ID. Use the numeric ID copied with Discord Developer Mode.");
    }

    const inviteCode = normalizeInviteCode(config.inviteCode);
    const query = new URLSearchParams();
    if (inviteCode) query.set("invite", inviteCode);

    const endpoint = `${SERVER_API_BASE.replace(/\/$/, "")}/api/servers/${encodeURIComponent(serverId)}${query.size ? `?${query}` : ""}`;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 60000);

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal: controller.signal,
      });
      let payload;
      try {
        payload = await response.json();
      } catch {
        throw new Error(`The server API returned an unreadable response (HTTP ${response.status}).`);
      }
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || `Server API request failed (HTTP ${response.status}).`);
      }
      return {
        id: payload.id,
        name: payload.name || config.name || "Discord server",
        icon: payload.icon || null,
        banner: payload.banner || null,
        members: payload.members ?? null,
        online: payload.online ?? null,
        inviteCode: payload.inviteCode || inviteCode,
        source: payload.source || "Discord",
      };
    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error("The server API timed out. It may be starting up or temporarily unavailable.");
      }
      if (error instanceof TypeError) {
        throw new Error(`Could not reach ${SERVER_API_BASE}. Check that your Render API service is live and its URL is correct. Browser detail: ${error.message}`);
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
    } else if (/Could not reach|timed out|fetch|NetworkError|Load failed|AbortError/i.test(rawMessage)) {
      publicMessage = "The server data service could not be reached. Check that the Render API service is deployed and SERVER_API_BASE in script.js matches its URL.";
    } else if (/not discoverable|public preview|invite/i.test(rawMessage)) {
      publicMessage = "Discord did not provide public server information. Add a valid invite code or use a server with public preview enabled.";
    }

    card.classList.remove("is-loading");
    card.classList.add("is-unavailable");
    title.textContent = config.name || "Server preview unavailable";
    subtitle.textContent = "Public information unavailable";
    stats.replaceChildren();
    const note = makeElement("p", "server-card-error", publicMessage);
    stats.append(note);
    card.setAttribute("aria-label", `${title.textContent}. Server information unavailable.`);
    console.warn(`Could not load Discord server ${config.serverId}: ${rawMessage}`);
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

  function renderServers() {
    if (!serversSection || !serverTrack) return;

    const configuredServers = SERVERS.filter((server) => server && String(server.serverId || "").trim());
    // Always reveal the section. An empty list now shows a useful setup hint
    // instead of leaving an unexplained blank gap on the page.
    serversSection.hidden = false;
    serverTrack.replaceChildren();

    if (configuredServers.length === 0) {
      serverTrack.style.animation = "none";
      const emptyState = makeElement("div", "server-empty-state",
        "No servers added yet. Add server IDs to the SERVERS array in script.js to display them here.");
      serverTrack.append(emptyState);
      console.info("Servers section is visible, but SERVERS is empty. Add at least one numeric serverId in script.js.");
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

    // Duplicate the cards for a seamless marquee. The clone cannot receive focus.
    const duplicate = firstGroup.cloneNode(true);
    duplicate.setAttribute("aria-hidden", "true");
    duplicate.setAttribute("inert", "");
    serverTrack.append(duplicate);

    if (reducedMotion) serverTrack.style.animation = "none";

    // Load cards independently so one slow or unavailable server cannot block the others.
    cardParts.forEach(({ config, parts }) => {
      populateServerCard(config, parts).then(() => {
        // Keep the duplicate in sync after the first copy has loaded.
        const currentDuplicate = serverTrack.children[1];
        if (currentDuplicate) {
          const updatedClone = firstGroup.cloneNode(true);
          updatedClone.setAttribute("aria-hidden", "true");
          updatedClone.setAttribute("inert", "");
          currentDuplicate.replaceWith(updatedClone);
        }
      });
    });
  }

  renderServers();
})();
