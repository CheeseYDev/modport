/* ==========================================================
   ch3z__ · Discord staff portfolio
   Edit your profile details in CONFIG and portfolio content
   in SECTIONS. The renderer below builds the Discord-inspired UI.
   ========================================================== */
(() => {
  "use strict";

  const CONFIG = {
    handle: "ch3z__",
    displayHandle: "@ch3z__",
    userId: "1493679900576714972",
    years: "9+",
    status: "Open to staff opportunities",
    avatarUrl: "", // Optional: add a local image path or image URL.
  };
  CONFIG.profileUrl = `https://discord.com/users/${CONFIG.userId}`;

  const field = (name, value) => ({ name, value });
  const embed = (title, text, fields) => ({ type: "embed", title, text, fields });
  const table = (title, head, rows) => ({ type: "table", title, head, rows });
  const chips = (title, items) => ({ type: "chips", title, items });
  const steps = (title, items, text) => ({ type: "steps", title, items, text });
  const code = (title, text) => ({ type: "code", title, text });
  const nav = (items) => ({ type: "nav", items });
  const links = (title, items) => ({ type: "links", title, items });

  const SECTIONS = [
    /* ============================ 1. HOME ============================ */
    {
      id: "home", name: "Home", title: "Staff portfolio", color: "#858cf5", icon: "home",
      channels: [
        {
          id: "welcome", cat: "Start here", name: "welcome",
          topic: "An overview of my Discord staff knowledge and approach",
          blocks: [
            embed(
              "Hi, I’m ch3z__",
              `I’m a Discord community-focused candidate with ${CONFIG.years} years on the platform and a strong understanding of how well-run servers operate. My interests cover moderation, server administration and staff management — from day-to-day member support to permissions, safety systems and team operations.\n\nThis portfolio is organised like a Discord server. Use the section icons on the left, then browse the channels to explore my knowledge, working methods and familiarity with common tools.`,
              [
                field("Moderation", "Fair rule enforcement, reports, tickets, evidence and member support."),
                field("Administration", "Server structure, roles, permissions, security and bot configuration."),
                field("Management", "Staff organisation, training, documentation, community health and planning."),
              ]
            ),
            nav([
              { label: "Moderator portfolio", href: "#moderator", primary: false },
              { label: "Administrator portfolio", href: "#administrator" },
              { label: "Management portfolio", href: "#management" },
              { label: "Contact me", href: "#contact", primary: true },
            ]),
            embed("What this portfolio represents", "A practical overview of the systems, responsibilities and judgement expected from Discord staff. I’m comfortable discussing how I would apply these practices to a server’s specific rules, culture and needs.")
          ],
        },
        {
          id: "at-a-glance", cat: "Start here", name: "at-a-glance",
          topic: "A quick map of the portfolio",
          blocks: [
            table("Portfolio overview", ["Section", "Focus", "Examples"], [
              ["Moderator", "Member safety and rule enforcement", "Reports, timeouts, case logs, tickets, appeals"],
              ["Administrator", "Server systems and configuration", "Roles, permissions, channels, AutoMod, security"],
              ["Management", "People and day-to-day operations", "Recruitment, training, staff standards, planning"],
              ["Contact", "Direct contact", CONFIG.displayHandle],
            ]),
            chips("Core capabilities", [
              "Rule enforcement", "De-escalation", "Report handling", "Ticket workflows", "Evidence handling",
              "Case documentation", "Role hierarchy", "Permission design", "AutoMod", "Raid response",
              "Bot configuration", "Staff training", "Policy writing", "Community planning",
            ]),
            chips("Platforms and tools I’m familiar with", [
              "Discord AutoMod", "Dyno", "Carl-bot", "MEE6", "Wick", "YAGPDB", "Ticket Tool",
              "Sesh", "Statbot", "GiveawayBot", "Discord Audit Log", "Server Insights",
            ]),
          ],
        },
        {
          id: "principles", cat: "About", name: "working-principles",
          topic: "The standards I bring to staff work",
          blocks: [
            embed("How I approach staff responsibilities", "Good staff work is consistent, calm and accountable. The goal is not to use the most permissions or issue the most punishments — it is to protect the community while keeping decisions understandable and fair.", [
              field("Consistent", "Apply the same standard regardless of a member’s role, popularity or relationship with staff."),
              field("Evidence-led", "Check context, message links, IDs and relevant logs before making a decision."),
              field("Proportionate", "Match the response to the severity, intent, history and risk of the behaviour."),
              field("Professional", "Communicate neutrally, protect private information and avoid public arguments."),
              field("Accountable", "Record important actions and make decisions reviewable by other staff."),
              field("Proactive", "Use clear rules, onboarding, permissions and automation to prevent avoidable problems."),
            ]),
          ],
        },
        {
          id: "references", cat: "About", name: "platform-references",
          topic: "Official documentation behind the platform-specific details",
          blocks: [
            embed("Reference-first approach", "Discord and bot features can change. I check current documentation before changing a live server’s configuration, and I treat third-party bot permissions and premium features as something to verify rather than assume."),
            links("Useful documentation", [
              { label: "Discord Community Guidelines", url: "https://discord.com/guidelines" },
              { label: "Discord Roles and Permissions", url: "https://support.discord.com/hc/en-us/articles/214836687-Discord-Roles-and-Permissions" },
              { label: "Discord AutoMod FAQ", url: "https://support.discord.com/hc/en-us/articles/4421269296535-AutoMod-FAQ" },
              { label: "Discord Time Out FAQ", url: "https://support.discord.com/hc/en-us/articles/4413305239191-Time-Out-FAQ" },
              { label: "Dyno Documentation", url: "https://docs.dyno.gg/" },
              { label: "Carl-bot Documentation", url: "https://docs.carl.gg/" },
              { label: "Wick Documentation", url: "https://docs.wick.bot/" },
              { label: "Ticket Tool Documentation", url: "https://ticket-tool.app/docs" },
            ]),
          ],
        },
      ],
    },

    /* ========================= 2. MODERATOR ========================= */
    {
      id: "moderator", name: "Moderator", title: "Moderator portfolio", color: "#43bd91", icon: "shield",
      channels: [
        {
          id: "overview", cat: "Start here", name: "overview",
          topic: "The purpose and responsibilities of a moderator",
          blocks: [
            embed("Moderation in a nutshell", "My approach to moderation is to keep the community safe, welcoming and on-topic. That means understanding the rules, responding to reports, supporting members, using moderation tools correctly and leaving enough context for the rest of the team.", [
              field("Monitor", "Pay attention to reports, public channels, voice activity and automated alerts."),
              field("Assess", "Check the rule, context, intent, impact and relevant moderation history."),
              field("Respond", "Use an appropriate reminder, warning, timeout, kick or ban."),
              field("Document", "Record the reason, evidence, action, duration and case reference where available."),
              field("Support", "Answer questions, handle tickets and escalate decisions outside my authority."),
            ]),
            chips("Relevant Discord permissions", [
              "View Audit Log", "Manage Messages", "Moderate Members", "Kick Members", "Ban Members",
              "Manage Threads", "Manage Nicknames", "Mute Members", "Deafen Members", "Move Members",
            ]),
          ],
        },
        {
          id: "discord-tools", cat: "Tools", name: "discord-tools",
          topic: "Discord’s built-in moderation controls",
          blocks: [
            table("Core moderation tools", ["Tool", "Typical use", "Important detail"], [
              ["Timeout", "Temporarily restrict a member’s participation.", "Timed-out members cannot send messages, react, join voice channels or video calls. Discord’s listed presets range from 60 seconds to one week."],
              ["Kick", "Remove a member who may be allowed to rejoin.", "A kick is not a ban; the member can return with a valid invite."],
              ["Ban", "Remove a member when the behaviour or risk warrants it.", "Use a clear reason and check the target’s role position and relevant evidence."],
              ["Slowmode", "Reduce message frequency in a busy or heated channel.", "Apply it to the channel where it is needed, then review and remove it when appropriate."],
              ["Message moderation", "Delete rule-breaking content and manage threads.", "Preserve relevant context and log serious incidents before content disappears when possible."],
              ["Voice moderation", "Address disruptive voice activity.", "Mute, deafen, move or disconnect members when the server permissions allow it."],
              ["Audit Log", "Review server moderation and configuration events.", "Useful for accountability and investigation, but it does not replace a dedicated case log."],
              ["Discord AutoMod", "Automatically detect and respond to selected content.", "Rules can block messages and send staff alerts; timeout responses are available for custom keyword rules."],
            ]),
            embed("Evidence and case quality", "A moderation decision should be explainable after the original conversation has moved on.", [
              field("Message links", "Keep links to the original messages whenever available."),
              field("IDs", "Use Developer Mode to copy stable user, message and channel IDs."),
              field("Timestamps", "Record when the incident happened and when staff acted."),
              field("Screenshots", "Use as supporting context when necessary, not as the only source if original links are available."),
              field("Privacy", "Keep evidence in restricted staff channels and share it only with people who need it."),
            ]),
          ],
        },
        {
          id: "bots", cat: "Tools", name: "moderation-bots",
          topic: "Common moderation bots and their typical roles",
          blocks: [
            table("Moderation tool familiarity", ["Tool", "Common capabilities"], [
              ["Dyno", "Moderation commands, timed actions, warning and case logs, AutoMod, action logs and configurable modules."],
              ["Carl-bot", "Automod, moderation commands, logging, reaction roles, tags and custom commands."],
              ["MEE6", "Moderation and automod features, welcome messages, leveling and role-related modules; feature availability can depend on the plan."],
              ["Wick", "Anti-raid, join verification and anti-nuke monitoring for suspicious or destructive server changes."],
              ["YAGPDB", "Custom commands, automoderation, role menus, feeds and general server automation."],
              ["Sapphire", "Multi-purpose moderation, automoderation, logging and community utility features."],
              ["Discord AutoMod", "Native keyword and spam filters, message blocking, alerts and selected automatic responses."],
            ]),
            embed("Configuration standards", "I focus on safe permissions, useful logs and predictable behaviour rather than enabling every available feature.", [
              field("Role position", "Place the bot’s highest role above the roles it must manage, while keeping it below trusted human staff."),
              field("Permissions", "Grant only the permissions needed for its configured features. Avoid Administrator by default."),
              field("Mod logs", "Use a private channel and make sure actions include a reason and responsible staff member."),
              field("Testing", "Test filters, exemptions and role behaviour before relying on them in a live community."),
              field("Maintenance", "Review integrations and permissions when the server or bot configuration changes."),
            ]),
          ],
        },
        {
          id: "tickets", cat: "Tools", name: "ticket-systems",
          topic: "Support, reports, appeals and applications",
          blocks: [
            embed("Ticket systems", "Ticket tools provide a private, organised way for members to contact staff. A good setup has clear categories, correct access permissions, a consistent response process and a sensible transcript-retention policy.", [
              field("Support", "Questions, role issues, access problems and general help."),
              field("Reports", "Member reports with message links, IDs and supporting context."),
              field("Appeals", "Requests to review a warning, timeout, kick or ban."),
              field("Applications", "Staff applications or requests for special access."),
              field("Partnerships", "Requests from other communities, where the server accepts them."),
            ]),
            steps("A reliable ticket workflow", [
              ["Acknowledge", "Greet the member and confirm that the request has been received."],
              ["Clarify", "Identify the issue and request only the information needed to review it."],
              ["Verify", "Check message links, IDs, relevant logs and applicable rules."],
              ["Resolve or escalate", "Take an action within my permissions or refer the matter to the appropriate staff member."],
              ["Record", "Add a concise internal note and preserve a transcript when the server’s policy requires it."],
              ["Close", "Explain the outcome, check whether anything remains unresolved and close the ticket."],
            ]),
            embed("Ticket etiquette", "Keep replies respectful and neutral. Do not expose another member’s private case, promise an outcome before reviewing the evidence or leave a ticket without a clear handoff.")
          ],
        },
        {
          id: "rules", cat: "Practice", name: "common-rules",
          topic: "Common community rules and how I interpret them",
          blocks: [
            embed("Rules I’m prepared to enforce", "Every server has its own rulebook, but these are common areas that staff need to understand and apply consistently.", [
              field("Respect", "No harassment, bullying, hate speech, discriminatory slurs or targeted abuse."),
              field("Spam and disruption", "No message flooding, disruptive mass mentions, repeated unwanted content or deliberate channel disruption."),
              field("Channel purpose", "Keep conversations in the appropriate channels and follow channel-specific requirements."),
              field("Privacy", "No doxxing, sharing private information or leaking private conversations without permission."),
              field("Scams and malicious links", "No phishing, impersonation, malware links, fraudulent giveaways or deceptive promotions."),
              field("Advertising", "No unsolicited promotion, server invites or mass-DM advertising where the server prohibits it."),
              field("Impersonation", "Do not pretend to be another member, a staff member or an official platform representative."),
              field("Appropriate content", "Follow the server’s content rules and Discord’s age and safety requirements."),
              field("Platform policies", "Follow Discord’s Terms of Service and Community Guidelines."),
            ]),
            embed("Context matters", "I distinguish an honest mistake from repeated or deliberate disruption. I consider the actual rule, the surrounding conversation, the member’s history and the impact on others — without making exceptions for friends or influential members."),
          ],
        },
        {
          id: "punishments", cat: "Practice", name: "actions-and-appeals",
          topic: "Proportionate enforcement and fair reviews",
          blocks: [
            steps("A practical response ladder", [
              ["Reminder", "For a minor first-time issue where a quick correction is enough."],
              ["Formal warning", "For a clear violation that should be documented."],
              ["Timeout", "For repeated disruption or behaviour that needs a cooling-off period."],
              ["Kick or temporary ban", "For continued or more serious violations, according to server policy."],
              ["Permanent ban", "For severe violations or repeated behaviour where the policy supports removal."],
            ], "This is a guide, not an automatic formula. Serious safety risks can require immediate escalation or stronger action under the server’s rules."),
            embed("Fair appeals", "An appeal should be reviewed on its merits, not dismissed because the member disagrees with staff.", [
              field("Independent review", "Where possible, the original decision-maker should not be the only reviewer."),
              field("Evidence", "Compare the original action with the rule, context and case notes."),
              field("Consistency", "Check whether similar situations have been handled in a comparable way."),
              field("Outcome", "Record the decision and explain the result clearly and respectfully."),
            ]),
          ],
        },
        {
          id: "raids", cat: "Practice", name: "raids-and-safety",
          topic: "Responding to raids, spam waves and suspicious activity",
          blocks: [
            steps("Incident response", [
              ["Contain", "Use the server’s incident procedure: restrict affected channels or invites and tighten verification where appropriate."],
              ["Coordinate", "Notify the designated staff team and assign clear responsibility for moderation and communication."],
              ["Review", "Check Discord alerts, AutoMod events, join patterns, message context and relevant logs."],
              ["Act", "Remove harmful content and apply proportionate action to accounts responsible for clear violations."],
              ["Communicate", "Give members a short, factual update without exposing private evidence or staff-only details."],
              ["Debrief", "Document what happened and improve the server’s prevention and response settings."],
            ]),
            chips("Suspicious activity to recognise", [
              "Mass mentions", "Repeated invite links", "Fake Nitro offers", "Phishing links", "Impersonation",
              "Compromised accounts", "Unusual bot additions", "Unexpected permission changes",
            ]),
            embed("Safety-first handling", "Do not retaliate, encourage vigilantism or circulate harmful material. Preserve relevant evidence, use Discord’s reporting tools for serious platform-policy issues and escalate to the server owner or senior team when needed."),
          ],
        },
        {
          id: "communication", cat: "Practice", name: "communication",
          topic: "Professional communication and staff handoffs",
          blocks: [
            embed("How I communicate", "Moderators represent the server. I aim to make every interaction calm, understandable and focused on resolving the issue.", [
              field("De-escalation", "Acknowledge the concern, explain the applicable rule and give a clear next step."),
              field("Neutrality", "Avoid sarcasm, arguments, public shaming and unnecessary personal comments."),
              field("Confidentiality", "Keep reports, tickets and internal discussions in their designated private spaces."),
              field("Handoffs", "Summarise what happened, what has been checked and what still needs attention."),
              field("Escalation", "Ask for a second opinion when the case is serious, unclear or involves a conflict of interest."),
            ]),
            code("Example warning message", "Hi! This is a reminder from the moderation team.\nYour recent messages in #general broke our rule about spam.\nPlease keep the channel readable and avoid repeating the same content.\nIf you believe this was a mistake, you can contact the staff team through a ticket."),
          ],
        },
      ],
    },

    /* ======================= 3. ADMINISTRATOR ======================= */
    {
      id: "administrator", name: "Administrator", title: "Administrator portfolio", color: "#e8b34f", icon: "sliders",
      channels: [
        {
          id: "overview", cat: "Start here", name: "overview",
          topic: "Building and maintaining the server’s foundation",
          blocks: [
            embed("Administration in a nutshell", "An administrator keeps the server organised, secure and maintainable. This means understanding how Discord’s settings work together — channels, roles, permissions, safety controls, integrations and community features.", [
              field("Structure", "Create a layout that members can understand without needing staff assistance."),
              field("Permissions", "Build role and channel access around responsibility and least privilege."),
              field("Security", "Configure verification, AutoMod, bot access and incident safeguards."),
              field("Automation", "Use integrations to reduce repetitive work without creating unnecessary risk."),
              field("Maintenance", "Review settings, remove unused access and document important changes."),
            ]),
            chips("Relevant permissions", [
              "Manage Server", "Manage Roles", "Manage Channels", "Manage Webhooks", "Manage Events",
              "View Audit Log", "Manage Expressions", "Mention Everyone", "Administrator",
            ]),
          ],
        },
        {
          id: "structure", cat: "Build", name: "server-structure",
          topic: "Channel architecture and community features",
          blocks: [
            embed("A layout that scales", "A server should make the next useful action obvious. I group channels by purpose, keep important information easy to find and avoid unnecessary channel clutter.", [
              field("Information", "Rules, announcements, FAQs, role information and server updates."),
              field("Community", "General discussion, media, topic channels, suggestions and bot commands."),
              field("Support", "Help desk, tickets, reports and appeals."),
              field("Staff", "Private staff chat, moderation logs, admin notes and team resources."),
              field("Voice and events", "Voice lounges, event rooms, stages and scheduled community activities."),
            ]),
            chips("Features I understand", [
              "Community Server", "Onboarding", "Rules Screening", "Welcome Screen", "Forum Channels",
              "Threads", "Announcement Channels", "Scheduled Events", "Stage Channels", "Server Guide",
            ]),
            embed("Consistency and upkeep", "Use clear naming conventions, concise channel descriptions, sensible category permissions and an agreed archive process. Retire channels that no longer serve a purpose rather than letting the server become difficult to navigate."),
          ],
        },
        {
          id: "permissions", cat: "Build", name: "roles-and-permissions",
          topic: "Role hierarchy, channel overwrites and access control",
          blocks: [
            table("Permission design", ["Area", "Approach", "Why it matters"], [
              ["Administrator", "Reserve for the owner and a very small number of highly trusted administrators.", "It grants broad permissions and bypasses channel-specific restrictions."],
              ["Manage Roles", "Give only to staff who genuinely need to maintain roles below their own position.", "Role hierarchy limits which roles and members they can manage."],
              ["Manage Channels", "Restrict to administrators or designated channel managers.", "Prevents accidental or unauthorised structural changes."],
              ["Moderation", "Give moderators the actions required by their defined responsibilities.", "Avoids granting unrelated server-wide powers."],
              ["Webhooks and integrations", "Limit to trusted administrators and approved automation.", "Uncontrolled integrations can post misleading content or create security issues."],
              ["Everyone / default roles", "Start with minimal access and add permissions intentionally.", "Reduces accidental access to private or staff-only spaces."],
            ]),
            embed("Role hierarchy", "Discord’s hierarchy is top-down. A member generally cannot manage members or roles at the same or a higher role position. Bot roles also need to be placed correctly for the actions they are expected to perform.", [
              field("Least privilege", "Assign only the permissions required for the role’s job."),
              field("Separation", "Keep cosmetic roles separate from roles that grant meaningful access."),
              field("Category sync", "Use category-level permissions where practical and create channel overwrites only for genuine exceptions."),
              field("Review", "Re-check access after staff promotions, removals or major server changes."),
            ]),
          ],
        },
        {
          id: "security", cat: "Protect", name: "security-and-safety",
          topic: "Server safety, bot vetting and recovery planning",
          blocks: [
            table("Security controls", ["Control", "Administrative use"], [
              ["Verification level", "Set a level appropriate to the community’s exposure and risk; raise it temporarily during suspicious activity when necessary."],
              ["AutoMod", "Configure keyword and spam rules, exemptions, staff alerts and appropriate automated responses."],
              ["Raid protection", "Use Discord’s available raid alerts and safety controls, alongside a documented staff response."],
              ["2FA requirement", "Enable the available requirement for moderation actions and ensure relevant staff accounts are protected."],
              ["Invites", "Review who can create invites, their expiry and usage limits, and remove links that are no longer needed."],
              ["Bots and apps", "Review the publisher, requested permissions, role position, support and actual purpose before adding them."],
              ["Webhooks", "Review who can create and manage them; remove integrations that are no longer trusted or needed."],
              ["Audit Log", "Use it to trace important changes and support a documented incident review."],
            ]),
            steps("When server security is affected", [
              ["Contain", "Restrict the affected access or channels using the server’s response plan."],
              ["Investigate", "Review Audit Log entries, integrations, role changes and relevant bot alerts."],
              ["Recover", "Remove unauthorised access, restore known-good settings and rotate exposed credentials where appropriate."],
              ["Validate", "Check roles, channels, bots and webhooks for remaining unexpected changes."],
              ["Review", "Document the cause and improve the process to reduce the chance of recurrence."],
            ]),
          ],
        },
        {
          id: "onboarding", cat: "Protect", name: "onboarding",
          topic: "A smooth and safe new-member experience",
          blocks: [
            steps("A clear member journey", [
              ["Join", "Use trusted invite links and an understandable landing point."],
              ["Verify", "Apply a verification level appropriate to the server and its audience."],
              ["Read the rules", "Use Rules Screening or a clear rules channel where appropriate."],
              ["Choose interests", "Use onboarding questions or role menus to guide members to relevant channels."],
              ["Get started", "Provide a welcome message, FAQ and visible support route."],
            ]),
            embed("What good onboarding achieves", "Members should understand where to go, what is expected and how to get help. A clear first experience reduces repeated questions and helps new members participate confidently."),
          ],
        },
        {
          id: "bots", cat: "Automate", name: "administration-bots",
          topic: "Bot selection, configuration and maintenance",
          blocks: [
            table("Common administration tools", ["Tool", "Typical uses"], [
              ["Carl-bot", "Reaction roles, role menus, logging, tags, custom commands and automoderation."],
              ["Dyno", "Moderation, AutoMod, action logs, autoroles, announcements and custom commands."],
              ["MEE6", "Welcome messages, role and leveling features, automod and community utilities."],
              ["Wick", "Anti-nuke monitoring, verification and anti-raid safeguards."],
              ["YAGPDB", "Custom commands, feeds, role menus and configurable automation."],
              ["Ticket Tool", "Ticket panels, categories, permissions, claims and transcripts."],
              ["Sesh", "Event scheduling, RSVPs and reminders."],
              ["Statbot", "Activity and server statistics for community analysis."],
            ]),
            embed("How I evaluate a bot", "A bot should solve a specific problem and be maintained like any other part of the server.", [
              field("Purpose", "Define the task and check whether Discord already provides a suitable native feature."),
              field("Trust", "Review the bot’s documentation, support, reputation and requested access."),
              field("Permissions", "Avoid Administrator unless the feature genuinely requires it and there is no safer setup."),
              field("Testing", "Test configuration, permissions and failure behaviour before broad rollout."),
              field("Ownership", "Document who maintains the bot and who is authorised to change its settings."),
            ]),
          ],
        },
        {
          id: "policies", cat: "Govern", name: "policies-and-integrations",
          topic: "Clear policies and accountable server operations",
          blocks: [
            embed("Policies I understand", "Written standards help members and staff reach the same expectations.", [
              field("Server rules", "Clear, readable rules with examples where a rule could be misunderstood."),
              field("Staff guidelines", "Responsibilities, authority limits, conduct and escalation routes."),
              field("Punishment guidance", "A consistent framework with room for context and serious exceptions."),
              field("Appeals", "A clear route, reasonable expectations and a review process."),
              field("Bot and integration policy", "Who can approve tools, what permissions are acceptable and how access is reviewed."),
              field("Privacy and retention", "Who can view reports and transcripts, where records are stored and when they are removed."),
            ]),
            embed("Staff accountability", "Staff access should never be used for personal disputes, retaliation or private benefit. Conflicts of interest should be declared and the matter passed to another reviewer. Sensitive records stay limited to the people who need them."),
          ],
        },
      ],
    },

    /* ========================= 4. MANAGEMENT ======================== */
    {
      id: "management", name: "Management", title: "Management portfolio", color: "#d77cb1", icon: "users",
      channels: [
        {
          id: "overview", cat: "Start here", name: "overview",
          topic: "Organising people, priorities and daily server operations",
          blocks: [
            embed("Management in a nutshell", "Strong management gives staff clear expectations, useful support and a structure that lets them do their jobs well. It also connects community goals to practical priorities and follows through on decisions.", [
              field("Lead", "Set expectations, communicate decisions and give constructive feedback."),
              field("Organise", "Assign ownership, define priorities and maintain useful documentation."),
              field("Support", "Train staff, resolve internal issues and recognise good work."),
              field("Improve", "Review feedback and server activity, then adjust what is not working."),
            ]),
            chips("Management capabilities", [
              "Recruitment", "Applications", "Onboarding", "Training", "Delegation", "Feedback",
              "Conflict resolution", "Staff reviews", "Project planning", "Policy writing", "Event planning", "Reporting",
            ]),
          ],
        },
        {
          id: "team", cat: "People", name: "staff-leadership",
          topic: "Recruiting, training and supporting a reliable team",
          blocks: [
            steps("A structured staff lifecycle", [
              ["Recruit", "Publish clear requirements and explain the role’s responsibilities."],
              ["Review", "Assess communication, judgement, reliability and understanding of the rules."],
              ["Select", "Use consistent questions and practical scenarios rather than popularity alone."],
              ["Onboard", "Explain permissions, expectations, escalation routes and confidentiality."],
              ["Train", "Use shadowing, a handbook, example cases and supervised practice."],
              ["Review", "Give specific feedback, identify support needs and agree on next steps."],
            ]),
            embed("Keeping a team healthy", "Volunteer teams need realistic expectations and a respectful environment.", [
              field("Check-ins", "Give staff a way to raise concerns and ask for help."),
              field("Recognition", "Acknowledge reliable work and positive contributions."),
              field("Workload", "Share responsibilities and avoid making one person the default for everything."),
              field("Conflict", "Address disagreements privately, fairly and early."),
              field("Accountability", "Apply the same conduct standards to staff as to members."),
            ]),
          ],
        },
        {
          id: "operations", cat: "Operations", name: "staff-operations",
          topic: "Handbooks, routines, responsibilities and team coordination",
          blocks: [
            embed("A predictable staff operation", "Staff should know what needs attention, who owns it and where to find the relevant procedure. Clear systems reduce duplicated work and make handovers easier.", [
              field("Handbook", "Role expectations, rules, permissions, workflows and escalation contacts."),
              field("Shift and coverage", "Agree on reasonable availability and make coverage gaps visible."),
              field("Task ownership", "Give each task a responsible person and a clear completion target."),
              field("Handoffs", "Record the current status, decisions already made and outstanding work."),
              field("Change management", "Test changes, announce them and review feedback after rollout."),
            ]),
            table("Useful operational indicators", ["Indicator", "What it can reveal"], [
              ["Ticket first-response time", "Whether members are being acknowledged promptly."],
              ["Ticket resolution time", "Where requests are becoming delayed or stuck."],
              ["Unresolved reports", "Whether the team has enough coverage or needs a process change."],
              ["Member retention", "Whether onboarding and ongoing community activity are working."],
              ["Staff coverage", "Whether responsibilities are distributed sustainably."],
              ["Repeat incidents", "Whether a rule, explanation or prevention system needs improvement."],
            ]),
            embed("Use metrics responsibly", "Numbers are signals, not a substitute for judgement. I would use activity data to identify patterns and support staff — not to reward unnecessary punishments, pressure volunteers or judge people without context."),
          ],
        },
        {
          id: "growth", cat: "Community", name: "community-development",
          topic: "Member engagement, events and continuous improvement",
          blocks: [
            embed("Healthy community development", "Growth is valuable when members have a reason to participate and a positive experience once they join.", [
              field("Events", "Plan game nights, Q&As, tournaments and other activities that suit the community."),
              field("Partnerships", "Review audience fit, reputation, expectations and clear partnership terms."),
              field("Feedback", "Use suggestions, polls and staff discussions to understand member needs."),
              field("Retention", "Improve onboarding, channel usefulness, regular activities and support."),
              field("Communication", "Keep announcements clear, relevant and consistent."),
            ]),
            embed("Using community data", "Where available, Discord Server Insights and tools such as Statbot can help identify broad patterns in growth and activity. I would combine those signals with member feedback before making changes."),
          ],
        },
        {
          id: "incidents", cat: "Operations", name: "incident-management",
          topic: "Coordinating a response when something goes wrong",
          blocks: [
            steps("Major incident coordination", [
              ["Establish the lead", "Identify who is coordinating the response and who can authorise important decisions."],
              ["Assign responsibilities", "Separate moderation, technical review, evidence notes and member communication."],
              ["Contain the issue", "Use the server’s approved response plan to limit further disruption."],
              ["Communicate", "Share short, factual updates with staff and members at the appropriate level."],
              ["Restore normal operation", "Verify the issue is resolved before removing temporary restrictions."],
              ["Debrief", "Record the timeline, lessons learned and changes needed to prevent recurrence."],
            ]),
            embed("Manager’s role", "A manager should create clarity, not add noise. During an incident I would keep responsibilities clear, avoid speculation, protect private information and make sure the team has a documented path back to normal operations."),
          ],
        },
        {
          id: "management-tools", cat: "Tools", name: "management-tools",
          topic: "Tools for organising a community and its staff",
          blocks: [
            table("Common tools", ["Tool", "Management use"], [
              ["Discord Events and polls", "Coordinate activities, gather input and communicate decisions."],
              ["Sesh", "Schedule events, collect RSVPs and send reminders."],
              ["Statbot / Server Insights", "Review activity and community trends where available."],
              ["Carl-bot / Dyno", "Support role menus, logging, announcements and routine automation."],
              ["Ticket Tool", "Organise support, staff applications, appeals and private requests."],
              ["Forms", "Collect structured applications, surveys and feedback."],
              ["Notion / Trello / Google Docs", "Maintain handbooks, project plans, checklists and meeting notes."],
            ]),
            embed("Management standards", "Decisions should have a clear owner and reason. Staff should know where updates are posted, how to ask for help and how to raise concerns. Changes should be communicated before they become surprises."),
          ],
        },
      ],
    },

    /* ========================== 5. CONTACT ========================= */
    {
      id: "contact", name: "Contact", title: "Contact me", color: "#858cf5", icon: "mail",
      channels: [
        {
          id: "contact-me", cat: "Get in touch", name: "contact-me",
          topic: "Reach me directly through my Discord profile",
          layout: "contact",
        },
      ],
    },
  ];

  /* ---------- Icons ---------- */
  const svg = (inner) => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${inner}</svg>`;
  const ICONS = {
    home: svg('<path d="M3 11 12 3l9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'),
    shield: svg('<path d="M12 3 4 6v5.5c0 4.5 3.3 8 8 9.5 4.7-1.5 8-5 8-9.5V6z"/><path d="m9 12 2 2 4-4"/>'),
    sliders: svg('<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>'),
    users: svg('<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.2c2.9.3 5 2.6 5 5.8"/>'),
    mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
    hash: svg('<path d="M5 9h14M4 15h14M10 3 8 21M16 3l-2 18"/>'),
    menu: svg('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    chev: svg('<path d="m6 9 6 6 6-6"/>'),
    external: svg('<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/>'),
  };

  /* ---------- DOM helpers ---------- */
  const $ = (id) => document.getElementById(id);
  const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]);
  const inline = (value) => esc(value).replace(/`([^`]+)`/g, "<code>$1</code>");

  function el(tag, props, ...children) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(props || {})) {
      if (value === false || value == null) continue;
      if (key === "class") node.className = value;
      else if (key === "style") node.setAttribute("style", value);
      else if (key === "html") node.innerHTML = value;
      else if (key.startsWith("on") && typeof value === "function") node.addEventListener(key.slice(2).toLowerCase(), value);
      else if (value === true) node.setAttribute(key, "");
      else node.setAttribute(key, String(value));
    }
    children.flat(Infinity).forEach((child) => {
      if (child == null) return;
      node.append(child instanceof Node ? child : document.createTextNode(String(child)));
    });
    return node;
  }

  const ico = (name, extraClass = "") => el("span", {
    class: `ico ${extraClass}`.trim(), html: ICONS[name] || ICONS.hash, "aria-hidden": "true",
  });
  const paras = (value) => String(value).split("\n\n").map((paragraph) => el("p", { html: inline(paragraph) }));

  function avatar(size = "") {
    const node = el("span", { class: `avatar ${size}`.trim(), "aria-label": `${CONFIG.handle} avatar` });
    if (CONFIG.avatarUrl) node.append(el("img", { src: CONFIG.avatarUrl, alt: "" }));
    else node.append(document.createTextNode(CONFIG.handle.charAt(0).toUpperCase()));
    node.append(el("span", { class: "dot", "aria-hidden": "true" }));
    return node;
  }

  /* ---------- Content block renderers ---------- */
  const R = {
    embed(block) {
      const section = el("section", { class: "embed" });
      if (block.title) section.append(el("h2", { class: "embed-title" }, block.title));
      if (block.text) section.append(...paras(block.text));
      if (block.fields?.length) {
        section.append(el("div", { class: "fields" }, block.fields.map((item) =>
          el("div", { class: "field" }, el("b", {}, item.name), el("span", {}, item.value))
        )));
      }
      return section;
    },
    table(block) {
      const section = el("section", { class: "embed" });
      if (block.title) section.append(el("h2", { class: "embed-title" }, block.title));
      const head = el("thead", {}, el("tr", {}, block.head.map((heading) => el("th", { scope: "col" }, heading))));
      const body = el("tbody", {}, block.rows.map((row) => el("tr", {}, row.map((cell) => el("td", {}, cell)))));
      section.append(el("div", { class: "table-wrap" }, el("table", {}, head, body)));
      return section;
    },
    chips(block) {
      const section = el("section", { class: "embed" });
      if (block.title) section.append(el("h2", { class: "embed-title" }, block.title));
      section.append(el("div", { class: "chips" }, block.items.map((item) => el("span", { class: "chip" }, item))));
      return section;
    },
    steps(block) {
      const section = el("section", { class: "embed" });
      if (block.title) section.append(el("h2", { class: "embed-title" }, block.title));
      if (block.text) section.append(...paras(block.text));
      section.append(el("ol", { class: "steps" }, block.items.map(([title, description]) =>
        el("li", {}, el("b", {}, title), el("span", {}, description))
      )));
      return section;
    },
    code(block) {
      const section = el("section", { class: "embed" });
      if (block.title) section.append(el("h2", { class: "embed-title" }, block.title));
      section.append(el("pre", { class: "code" }, el("code", {}, block.text)));
      return section;
    },
    nav(block) {
      return el("div", { class: "nav-row" }, block.items.map((item) =>
        el("a", { class: `btn${item.primary ? " primary" : ""}`, href: item.href }, item.label)
      ));
    },
    links(block) {
      const section = el("section", { class: "embed" });
      if (block.title) section.append(el("h2", { class: "embed-title" }, block.title));
      section.append(el("div", { class: "reference-links" }, block.items.map((item) =>
        el("a", { href: item.url, target: "_blank", rel: "noopener noreferrer" }, item.label, ico("external"))
      )));
      return section;
    },
  };

  function message(content, first = false) {
    const gutter = el("div", { class: "msg-gutter" }, first ? avatar("md") : null);
    const body = el("div", { class: "msg-body" });
    if (first) {
      body.append(el("div", { class: "msg-head" },
        el("span", { class: "msg-author" }, CONFIG.handle),
        el("span", { class: "msg-tag" }, "Portfolio"),
        el("span", { class: "msg-time" }, "Staff profile")
      ));
    }
    body.append(content);
    return el("article", { class: `msg${first ? " first" : ""}` }, gutter, body);
  }

  function intro(channel) {
    return el("div", { class: "intro" },
      el("div", { class: "intro-ico" }, ico("hash")),
      el("div", { class: "intro-title" }, `Welcome to #${channel.name}`),
      el("p", { class: "intro-sub" }, channel.topic)
    );
  }

  function contactStage() {
    return el("div", { class: "contact-stage" },
      el("div", { class: "contact-orb" }, ico("mail")),
      el("p", { class: "contact-eyebrow" }, "THE BEST WAY TO REACH ME"),
      el("a", {
        class: "contact-btn", href: CONFIG.profileUrl, target: "_blank", rel: "noopener noreferrer",
        "aria-label": `Open ${CONFIG.displayHandle}'s Discord profile in a new tab`,
      },
        el("span", { class: "contact-handle" }, CONFIG.displayHandle),
        el("span", { class: "contact-label" }, "Contact Me!"),
        el("span", { class: "contact-arrow" }, "Open Discord", ico("external"))
      ),
      el("p", { class: "contact-note" }, "This opens my Discord profile in a new tab."),
      el("button", { class: "copy-handle", type: "button", "data-copy": CONFIG.displayHandle }, "Copy username"),
      el("p", { class: "copy-feedback", id: "copyFeedback", "aria-live": "polite" })
    );
  }

  /* ---------- Static profile UI ---------- */
  const app = $("app");
  const rail = $("rail");
  const channelList = $("channelList");
  const view = $("view");
  const menuButton = $("menuBtn");

  if (!app || !rail || !channelList || !view || !menuButton) {
    console.error("Portfolio could not start: a required HTML element is missing.");
    return;
  }

  $("chev").innerHTML = ICONS.chev;
  $("topHash").innerHTML = ICONS.hash;
  menuButton.innerHTML = ICONS.menu;

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
          el("p", {}, `${CONFIG.years} years on Discord. Interested in helping communities stay safe, organised and well managed.`)
        ),
        el("div", { class: "profile-card" },
          el("h2", {}, "Role focus"),
          el("div", { class: "roles" },
            [["Moderator", "#43bd91"], ["Administrator", "#e8b34f"], ["Manager", "#d77cb1"]].map(([label, colour]) =>
              el("span", { class: "role", style: `--rc:${colour}` }, el("i"), label)
            )
          )
        ),
        el("div", { class: "profile-card profile-status" },
          el("span", { class: "status-dot" }),
          el("span", {}, CONFIG.status)
        )
      )
    )
  );

  /* ---------- Navigation and rendering ---------- */
  function renderRail(activeSection) {
    rail.replaceChildren();
    SECTIONS.forEach((section, index) => {
      if (index === 1 || index === 4) rail.append(el("div", { class: "rail-sep", "aria-hidden": "true" }));
      rail.append(el("a", {
        class: `rail-btn${section === activeSection ? " active" : ""}`,
        href: `#${section.id}`,
        "aria-label": section.name,
        "data-tip": section.name,
        style: `--c:${section.color}`,
        "aria-current": section === activeSection ? "page" : null,
      }, ico(section.icon)));
    });
  }

  function renderChannels(section, activeChannel) {
    channelList.replaceChildren();
    $("serverName").textContent = section.title;
    let previousCategory = null;
    section.channels.forEach((channel) => {
      if (channel.cat !== previousCategory) {
        channelList.append(el("div", { class: "cat" }, channel.cat));
        previousCategory = channel.cat;
      }
      channelList.append(el("a", {
        class: `chan${channel === activeChannel ? " active" : ""}`,
        href: `#${section.id}/${channel.id}`,
        "aria-current": channel === activeChannel ? "page" : null,
      }, ico("hash"), el("span", {}, channel.name)));
    });
  }

  function renderView(channel) {
    view.replaceChildren();
    const isContact = channel.layout === "contact";
    view.classList.toggle("is-contact", isContact);
    if (isContact) {
      view.append(contactStage());
      view.querySelector("[data-copy]")?.addEventListener("click", async (event) => {
        const button = event.currentTarget;
        const feedback = $("copyFeedback");
        try {
          await navigator.clipboard.writeText(button.dataset.copy);
          feedback.textContent = "Username copied.";
        } catch {
          feedback.textContent = `Copy manually: ${button.dataset.copy}`;
        }
      });
      return;
    }
    const feed = el("div", { class: "feed" }, intro(channel));
    channel.blocks.forEach((block, index) => {
      const renderer = R[block.type];
      if (renderer) feed.append(message(renderer(block), index === 0));
    });
    view.append(feed);
  }

  function parseRoute() {
    const [sectionId, channelId] = location.hash.replace(/^#/, "").split("/");
    const section = SECTIONS.find((item) => item.id === sectionId) || SECTIONS[0];
    const channel = section.channels.find((item) => item.id === channelId) || section.channels[0];
    return { section, channel };
  }

  let firstRender = true;
  function render() {
    const { section, channel } = parseRoute();
    app.style.setProperty("--c", section.color);
    renderRail(section);
    renderChannels(section, channel);
    $("channelTitle").textContent = channel.name;
    $("channelTopic").textContent = channel.topic;
    document.title = `${channel.name} · ${section.name} · ${CONFIG.handle}`;
    renderView(channel);
    closeDrawer();
    if (!firstRender) {
      view.scrollTop = 0;
      view.focus({ preventScroll: true });
    }
    firstRender = false;
  }

  /* ---------- Mobile channel drawer ---------- */
  function setDrawer(open) {
    app.classList.toggle("drawer-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close channels" : "Open channels");
  }
  function closeDrawer() { setDrawer(false); }

  menuButton.addEventListener("click", () => setDrawer(!app.classList.contains("drawer-open")));
  $("scrim").addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDrawer();
  });
  window.addEventListener("hashchange", render);
  render();
})();