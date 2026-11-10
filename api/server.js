"use strict";

const express = require("express");
const app = express();
const PORT = Number(process.env.PORT || 10000);
const DISCORD_USER_AGENT = "DiscordBot (https://chezmodport.onrender.com, 1.2)";
const cache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000;

app.disable("x-powered-by");

// This API only exposes public Discord server metadata and does not use
// cookies or browser credentials. A wildcard origin avoids brittle CORS
// failures if the portfolio is served from a Render URL or custom domain.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Accept, Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.get("/", (_req, res) => {
  res.json({ ok: true, service: "ch3z-discord-server-preview-api", health: "/health" });
});

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "ch3z-discord-server-preview-api",
    cors: "enabled",
    accessControlAllowOrigin: "*",
  });
});

function normalizeInviteCode(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const match = raw.match(/(?:https?:\/\/)?(?:www\.)?(?:discord\.gg|discord(?:app)?\.com\/invite)\/([A-Za-z0-9_-]+)/i);
  const code = match ? match[1] : raw;
  return /^[A-Za-z0-9_-]{2,100}$/.test(code) ? code : "";
}

async function discordGet(path, { widget = false } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  const url = widget
    ? `https://discord.com/api${path}`
    : `https://discord.com/api/v10${path}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": DISCORD_USER_AGENT,
      },
      signal: controller.signal,
    });
    let body = null;
    try { body = await response.json(); } catch { /* retain status for errors */ }
    if (!response.ok) {
      const message = body && body.message ? body.message : `Discord returned HTTP ${response.status}`;
      const error = new Error(`${message} (HTTP ${response.status})`);
      error.status = response.status;
      throw error;
    }
    return body;
  } finally {
    clearTimeout(timer);
  }
}

function publicDetails(guild, counts, serverId, inviteCode, source) {
  return {
    ok: true,
    id: serverId,
    name: guild.name || "Discord server",
    icon: guild.icon || null,
    banner: guild.banner || null,
    members: Number.isFinite(counts.members) ? counts.members : null,
    online: Number.isFinite(counts.online) ? counts.online : null,
    inviteCode: inviteCode || "",
    source,
  };
}

async function loadServer(serverId, inviteCode) {
  const failures = [];

  if (inviteCode) {
    try {
      const invite = await discordGet(`/invites/${encodeURIComponent(inviteCode)}?with_counts=true`);
      if (invite && invite.guild && String(invite.guild.id) === serverId) {
        return publicDetails(
          invite.guild,
          { members: invite.approximate_member_count, online: invite.approximate_presence_count },
          serverId,
          inviteCode,
          "invite",
        );
      }
      failures.push("The invite does not belong to the supplied server ID.");
    } catch (error) {
      failures.push(`Invite lookup: ${error.message}`);
    }
  }

  try {
    const preview = await discordGet(`/guilds/${serverId}/preview`);
    if (String(preview.id) !== serverId) throw new Error("Discord returned a different server ID.");
    return publicDetails(
      preview,
      { members: preview.approximate_member_count, online: preview.approximate_presence_count },
      serverId,
      inviteCode,
      "preview",
    );
  } catch (error) {
    failures.push(`Public preview: ${error.message}`);
  }

  try {
    const widget = await discordGet(`/guilds/${serverId}/widget.json`, { widget: true });
    if (String(widget.id) !== serverId) throw new Error("Discord returned a different server ID.");
    return publicDetails(
      { id: widget.id, name: widget.name, icon: null, banner: null },
      { members: null, online: widget.presence_count },
      serverId,
      inviteCode,
      "widget",
    );
  } catch (error) {
    failures.push(`Public widget: ${error.message}`);
  }

  const error = new Error(failures.join(" | ") || "No public information is available for this server.");
  error.status = 404;
  throw error;
}

app.get("/api/servers/:serverId", async (req, res) => {
  const serverId = String(req.params.serverId || "").trim();
  if (!/^\d{17,20}$/.test(serverId)) {
    return res.status(400).json({ ok: false, error: "Invalid server ID. Expected a 17 to 20 digit numeric ID." });
  }

  const rawInvite = String(req.query.invite || "").trim();
  const inviteCode = normalizeInviteCode(rawInvite);
  if (rawInvite && !inviteCode) {
    return res.status(400).json({ ok: false, error: "Invalid invite code or Discord invite URL." });
  }

  const cacheKey = `${serverId}:${inviteCode}`;
  const cached = cache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return res.json(cached.data);

  try {
    const data = await loadServer(serverId, inviteCode);
    cache.set(cacheKey, { data, expiresAt: Date.now() + CACHE_TTL_MS });
    return res.json(data);
  } catch (error) {
    console.warn(`[server-preview] ${serverId}: ${error.message}`);
    return res.status(error.status || 502).json({
      ok: false,
      error: "No public data could be retrieved for this server. The diagnostics field explains which Discord lookups failed.",
      diagnostics: error.message,
      serverId,
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Discord server preview API listening on port ${PORT}`);
});
