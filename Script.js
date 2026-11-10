/* ==========================================================
   ch3z__ · Discord staff portfolio
   Everything you may want to edit lives in CONFIG and the
   SECTIONS data below. The rendering code is at the bottom.
   ========================================================== */
(() => {
  "use strict";

  /* ---------- Config ---------- */
  const CONFIG = {
    handle: "ch3z__",
    displayHandle: "@ch3z__",
    userId: "1493679900576714972",
    years: "9+",                       // shown as “9+ years on Discord”
    status: "Open to staff roles",
    avatarUrl: "",                     // optional: path or URL to your profile picture
  };
  CONFIG.profileUrl = "https://discord.com/users/" + CONFIG.userId;
  const Y = CONFIG.years;

  /* ---------- Content helpers ---------- */
  const f = (name, value) => ({ name, value });
  const embed = (title, text, fields) => ({ type: "embed", title, text, fields });
  const table = (title, head, rows) => ({ type: "table", title, head, rows });
  const chips = (title, items) => ({ type: "chips", title, items });
  const steps = (title, items, text) => ({ type: "steps", title, items, text });
  const code = (title, text) => ({ type: "code", title, text });
  const nav = (items) => ({ type: "nav", items });

  /* ---------- Content ---------- */
  const SECTIONS = [
    /* ===================== 1. HOME ===================== */
    {
      id: "home", name: "Home", title: "Staff portfolio", color: "#7983f5", icon: "home",
      channels: [
        {
          id: "welcome", cat: "Start here", name: "welcome",
          topic: "Who I am and how this portfolio works",
          blocks: [
            embed(
              "Hi, I’m ch3z__",
              "Discord moderator, administrator and community manager. I’ve been on Discord for " + Y + " years and have worked across the full staff stack: keeping chats safe, configuring servers properly and leading the people who run them.\n\nThis portfolio is laid out like a server. Switch sections with the icons on the left and browse the channels next to them.",
              [
                f("Moderation", "Reports, rule enforcement, tickets and bot-assisted moderation."),
                f("Administration", "Roles, permissions, security, bots and server structure."),
                f("Management", "Staff leadership, growth, events and daily operations."),
              ]
            ),
            nav([
              { label: "Moderator portfolio", href: "#moderator" },
              { label: "Administrator portfolio", href: "#administrator" },
              { label: "Management portfolio", href: "#management" },
              { label: "Contact me", href: "#contact", primary: true },
            ]),
          ],
        },
        {
          id: "at-a-glance", cat: "Start here", name: "at-a-glance",
          topic: "A quick map of everything in this portfolio",
          blocks: [
            table("Portfolio map", ["Section", "What’s inside", "Highlights"], [
              ["Moderator", "Rules, punishments, tickets and moderation bots", "Timeouts, AutoMod, Dyno, Ticket Tool, escalation ladder"],
              ["Administrator", "Structure, permissions, security, onboarding and bots", "Role hierarchy, raid protection, Carl-bot, Wick"],
              ["Management", "Team leadership, growth, operations and tooling", "Recruiting, training, events, KPIs"],
              ["Contact", "One button to my Discord profile", CONFIG.displayHandle],
            ]),
            chips("Core skills", [
              "Rule enforcement", "De-escalation", "Ticket handling", "Evidence and logging", "Permission design",
              "Role hierarchy", "Raid response", "Bot configuration", "Staff training", "Event planning",
              "Community analytics", "Documentation",
            ]),
            chips("Bots and tools", [
              "Dyno", "MEE6", "Carl-bot", "Ticket Tool", "Wick", "Sapphire", "YAGPDB", "Statbot", "Sesh",
              "GiveawayBot", "Discord AutoMod", "Audit log",
            ]),
          ],
        },
        {
          id: "how-i-work", cat: "About", name: "how-i-work",
          topic: "The principles behind every action I take as staff",
          blocks: [
            embed("How I work", "The same habits apply whether I’m moderating a chat, configuring a server or leading a team.", [
              f("Consistent", "The same rule gets the same outcome, no matter who the member is."),
              f("Documented", "Every action has a reason, evidence and a case-log entry."),
              f("Calm", "Short, neutral replies. I de-escalate first and punish second."),
              f("Least privilege", "Staff and bots get only the permissions the job needs."),
              f("Proactive", "Good structure, AutoMod and onboarding prevent most incidents."),
              f("Transparent", "Clear rules, clear reasons and a fair appeal path."),
            ]),
          ],
        },
      ],
    },

    /* ===================== 2. MODERATOR ===================== */
    {
      id: "moderator", name: "Moderator", title: "Moderator portfolio", color: "#3fb98a", icon: "shield",
      channels: [
        {
          id: "overview", cat: "Start here", name: "overview",
          topic: "What I do as a moderator",
          blocks: [
            embed(
              "Moderation in a nutshell",
              "I keep chats safe, welcoming and on topic. I enforce the rules fairly, handle reports and tickets, and leave a clear paper trail so the next moderator can pick up where I left off.",
              [
                f("Watch", "Chat, voice and new-member activity, plus reports and flagged messages."),
                f("Respond", "Warn, timeout, kick or ban in proportion to the offense."),
                f("Record", "Reason, evidence and case number for every action."),
                f("Support", "Answer questions, guide new members and escalate what’s above my role."),
              ]
            ),
            chips("Permissions I’m used to working with", [
              "Moderate Members", "Manage Messages", "Kick Members", "Ban Members", "Mute Members",
              "Deafen Members", "Move Members", "Manage Threads", "Manage Nicknames", "View Audit Log",
            ]),
          ],
        },
        {
          id: "tools", cat: "Tools", name: "discord-tools",
          topic: "Discord’s built-in moderation systems",
          blocks: [
            table("Built-in moderation tools", ["Tool", "Use it for", "Good to know"], [
              ["Timeout", "Cooling off spam or heated arguments", "Up to 28 days. The member can read but can’t send messages, react or speak."],
              ["Kick", "Removing someone who can rejoin", "The member leaves and needs a new invite to return."],
              ["Ban", "Serious or repeated violations", "Can clear recent messages. Bans are managed in server settings."],
              ["Slowmode", "Calming busy or heated channels", "Set per channel, from 5 seconds up to 6 hours."],
              ["Voice controls", "Disruptive voice chat", "Server mute and deafen, move members, disconnect."],
              ["Message tools", "Cleanup and context", "Delete, pin, open threads and report. Bulk cleanup is done with bots."],
              ["AutoMod", "Automatic filtering", "Keyword and regex filters, spam and mention-spam rules, alerts to a staff channel, automatic timeouts."],
              ["Audit log", "Checking who changed what", "Shows kicks, bans, role and channel changes. It doesn’t replace a proper mod log."],
            ]),
            embed("Evidence habits", "Turn on `Developer Mode` so user, message and channel IDs can be copied. Names change, IDs don’t.", [
              f("Message links", "Stronger than screenshots alone, and they show context."),
              f("User IDs", "Needed for bans, appeals and bot commands."),
              f("Screenshots", "Kept as backup in case messages get deleted."),
              f("Timestamps", "Make timelines and appeals easy to review."),
            ]),
          ],
        },
        {
          id: "bots", cat: "Tools", name: "moderation-bots",
          topic: "Bots I’ve used for moderation and how I set them up",
          blocks: [
            table("Moderation bots", ["Bot", "What I use it for"], [
              ["Dyno", "Moderation commands, mod logs, auto-moderation, auto roles, custom commands and announcements."],
              ["MEE6", "Warns, temporary mutes and bans, welcome messages, leveling and reaction roles. Some features are premium."],
              ["Carl-bot", "Auto-moderation, logging, reaction roles, tags and moderation actions."],
              ["Wick", "Anti-raid and anti-nuke protection, verification and lockdowns."],
              ["Sapphire", "Auto-moderation, logging, moderation cases and tickets."],
              ["Ticket Tool", "Ticket panels, categories, claiming and transcripts."],
              ["Discord AutoMod", "Built-in filters with nothing extra to host or maintain."],
            ]),
            embed("Setting bots up properly", "A bot is only as good as its configuration.", [
              f("Mod-log channel", "A private channel where every action is logged for staff only."),
              f("AutoMod rules", "Start strict on invites, links and mass mentions, then tune after false positives."),
              f("Role placement", "The bot’s role sits above the members it manages and below senior staff."),
              f("Cases", "Every warn, timeout, kick and ban becomes a case with a reason."),
            ]),
          ],
        },
        {
          id: "tickets", cat: "Tools", name: "ticket-systems",
          topic: "Support, reports and appeals through tickets",
          blocks: [
            embed("Ticket types I’ve handled", "Ticket Tool and similar bots give members a private place to talk to staff, with buttons, categories and transcripts.", [
              f("Support", "Questions, role issues and access problems."),
              f("Reports", "Member reports with evidence attached."),
              f("Appeals", "Reviews of bans, kicks and timeouts."),
              f("Applications", "Staff and special-role requests."),
              f("Partnerships", "Requests from other communities."),
            ]),
            steps("How I handle a ticket", [
              ["Acknowledge", "Greet the member and confirm staff are on it."],
              ["Gather", "Ask for message links, user IDs and screenshots."],
              ["Verify", "Check logs, audit log and context before acting."],
              ["Decide", "Pick the action from the infraction ladder. Ask a second staff member for serious cases."],
              ["Act and explain", "Apply the action and tell the member what happened and why."],
              ["Close", "Save the transcript, log the case and close the ticket."],
            ]),
            embed("Ticket etiquette", "Tickets are private. I keep a neutral tone, never discuss other members’ cases and don’t leave tickets sitting without a reply."),
          ],
        },
        {
          id: "rules", cat: "Practice", name: "common-rules",
          topic: "The rules moderators enforce most often",
          blocks: [
            embed("Rules I enforce most", "These show up in almost every well-run server.", [
              f("Respect", "No harassment, hate speech, slurs, personal attacks or discrimination."),
              f("No spam", "No flooding, repeated messages, caps spam, emoji spam or mass mentions."),
              f("Right channel", "Stay on topic and keep bot commands in bot channels."),
              f("No NSFW or gore", "Adult or graphic content stays out of general channels. Sexual content involving minors is an instant ban and a report to Discord."),
              f("No advertising", "No self-promotion, invites or DM ads without permission."),
              f("Privacy", "No doxxing, leaking private chats or sharing personal information."),
              f("Safety", "No scams, phishing links, token grabbers, malware or fake giveaways."),
              f("Identity", "No impersonating staff or members. Names and avatars must be appropriate."),
              f("Ban evasion", "Using alts to dodge a punishment is its own ban reason."),
              f("Platform rules", "Follow Discord’s Terms of Service and Community Guidelines, including the minimum age."),
            ]),
            embed("Enforcing the spirit of the rule", "Rules can’t cover everything. I judge intent, context and pattern, apply the rule consistently and explain the decision in plain words."),
          ],
        },
        {
          id: "escalation", cat: "Practice", name: "punishments-and-appeals",
          topic: "Proportional punishments and fair appeals",
          blocks: [
            steps("Infraction ladder", [
              ["Reminder", "A friendly nudge for small or first-time slips."],
              ["Warning", "A formal warn logged as a case."],
              ["Timeout", "For repeat behavior or heated moments. Length scales with severity."],
              ["Kick or temporary ban", "For continued violations after warnings."],
              ["Permanent ban", "For severe or repeated offenses."],
            ]),
            embed("Skipping the ladder", "Threats, doxxing, hate raids, scams, gore, sexual content involving minors and ban evasion go straight to a ban. I report serious cases to Discord’s Trust & Safety team and tell senior staff."),
            embed("Appeals", "Everyone deserves a second look.", [
              f("Separate reviewer", "Someone other than the original moderator reviews the case."),
              f("Evidence first", "The decision is based on logs and context, not on who’s asking."),
              f("Written outcome", "The result and reasoning go in the case log."),
            ]),
          ],
        },
        {
          id: "raids", cat: "Practice", name: "raids-and-scams",
          topic: "Keeping the server safe during attacks and scam waves",
          blocks: [
            steps("Raid response", [
              ["Contain", "Pause invites, lock public channels and raise the verification level."],
              ["Remove", "Ban raiders and clear their recent messages."],
              ["Screen", "Check new joins for matching names, avatars and account ages."],
              ["Alert", "Tell admins and moderators in the staff channel."],
              ["Update", "Post a calm status message once things are under control."],
            ]),
            embed("Scams I watch for", "Compromised accounts and fake offers are the most common threats.", [
              f("Fake Nitro and gift links", "Look-alike domains and “free” offers."),
              f("QR-code login scams", "Messages asking members to scan a code to “verify”."),
              f("Hijacked accounts", "Trusted members suddenly posting links or DMing others."),
              f("Fake support or staff", "DMs claiming to be Discord or server staff."),
              f("Malicious files and bots", "Unknown executables or bot invites from strangers."),
            ]),
            embed("When an account is compromised", "I delete the messages, timeout the account, tell the member to change their password and enable two-factor authentication, and only ban if the account is clearly malicious."),
          ],
        },
        {
          id: "communication", cat: "Practice", name: "communication",
          topic: "Tone, teamwork and handoffs",
          blocks: [
            embed("Communicating as staff", "How I say it matters as much as what I decide.", [
              f("De-escalation", "Acknowledge the frustration, restate the rule, offer the next step."),
              f("Neutral tone", "Stick to facts and avoid sarcasm or public call-outs."),
              f("Confidentiality", "Mod logs, tickets and staff discussions stay in staff channels."),
              f("Teamwork", "Ask for a second opinion and write clear handoff notes."),
              f("Coverage", "Share timezones and activity so every shift is covered."),
            ]),
            code("Example warning message", "Hi! This is a reminder from the moderation team.\nYour recent messages in #general broke rule 2 (no spam).\nPlease keep chats readable so everyone can enjoy them.\nIf you have questions, open a ticket and we’ll gladly help."),
          ],
        },
      ],
    },

    /* ===================== 3. ADMINISTRATOR ===================== */
    {
      id: "administrator", name: "Administrator", title: "Administrator portfolio", color: "#e3a73c", icon: "sliders",
      channels: [
        {
          id: "overview", cat: "Start here", name: "overview",
          topic: "What I do as an administrator",
          blocks: [
            embed(
              "Administration in a nutshell",
              "I build and maintain the foundation: channel structure, roles and permissions, security settings, bots and policies. A well-built server needs far fewer interventions.",
              [
                f("Structure", "Categories, channels and community features that make sense at first glance."),
                f("Permissions", "Roles and overwrites that give people exactly what they need."),
                f("Security", "Verification, AutoMod, raid protection and safe bot management."),
                f("Automation", "Bots for roles, logging, welcomes and repetitive tasks."),
              ]
            ),
            chips("Permissions I manage", [
              "Manage Server", "Manage Roles", "Manage Channels", "Manage Webhooks", "Manage Expressions",
              "Manage Events", "Mention Everyone", "View Audit Log", "Administrator (sparingly)",
            ]),
          ],
        },
        {
          id: "structure", cat: "Build", name: "server-structure",
          topic: "Categories, channels and community features",
          blocks: [
            embed("Layout that scales", "Categories group channels by purpose, and the most important information sits at the top.", [
              f("Info", "Rules, announcements, roles info and FAQ."),
              f("Community", "General chat, media, suggestions and bot commands."),
              f("Support", "Tickets, help and feedback."),
              f("Staff", "Staff chat, mod logs and admin-only channels."),
              f("Voice", "Lounges, event rooms and stages."),
            ]),
            chips("Community features I configure", [
              "Rules channel", "Updates channel", "Welcome screen", "Onboarding", "Membership screening",
              "Forum channels", "Threads", "Announcement channels", "Scheduled events", "Stage channels",
              "Server Insights", "Server Boosts perks",
            ]),
            embed("Naming and upkeep", "Consistent channel names, a short topic on every channel, sensible defaults and archived channels for retired content keep a server easy to navigate."),
          ],
        },
        {
          id: "permissions", cat: "Build", name: "roles-and-permissions",
          topic: "Role hierarchy, permission design and channel overwrites",
          blocks: [
            table("Permission design", ["Permission", "Who gets it", "Why I’m careful"], [
              ["Administrator", "Owner and a few trusted admins", "Bypasses every channel permission."],
              ["Manage Server", "Admins", "Changes settings and can add bots."],
              ["Manage Roles", "Admins", "Can hand out roles below their own top role."],
              ["Manage Channels", "Admins and channel managers", "Can reshape the structure and overwrite permissions."],
              ["Manage Webhooks", "Admins and trusted bots", "Webhooks can post as anything."],
              ["Mention Everyone", "Admins and announcers", "Mass pings, so it’s restricted by default."],
              ["Kick, Ban, Moderate Members", "Moderators", "Needed for the job, but powerful."],
              ["View Audit Log", "Staff", "Read-only accountability."],
            ]),
            embed("Role hierarchy rules", "Discord’s role order decides who can manage whom.", [
              f("Top-down", "Staff can only manage roles below their highest role."),
              f("Bot placement", "Bot roles sit above the roles they manage and below owners and admins."),
              f("Minimal default", "Keep @everyone minimal, then allow per role."),
              f("Cosmetic roles", "Colors and badges live in separate roles from permissions."),
              f("Regular reviews", "Check roles for leftover permissions after staff changes."),
            ]),
            embed("Channel overwrites", "I set permissions at the category level and sync channels to inherit them. Per-channel overwrites are for exceptions only, and I test the result with the View Server As Role feature."),
          ],
        },
        {
          id: "security", cat: "Protect", name: "security-and-safety",
          topic: "Safety settings, bot vetting and incident response",
          blocks: [
            table("Safety settings", ["Setting", "How I use it"], [
              ["Verification level", "Matched to the server’s size and risk, from verified email up to verified phone number."],
              ["Explicit media filter", "Scans media from members in public servers."],
              ["Require 2FA for moderation", "Staff actions need two-factor authentication on Community servers."],
              ["Raid and spam protection", "Alerts enabled, with the option to pause invites or DMs during an incident."],
              ["AutoMod", "Filters for slurs, invites and links, mention-spam limits and staff alerts."],
              ["Invites", "Short expiry, limited uses and creation restricted to trusted roles."],
              ["Bots", "Vetted before adding, minimal permissions, unused bots removed."],
              ["Webhooks", "Reviewed regularly, unknown webhooks deleted."],
            ]),
            steps("When something goes wrong", [
              ["Contain", "Pause invites, lock channels and remove suspicious permissions."],
              ["Investigate", "Read the audit log to see what changed and who did it."],
              ["Recover", "Revert roles and channels, remove bad bots and webhooks."],
              ["Review", "Write down what failed and fix the cause, not just the symptom."],
            ]),
          ],
        },
        {
          id: "onboarding", cat: "Protect", name: "onboarding",
          topic: "A clear first five minutes for new members",
          blocks: [
            steps("Member journey", [
              ["Invite", "Short, trusted invites that don’t lead to spam."],
              ["Verification", "A verification level suited to the community."],
              ["Rules screening", "Members agree to the rules before they can chat."],
              ["Onboarding questions", "Interests choose their roles and default channels."],
              ["Welcome", "A welcome screen and a greeting that point to help channels."],
            ]),
            embed("Why it matters", "A clear first five minutes means fewer rule-breaks, fewer repeated questions and better retention."),
          ],
        },
        {
          id: "bots", cat: "Automate", name: "administration-bots",
          topic: "Bots I use to run servers",
          blocks: [
            table("Administration bots", ["Bot", "What I use it for"], [
              ["Carl-bot", "Reaction roles, auto roles, logging, tags and auto-moderation."],
              ["Dyno", "Auto roles, custom commands, announcements, welcomes and mod logs."],
              ["MEE6", "Welcome messages, leveling with role rewards and reaction roles."],
              ["Wick", "Anti-nuke, anti-raid, verification and lockdowns."],
              ["YAGPDB", "Custom commands, scheduled messages, role menus and automation."],
              ["Statbot", "Server and activity analytics."],
              ["Ticket Tool", "Support, applications and appeals."],
              ["Sesh", "Event scheduling, RSVPs and reminders."],
              ["GiveawayBot", "Giveaways with clear entry rules."],
            ]),
            embed("Bot management habits", "More bots mean more risk, so every one has to earn its place.", [
              f("Vet first", "Check reputation, support and the permissions it asks for."),
              f("Least permissions", "Avoid giving Administrator unless there’s no alternative."),
              f("Test first", "Try new setups in a private channel or test server."),
              f("Document", "Note each bot’s purpose, owner and key settings."),
              f("Maintain", "Remove unused bots and review integrations regularly."),
            ]),
          ],
        },
        {
          id: "policies", cat: "Govern", name: "policies",
          topic: "The written rules that keep staff and members aligned",
          blocks: [
            embed("Policies I write and maintain", "Clear documents make decisions faster and fairer.", [
              f("Server rules", "Short, specific and easy to find."),
              f("Staff guidelines", "What staff can do, what they can’t, and who to ask."),
              f("Punishment guidelines", "The infraction ladder and when to skip it."),
              f("Appeals policy", "Who reviews, how long it takes and what evidence counts."),
              f("Bot policy", "Who approves new bots and which permissions are allowed."),
              f("Advertising and partnerships", "What’s allowed, where and under what terms."),
            ]),
            embed("Compliance", "Policies follow Discord’s Terms of Service, Community Guidelines and server guidelines, including the minimum age and keeping adult content in age-restricted channels."),
            embed("Staff conduct", "No abusing permissions. No moderating members you’re in conflict with, so I hand those cases to another staff member. Staff discussions stay in staff channels, and mod logs and tickets are treated as private."),
          ],
        },
      ],
    },

    /* ===================== 4. MANAGEMENT ===================== */
    {
      id: "management", name: "Management", title: "Management portfolio", color: "#d86ba8", icon: "users",
      channels: [
        {
          id: "overview", cat: "Start here", name: "overview",
          topic: "What I do as a manager",
          blocks: [
            embed(
              "Management in a nutshell",
              "I turn a group of volunteers into a team. I recruit, train and support staff, and I connect the community’s goals to the staff’s day-to-day work.",
              [
                f("Lead", "Set expectations, give feedback and keep the team motivated."),
                f("Plan", "Turn ideas into schedules, owners and checklists."),
                f("Grow", "Run events, partnerships and feedback loops."),
                f("Measure", "Track what’s working and drop what isn’t."),
              ]
            ),
            chips("Management skills", [
              "Recruiting", "Onboarding", "Training", "Feedback", "Conflict resolution", "Delegation",
              "Project planning", "Community analytics", "Crisis communication", "Policy writing",
            ]),
          ],
        },
        {
          id: "team", cat: "People", name: "team-leadership",
          topic: "Recruiting, training and keeping a staff team healthy",
          blocks: [
            steps("Staff lifecycle", [
              ["Recruit", "Applications through forms or tickets, with clear requirements."],
              ["Screen", "Check activity, maturity, judgment and history, with scenario questions."],
              ["Trial", "A supervised trial period with a mentor."],
              ["Train", "A handbook, shadowing, mock scenarios and command cheat sheets."],
              ["Review", "Regular check-ins with honest, specific feedback."],
              ["Promote or part ways", "Clear criteria and a respectful process either way."],
            ]),
            embed("Keeping a team healthy", "Volunteers stay when they feel trusted and supported.", [
              f("Check-ins", "Regular one-to-ones and staff meetings."),
              f("Recognition", "Credit good work publicly."),
              f("Workload", "Rotate hard tasks and watch for burnout."),
              f("Conflict", "Handle disagreements privately and fairly."),
              f("Accountability", "Inactive or rule-breaking staff are addressed early and consistently."),
            ]),
          ],
        },
        {
          id: "growth", cat: "Community", name: "community-growth",
          topic: "Events, partnerships, feedback and retention",
          blocks: [
            embed("Growing a community", "Growth is only useful if members stay.", [
              f("Events", "Game nights, movie nights, tournaments, Q&As and giveaways."),
              f("Partnerships", "Vetted communities with matching audiences and clear terms."),
              f("Retention", "Strong onboarding, active channels, roles and regular content."),
              f("Feedback", "Polls, suggestion channels and open staff Q&As."),
              f("Discovery", "Meeting Server Discovery requirements where the server is eligible."),
            ]),
            embed("Using data", "Server Insights and bots like Statbot show member growth, retention, busy channels and peak hours. I use them to decide what to keep, cut or test."),
          ],
        },
        {
          id: "operations", cat: "Operations", name: "operations",
          topic: "Documentation, KPIs and incident planning",
          blocks: [
            table("Metrics I track", ["Metric", "Why it matters"], [
              ["Ticket response time", "Shows whether members get help quickly."],
              ["Report resolution time", "Shows whether problems are being closed."],
              ["Moderation actions per week", "Reveals spikes and repeat offenders."],
              ["First-week retention", "Shows whether onboarding works."],
              ["Active members and busiest channels", "Guides what to build, merge or retire."],
              ["Staff activity", "Shows coverage gaps and burnout risk."],
            ]),
            embed("Documentation", "A staff handbook, SOPs, rule explanations, command cheat sheets and a change log keep everyone on the same page. Big changes get tested first, announced clearly and reviewed with feedback."),
            steps("Major incident plan", [
              ["Contain", "Stop the damage: lock channels, pause invites, restrict permissions."],
              ["Assign", "Pick an incident lead, a communications owner and an evidence keeper."],
              ["Communicate", "Post a calm, factual update to members and staff."],
              ["Resolve", "Fix the cause and restore normal operation."],
              ["Debrief", "Document what happened and update the playbook."],
            ]),
          ],
        },
        {
          id: "tools", cat: "Operations", name: "management-tools",
          topic: "Bots and tools I use to run a team and a community",
          blocks: [
            table("Management tools", ["Tool", "What I use it for"], [
              ["Sesh", "Event scheduling, RSVPs and reminders."],
              ["Statbot and Server Insights", "Growth and activity data."],
              ["Carl-bot, Dyno, MEE6", "Roles, logging, welcomes, leveling and automation."],
              ["Ticket Tool", "Applications, support and appeals."],
              ["Discord polls and events", "Quick decisions and community events."],
              ["Google Forms or Typeform", "Staff applications and surveys."],
              ["Notion, Trello or Google Docs", "Handbooks, task boards and meeting notes."],
            ]),
            embed("Standards I hold", "Fair, transparent and consistent. Decisions have reasons, changes get announced and feedback gets answered."),
          ],
        },
      ],
    },

    /* ===================== 5. CONTACT ===================== */
    {
      id: "contact", name: "Contact", title: "Say hello", color: "#7983f5", icon: "mail",
      channels: [
        {
          id: "contact-me", cat: "Say hello", name: "contact-me",
          topic: "The fastest way to reach me is a direct message on Discord",
          layout: "contact",
        },
      ],
    },
  ];

  /* ---------- Icons ---------- */
  const SVG = (inner) => '<svg viewBox="0 0 24 24" aria-hidden="true">' + inner + "</svg>";
  const ICONS = {
    home: SVG('<path d="M3 11 12 3l9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'),
    shield: SVG('<path d="M12 3 4 6v5.5c0 4.5 3.3 8 8 9.5 4.7-1.5 8-5 8-9.5V6z"/><path d="m9 12 2 2 4-4"/>'),
    sliders: SVG('<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>'),
    users: SVG('<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.2c2.9.3 5 2.6 5 5.8"/>'),
    mail: SVG('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
    hash: SVG('<path d="M5 9h14M4 15h14M10 3 8 21M16 3l-2 18"/>'),
    menu: SVG('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    chev: SVG('<path d="m6 9 6 6 6-6"/>'),
  };

  /* ---------- DOM helpers ---------- */
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const inline = (s) => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>");

  function el(tag, props, ...kids) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(props || {})) {
      if (v === false || v == null) continue;
      if (k === "html") n.innerHTML = v;
      else if (k === "class") n.className = v;
      else n.setAttribute(k, v);
    }
    kids.flat().forEach((k) => { if (k != null) n.append(k); });
    return n;
  }
  const ico = (name, cls) => el("span", { class: "ico" + (cls ? " " + cls : ""), html: ICONS[name] });
  const paras = (text) => text.split("\n\n").map((p) => el("p", { html: inline(p) }));

  function avatar(size) {
    const a = el("span", { class: "avatar " + (size || "") });
    if (CONFIG.avatarUrl) a.append(el("img", { src: CONFIG.avatarUrl, alt: "" }));
    else a.append(CONFIG.handle.charAt(0).toUpperCase());
    a.append(el("span", { class: "dot" }));
    return a;
  }

  /* ---------- Block renderers ---------- */
  const R = {
    embed(b) {
      const e = el("section", { class: "embed" });
      if (b.title) e.append(el("h2", { class: "embed-title" }, b.title));
      if (b.text) e.append(...paras(b.text));
      if (b.fields) e.append(el("div", { class: "fields" }, b.fields.map((x) => el("div", { class: "field" }, el("b", {}, x.name), el("span", {}, x.value)))));
      return e;
    },
    table(b) {
      const e = el("section", { class: "embed" });
      if (b.title) e.append(el("h2", { class: "embed-title" }, b.title));
      const t = el("table", {},
        el("thead", {}, el("tr", {}, b.head.map((h) => el("th", { scope: "col" }, h)))),
        el("tbody", {}, b.rows.map((r) => el("tr", {}, r.map((c) => el("td", {}, c)))))
      );
      e.append(el("div", { class: "table-wrap" }, t));
      return e;
    },
    chips(b) {
      const e = el("section", { class: "embed" });
      if (b.title) e.append(el("h2", { class: "embed-title" }, b.title));
      e.append(el("div", { class: "chips" }, b.items.map((i) => el("span", { class: "chip" }, i))));
      return e;
    },
    steps(b) {
      const e = el("section", { class: "embed" });
      if (b.title) e.append(el("h2", { class: "embed-title" }, b.title));
      if (b.text) e.append(...paras(b.text));
      e.append(el("ol", { class: "steps" }, b.items.map((s) => el("li", {}, el("b", {}, s[0]), el("span", {}, s[1])))));
      return e;
    },
    code(b) {
      const e = el("section", { class: "embed" });
      if (b.title) e.append(el("h2", { class: "embed-title" }, b.title));
      e.append(el("pre", { class: "code" }, el("code", {}, b.text)));
      return e;
    },
    nav(b) {
      return el("div", { class: "nav-row" }, b.items.map((i) => el("a", { class: "btn" + (i.primary ? " primary" : ""), href: i.href }, i.label)));
    },
  };

  function message(content, first) {
    const gutter = el("div", { class: "msg-gutter" }, first ? avatar("md") : null);
    const body = el("div", { class: "msg-body" });
    if (first) {
      body.append(el("div", { class: "msg-head" },
        el("span", { class: "msg-author" }, CONFIG.handle),
        el("span", { class: "msg-tag" }, "Staff"),
        el("span", { class: "msg-time" }, "Portfolio")));
    }
    body.append(content);
    return el("div", { class: "msg" + (first ? " first" : "") }, gutter, body);
  }

  function intro(ch) {
    return el("div", { class: "intro" },
      el("div", { class: "intro-ico" }, ico("hash")),
      el("div", { class: "intro-title" }, "Welcome to #" + ch.name),
      el("p", { class: "intro-sub" }, ch.topic));
  }

  function contactStage() {
    return el("div", { class: "contact-stage" },
      el("a", { class: "contact-btn", href: CONFIG.profileUrl, target: "_blank", rel: "noopener noreferrer" },
        el("span", { class: "contact-handle" }, CONFIG.displayHandle),
        el("span", { class: "contact-label" }, "Contact Me!")),
      el("p", { class: "contact-note" }, "Opens my Discord profile in a new tab."));
  }

  /* ---------- Static pieces ---------- */
  const $ = (id) => document.getElementById(id);
  const app = $("app"), rail = $("rail"), list = $("channelList"), view = $("view");
  const menuBtn = $("menuBtn");

  $("chev").innerHTML = ICONS.chev;
  $("topHash").innerHTML = ICONS.hash;
  menuBtn.innerHTML = ICONS.menu;

  $("userbar").append(
    avatar(),
    el("div", { class: "who" }, el("b", {}, CONFIG.handle), el("span", {}, CONFIG.status))
  );

  $("members").append(
    el("div", { class: "profile" },
      el("div", { class: "profile-banner" }),
      el("div", { class: "profile-body" },
        avatar("lg"),
        el("div", { class: "profile-name" }, CONFIG.handle),
        el("div", { class: "profile-handle" }, CONFIG.displayHandle),
        el("div", { class: "profile-card" },
          el("h2", {}, "About me"),
          el("p", {}, Y + " years on Discord. I keep communities safe, well built and well run.")),
        el("div", { class: "profile-card" },
          el("h2", {}, "Roles"),
          el("div", { class: "roles" },
            [["Moderator", "#3fb98a"], ["Administrator", "#e3a73c"], ["Manager", "#d86ba8"]].map(([n, c]) =>
              el("span", { class: "role", style: "--rc:" + c }, el("i"), n)))))));

  /* ---------- Rendering ---------- */
  function renderRail(active) {
    rail.replaceChildren();
    SECTIONS.forEach((s, i) => {
      if (i === 1 || i === 4) rail.append(el("div", { class: "rail-sep" }));
      const a = el("a", {
        class: "rail-btn" + (s === active ? " active" : ""),
        href: "#" + s.id,
        "aria-label": s.name,
        "data-tip": s.name,
        style: "--c:" + s.color,
        "aria-current": s === active ? "page" : false,
      }, ico(s.icon));
      rail.append(a);
    });
  }

  function renderChannels(sec, ch) {
    list.replaceChildren();
    $("serverName").textContent = sec.title;
    let last = null;
    sec.channels.forEach((c) => {
      if (c.cat !== last) { list.append(el("div", { class: "cat" }, c.cat)); last = c.cat; }
      list.append(el("a", {
        class: "chan" + (c === ch ? " active" : ""),
        href: "#" + sec.id + "/" + c.id,
        "aria-current": c === ch ? "page" : false,
      }, ico("hash"), el("span", {}, c.name)));
    });
  }

  function renderView(ch) {
    view.replaceChildren();
    const isContact = ch.layout === "contact";
    view.classList.toggle("is-contact", isContact);
    if (isContact) { view.append(contactStage()); return; }
    const feed = el("div", { class: "feed" }, intro(ch));
    ch.blocks.forEach((b, i) => feed.append(message(R[b.type](b), i === 0)));
    view.append(feed);
  }

  function parseRoute() {
    const [s, c] = location.hash.replace(/^#/, "").split("/");
    const sec = SECTIONS.find((x) => x.id === s) || SECTIONS[0];
    const ch = sec.channels.find((x) => x.id === c) || sec.channels[0];
    return { sec, ch };
  }

  let firstRender = true;
  function render() {
    const { sec, ch } = parseRoute();
    app.style.setProperty("--c", sec.color);
    renderRail(sec);
    renderChannels(sec, ch);
    $("channelTitle").textContent = ch.name;
    $("channelTopic").textContent = ch.topic;
    document.title = ch.name + " · " + sec.name + " · " + CONFIG.handle;
    renderView(ch);
    closeDrawer();
    if (!firstRender) { view.scrollTop = 0; view.focus({ preventScroll: true }); }
    firstRender = false;
  }

  /* ---------- Mobile drawer ---------- */
  function setDrawer(open) {
    app.classList.toggle("drawer-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  }
  function closeDrawer() { setDrawer(false); }
  menuBtn.addEventListener("click", () => setDrawer(!app.classList.contains("drawer-open")));
  $("scrim").addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });

  window.addEventListener("hashchange", render);
  render();
})();