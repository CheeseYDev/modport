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

  // Add servers here. A serverId is enough for publicly discoverable servers.
  // Optional inviteCode enables the banner and invite-based approximate counts.
  // Example: { serverId: "123456789012345678", inviteCode: "inviteCodeHere" }
  const SERVERS = [
    { serverId: "1467537541686231291", inviteCode: "https://discord.gg/QHNRWx4Fdz" },
  ];

  const serversSection = document.getElementById("servers");
  const serverTrack = document.getElementById("serverTrack");
  const serverVerb = document.getElementById("serverVerb");
  const serverVerbAnnouncement = document.getElementById("serverVerbAnnouncement");

  // Type the rotating heading words. Keep this still when reduced motion is preferred.
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
          window.setTimeout(typeNext, 1750);
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
        window.setTimeout(typeNext, 280);
        return;
      }
      window.setTimeout(typeNext, 48);
    };

    window.setTimeout(typeNext, 1900);
  }

  const formatCount = (value) => {
    if (!Number.isFinite(value) || value < 0) return "Unavailable";
    return `~${new Intl.NumberFormat().format(value)}`;
  };

  const safeServerId = (value) => /^\d{17,20}$/.test(String(value || ""));
  const safeInviteCode = (value) => /^[A-Za-z0-9_-]{2,100}$/.test(String(value || ""));

  function discordImageUrl(kind, serverId, hash, size = 256) {
    if (!hash || !/^[A-Za-z0-9_]+$/.test(hash)) return "";
    const extension = hash.startsWith("a_") ? "gif" : "png";
    return `https://cdn.discordapp.com/${kind}/${serverId}/${hash}.${extension}?size=${size}`;
  }

  async function fetchJson(url) {
    const response = await fetch(url, { headers: { Accept: "application/json" }, cache: "no-store" });
    if (!response.ok) throw new Error(`Discord returned ${response.status}`);
    return response.json();
  }

  async function getServerDetails(config) {
    const serverId = String(config.serverId || "").trim();
    if (!safeServerId(serverId)) throw new Error("Invalid server ID. Use the server's numeric ID.");

    // Invite lookup provides icon, optional banner, and approximate member/presence counts.
    if (config.inviteCode && safeInviteCode(config.inviteCode)) {
      try {
        const invite = await fetchJson(`https://discord.com/api/v10/invites/${encodeURIComponent(config.inviteCode)}?with_counts=true`);
        if (invite.guild && String(invite.guild.id) === serverId) {
          return {
            id: serverId,
            name: invite.guild.name || config.name || "Discord server",
            icon: invite.guild.icon || null,
            banner: invite.guild.banner || null,
            members: invite.approximate_member_count,
            online: invite.approximate_presence_count,
            inviteCode: config.inviteCode,
            source: "invite",
          };
        }
      } catch (error) {
        console.info(`Invite metadata unavailable for server ${serverId}; trying public preview.`, error);
      }
    }

    // Public preview exposes name, icon and approximate counts when the guild is discoverable.
    try {
      const preview = await fetchJson(`https://discord.com/api/v10/guilds/${serverId}/preview`);
      if (String(preview.id) !== serverId) throw new Error("Discord returned a different server ID.");
      return {
        id: serverId,
        name: preview.name || config.name || "Discord server",
        icon: preview.icon || null,
        banner: null,
        members: preview.approximate_member_count,
        online: preview.approximate_presence_count,
        inviteCode: config.inviteCode || "",
        source: "preview",
      };
    } catch (previewError) {
      // A public widget can still provide the server name and online count if enabled.
      try {
        const widget = await fetchJson(`https://discord.com/api/v10/guilds/${serverId}/widget.json`);
        if (String(widget.id) !== serverId) throw new Error("Discord returned a different server ID.");
        return {
          id: serverId,
          name: widget.name || config.name || "Discord server",
          icon: null,
          banner: null,
          members: null,
          online: Number.isFinite(widget.presence_count) ? widget.presence_count : null,
          inviteCode: config.inviteCode || "",
          source: "widget",
        };
      } catch (widgetError) {
        throw new Error("No public preview is available. The server may be private, not discoverable, or have its widget disabled. Add an inviteCode for public invite metadata.");
      }
    }
  }

  function createServerCard(config) {
    const card = document.createElement("article");
    card.className = "server-card is-loading";
    card.setAttribute("aria-label", "Loading Discord server information");

    const info = document.createElement("div");
    info.className = "server-card-main";

    const iconWrap = document.createElement("div");
    iconWrap.className = "server-icon-wrap";
    iconWrap.textContent = "D";

    const textWrap = document.createElement("div");
    textWrap.className = "server-card-info";
    const title = document.createElement("h3");
    title.textContent = "Loading server...";
    const subtitle = document.createElement("p");
    subtitle.textContent = "Fetching public Discord information";
    textWrap.append(title, subtitle);
    info.append(iconWrap, textWrap);
    card.append(info);

    const stats = document.createElement("div");
    stats.className = "server-stats";
    card.append(stats);

    return { card, title, subtitle, iconWrap, stats };
  }

  function addStat(container, label, value) {
    const stat = document.createElement("span");
    stat.className = "server-stat";
    const strong = document.createElement("strong");
    strong.textContent = value;
    const text = document.createElement("span");
    text.textContent = label;
    stat.append(strong, text);
    container.append(stat);
  }

  async function populateServerCard(config) {
    const parts = createServerCard(config);
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
        icon.addEventListener("error", () => { icon.remove(); iconWrap.textContent = details.name.slice(0, 1).toUpperCase(); }, { once: true });
        iconWrap.textContent = "";
        iconWrap.append(icon);
      } else {
        iconWrap.textContent = details.name.slice(0, 1).toUpperCase();
      }

      // The banner container is created only when Discord returns a banner hash.
      const bannerUrl = discordImageUrl("banners", details.id, details.banner, 1024);
      if (bannerUrl) {
        const banner = document.createElement("div");
        banner.className = "server-banner";
        const image = document.createElement("img");
        image.src = bannerUrl;
        image.alt = "";
        image.loading = "lazy";
        image.addEventListener("error", () => banner.remove(), { once: true });
        banner.append(image);
        card.classList.add("has-banner");
        card.insertBefore(banner, card.firstChild);
      }

      stats.replaceChildren();
      addStat(stats, "Members", formatCount(details.members));
      addStat(stats, "Online", formatCount(details.online));

      if (details.inviteCode && safeInviteCode(details.inviteCode)) {
        const footer = document.createElement("div");
        footer.className = "server-card-footer";
        const link = document.createElement("a");
        link.href = `https://discord.gg/${encodeURIComponent(details.inviteCode)}`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "View server";
        footer.append(link);
        card.append(footer);
      }
    } catch (error) {
      card.classList.remove("is-loading");
      card.classList.add("is-unavailable");
      title.textContent = config.name || "Server preview unavailable";
      subtitle.textContent = "Discord could not provide public server information.";
      stats.replaceChildren();
      const note = document.createElement("p");
      note.className = "server-card-error";
      note.textContent = "Check that the ID is correct, the server is discoverable, or add an inviteCode.";
      stats.append(note);
      console.warn(`Could not load Discord server ${config.serverId}:`, error);
    }
    return card;
  }

  async function renderServers() {
    if (!serversSection || !serverTrack || SERVERS.length === 0) return;

    const validServers = SERVERS.filter((server) => safeServerId(server.serverId));
    if (validServers.length === 0) return;

    serversSection.hidden = false;
    const firstGroup = document.createElement("div");
    firstGroup.className = "server-group";
    firstGroup.setAttribute("role", "list");
    const cards = await Promise.all(validServers.map((server) => populateServerCard(server)));
    cards.forEach((card) => {
      card.setAttribute("role", "listitem");
      firstGroup.append(card);
    });

    serverTrack.replaceChildren(firstGroup);
    // Duplicate the group for a continuous marquee. The copy is removed from keyboard navigation.
    if (cards.length > 1) {
      const duplicate = firstGroup.cloneNode(true);
      duplicate.setAttribute("aria-hidden", "true");
      duplicate.setAttribute("inert", "");
      serverTrack.append(duplicate);
    } else {
      // One card is still duplicated so the automatic track can loop seamlessly.
      const duplicate = firstGroup.cloneNode(true);
      duplicate.setAttribute("aria-hidden", "true");
      duplicate.setAttribute("inert", "");
      serverTrack.append(duplicate);
    }

    if (reducedMotion) {
      serverTrack.style.animation = "none";
    }
  }

  renderServers();

})();