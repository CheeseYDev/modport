/* ==========================================================
   ch3z__ | Discord Staff Portfolio
   Single-page portfolio inspired by chezdev.onrender.com.
   Edit profile details in CONFIG. Portfolio content lives in
   SECTIONS below. All navigation scrolls to page sections.
   ========================================================== */
(() => {
  "use strict";

  const CONFIG = {
    handle: "ch3z__",
    displayHandle: "@ch3z__",
    userId: "1493679900576714972",
    years: "9+",
    status: "Open to staff opportunities",
    timezone: "GMT+1",
    avatarUrl: "", // Optional: local image path or image URL.
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
              `I’m a Discord community-focused candidate with ${CONFIG.years} years on the platform and a strong understanding of how well-run servers operate. My interests cover moderation, server administration and staff management , from day-to-day member support to permissions, safety systems and team operations.\n\nThis portfolio is organised like a Discord server. Use the section icons on the left, then browse the channels to explore my knowledge, working methods and familiarity with common tools.`,
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
            embed("How I approach staff responsibilities", "Good staff work is consistent, calm and accountable. The goal is not to use the most permissions or issue the most punishments , it is to protect the community while keeping decisions understandable and fair.", [
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
            embed("Context matters", "I distinguish an honest mistake from repeated or deliberate disruption. I consider the actual rule, the surrounding conversation, the member’s history and the impact on others , without making exceptions for friends or influential members."),
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
            embed("Administration in a nutshell", "An administrator keeps the server organised, secure and maintainable. This means understanding how Discord’s settings work together , channels, roles, permissions, safety controls, integrations and community features.", [
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
            embed("Use metrics responsibly", "Numbers are signals, not a substitute for judgement. I would use activity data to identify patterns and support staff , not to reward unnecessary punishments, pressure volunteers or judge people without context."),
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

  /* ---------- DOM utilities ---------- */
  const $ = (id) => document.getElementById(id);
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]);
  const inline = (value) => escapeHTML(value).replace(/`([^`]+)`/g, "<code>$1</code>");

  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs || {})) {
      if (value === false || value == null) continue;
      if (key === "class") node.className = value;
      else if (key === "html") node.innerHTML = value;
      else if (key === "style") node.setAttribute("style", value);
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

  function icon(name, extraClass = "") {
    const paths = {
      shield: '<path d="M12 3 4.5 6v5.2c0 4.4 3 7.9 7.5 9.8 4.5-1.9 7.5-5.4 7.5-9.8V6z"/><path d="m9 12 2 2 4-4"/>',
      settings: '<path d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Z"/><path d="m19.4 15 .1.1a1.7 1.7 0 0 1-2.4 2.4l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a1.7 1.7 0 0 1-3.4 0v-.2a1.7 1.7 0 0 0-2.9-1.2l-.1.1a1.7 1.7 0 0 1-2.4-2.4l.1-.1a1.7 1.7 0 0 0-1.2-2.9H4a1.7 1.7 0 0 1 0-3.4h.2a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a1.7 1.7 0 0 1 2.4-2.4l.1.1a1.7 1.7 0 0 0 2.9-1.2V2a1.7 1.7 0 0 1 3.4 0v.2a1.7 1.7 0 0 0 2.9 1.2l.1-.1a1.7 1.7 0 0 1 2.4 2.4l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.2a1.7 1.7 0 0 1 0 3.4h-.2a1.7 1.7 0 0 0-1.2 2.9Z"/>',
      users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
      arrow: '<path d="M7 17 17 7M7 7h10v10"/>',
      check: '<path d="m5 12 4 4L19 6"/>',
      menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
      discord: '<path d="M19.7 5.2A18 18 0 0 0 15.3 4l-.5 1a16 16 0 0 0-5.6 0l-.5-1a18 18 0 0 0-4.4 1.2C1.5 9.3.8 13.3 1.1 17.2a18 18 0 0 0 5.4 2.7l1.2-2a11 11 0 0 1-1.9-.9l.5-.4c3.7 1.7 7.7 1.7 11.4 0l.5.4a11 11 0 0 1-1.9.9l1.2 2a18 18 0 0 0 5.4-2.7c.4-4.5-.7-8.5-3.2-12Z"/><circle cx="8.5" cy="11.5" r="1.2"/><circle cx="15.5" cy="11.5" r="1.2"/>',
    };
    return el("span", { class: `icon ${extraClass}`.trim(), html: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.check}</svg>` });
  }

  function makeParagraphs(value) {
    return String(value).split("\n\n").map((part) => el("p", { html: inline(part) }));
  }

  function avatar(className = "") {
    const node = el("span", { class: `avatar ${className}`.trim(), "aria-label": `${CONFIG.handle} avatar` });
    if (CONFIG.avatarUrl) node.append(el("img", { src: CONFIG.avatarUrl, alt: "" }));
    else node.append(document.createTextNode(CONFIG.handle.slice(0, 1).toUpperCase()));
    return node;
  }

  /* ---------- Reusable content renderers ---------- */
  const renderers = {
    embed(block) {
      const card = el("article", { class: "content-card" });
      if (block.title) card.append(el("h3", { class: "card-title" }, block.title));
      if (block.text) card.append(...makeParagraphs(block.text));
      if (block.fields?.length) {
        card.append(el("div", { class: "field-grid" }, block.fields.map((item) =>
          el("div", { class: "field-item" },
            el("strong", {}, item.name),
            el("span", {}, item.value)
          )
        )));
      }
      return card;
    },
    table(block) {
      const card = el("article", { class: "content-card content-card-wide table-card" });
      if (block.title) card.append(el("h3", { class: "card-title" }, block.title));
      const head = el("thead", {}, el("tr", {}, block.head.map((heading) => el("th", { scope: "col" }, heading))));
      const body = el("tbody", {}, block.rows.map((row) => el("tr", {}, row.map((cell) => el("td", {}, cell)))));
      card.append(el("div", { class: "table-wrap" }, el("table", {}, head, body)));
      return card;
    },
    chips(block) {
      const card = el("article", { class: "content-card" });
      if (block.title) card.append(el("h3", { class: "card-title" }, block.title));
      card.append(el("div", { class: "tag-list" }, block.items.map((item) => el("span", { class: "tag" }, item))));
      return card;
    },
    steps(block) {
      const card = el("article", { class: "content-card content-card-wide" });
      if (block.title) card.append(el("h3", { class: "card-title" }, block.title));
      if (block.text) card.append(...makeParagraphs(block.text));
      card.append(el("ol", { class: "process-list" }, block.items.map(([title, description]) =>
        el("li", {}, el("span", { class: "step-marker" }), el("div", { class: "step-copy" }, el("strong", {}, title), el("p", {}, description)))
      )));
      return card;
    },
    code(block) {
      const card = el("article", { class: "content-card content-card-wide" });
      if (block.title) card.append(el("h3", { class: "card-title" }, block.title));
      card.append(el("pre", { class: "code-sample" }, el("code", {}, block.text)));
      return card;
    },
    nav(block) {
      return el("div", { class: "inline-actions" }, block.items.map((item) =>
        el("a", { class: `button ${item.primary ? "button-primary" : "button-secondary"}`, href: item.href }, item.label, icon("arrow"))
      ));
    },
    links(block) {
      const card = el("article", { class: "content-card content-card-wide" });
      if (block.title) card.append(el("h3", { class: "card-title" }, block.title));
      card.append(el("div", { class: "resource-list" }, block.items.map((item) =>
        el("a", { href: item.url, target: "_blank", rel: "noopener noreferrer" }, item.label, icon("arrow"))
      )));
      return card;
    },
  };

  function renderBlock(block) {
    const renderer = renderers[block.type];
    return renderer ? renderer(block) : null;
  }

  /* ---------- Page composition ---------- */
  const sectionById = (id) => SECTIONS.find((section) => section.id === id);
  const homeData = sectionById("home");
  const roleSections = [
    { id: "moderator", title: "Moderator", eyebrow: "01 / MEMBER SAFETY", copy: "Keep conversations safe, handle reports fairly and make sure every action is documented.", icon: "shield", color: "green", points: ["Reports & tickets", "Rule enforcement", "Evidence & appeals"] },
    { id: "administrator", title: "Administrator", eyebrow: "02 / SERVER SYSTEMS", copy: "Build the structure behind a well-run server: permissions, roles, integrations and security.", icon: "settings", color: "gold", points: ["Roles & permissions", "Security & AutoMod", "Bots & configuration"] },
    { id: "management", title: "Management", eyebrow: "03 / TEAM OPERATIONS", copy: "Support the people behind the community with clear processes, training and consistent communication.", icon: "users", color: "pink", points: ["Staff leadership", "Training & standards", "Community operations"] },
  ];

  function renderHeroProfile() {
    const lines = [
      ["const", " staffProfile", " = {"],
      ["  name", `: "${CONFIG.handle}",`],
      ["  platform", ': "Discord",'],
      ["  experience", `: "${CONFIG.years} years",`],
      ["  focus", ": ["],
      ["    ", '"Moderation",'],
      ["    ", '"Administration",'],
      ["    ", '"Management"'],
      ["  ],"],
      ["  approach", ': "Fair · Calm · Accountable",'],
      ["  status", ': "Open to opportunities"'],
      ["};"],
    ];
    const pre = el("pre", { class: "profile-code" });
    lines.forEach((parts, index) => {
      const row = el("span", { class: "code-line" });
      if (parts.length === 3) {
        row.append(el("span", { class: "syntax-keyword" }, parts[0]), parts[1], el("span", { class: "syntax-punctuation" }, parts[2]));
      } else {
        row.append(el("span", { class: "syntax-key" }, parts[0]), el("span", { class: "syntax-value" }, parts[1]));
      }
      pre.append(row);
    });
    return el("div", { class: "profile-code-window" },
      el("div", { class: "window-top" },
        el("div", { class: "window-dots" }, el("i"), el("i"), el("i")),
        el("span", { class: "window-filename" }, "StaffProfile.js"),
        el("span", { class: "window-label" }, "PROFILE")
      ),
      pre,
      el("div", { class: "window-footer" },
        el("span", {}, icon("check"), " Profile ready"),
        el("span", {}, "ch3z__ / staff")
      )
    );
  }

  function renderOverview() {
    const section = el("section", { class: "page-section overview-section", id: "overview", "aria-labelledby": "overview-title" });
    section.append(
      el("div", { class: "section-heading" },
        el("span", { class: "eyebrow" }, "A QUICK INTRODUCTION"),
        el("h2", { id: "overview-title" }, "One community. Three areas of focus."),
        el("p", {}, "Explore the three sides of Discord staff work I’m prepared to contribute to.")
      ),
      el("div", { class: "role-grid" }, roleSections.map((role, index) =>
        el("a", { class: `role-card role-${role.color}`, href: `#${role.id}` },
          el("div", { class: "role-card-top" }, el("span", { class: "role-icon" }, icon(role.icon)), el("span", { class: "role-index" }, role.eyebrow)),
          el("h3", {}, role.title),
          el("p", {}, role.copy),
          el("ul", {}, role.points.map((point) => el("li", {}, icon("check"), point))),
          el("span", { class: "role-link" }, "Explore section", icon("arrow"))
        )
      ))
    );
    return section;
  }

  function renderHomePrinciples() {
    const channel = homeData.channels.find((item) => item.id === "principles");
    const block = channel?.blocks?.[0];
    if (!block) return null;
    const section = el("section", { class: "page-section principles-section", "aria-labelledby": "principles-title" });
    section.append(
      el("div", { class: "section-heading compact-heading" },
        el("span", { class: "eyebrow" }, "HOW I WORK"),
        el("h2", { id: "principles-title" }, "The standard behind every decision.")
      ),
      renderBlock(block)
    );
    return section;
  }

  function renderRoleSection(sectionData) {
    const isModerator = sectionData.id === "moderator";
    const title = sectionData.name === "Administrator" ? "Administrator" : sectionData.name;
    const section = el("section", {
      class: `page-section portfolio-section section-${sectionData.id}`,
      id: sectionData.id,
      "aria-labelledby": `${sectionData.id}-title`,
      style: `--section-accent:${sectionData.color}`,
    });
    section.append(
      el("div", { class: "section-heading" },
        el("span", { class: "eyebrow" }, isModerator ? "01 / MODERATION" : sectionData.id === "administrator" ? "02 / ADMINISTRATION" : "03 / MANAGEMENT"),
        el("h2", { id: `${sectionData.id}-title` }, `${title} portfolio`),
        el("p", {}, sectionData.id === "moderator"
          ? "Member safety, fair enforcement and reliable support workflows."
          : sectionData.id === "administrator"
            ? "The systems, access controls and security practices that keep a server running smoothly."
            : "The people, processes and community decisions that keep a team effective."),
        el("div", { class: "section-rule" })
      )
    );

    sectionData.channels.forEach((channel, index) => {
      const article = el("article", { class: "topic-section", id: `${sectionData.id}-${channel.id}` });
      article.append(
        el("div", { class: "topic-heading" },
          el("span", { class: "topic-index" }, String(index + 1).padStart(2, "0")),
          el("div", {},
            el("h3", {}, channel.name.replace(/-/g, " ")),
            el("p", {}, channel.topic)
          )
        )
      );
      if (channel.blocks?.length) {
        const grid = el("div", { class: "content-grid" });
        channel.blocks.forEach((block) => {
          const rendered = renderBlock(block);
          if (rendered) grid.append(rendered);
        });
        article.append(grid);
      }
      section.append(article);
    });
    return section;
  }

  function renderContact() {
    const section = el("section", { class: "page-section contact-section", id: "contact", "aria-labelledby": "contact-title" });
    section.append(
      el("div", { class: "contact-panel" },
        el("div", { class: "contact-glow" }),
        el("div", { class: "contact-copy" },
          el("span", { class: "eyebrow" }, "04 / GET IN TOUCH"),
          el("h2", { id: "contact-title" }, "Let’s build a better community."),
          el("p", {}, "Have a staff opportunity or want to discuss how I could contribute to your server? Feel free to reach out directly on Discord."),
          el("div", { class: "contact-meta" },
            el("span", {}, icon("discord"), CONFIG.displayHandle),
            el("span", {}, icon("check"), CONFIG.status)
          ),
          el("div", { class: "contact-actions" },
            el("a", { class: "button button-primary contact-main-button", href: CONFIG.profileUrl, target: "_blank", rel: "noopener noreferrer" }, "Contact Me!", icon("arrow")),
            el("button", { class: "button button-secondary copy-button", type: "button", id: "copyHandle" }, "Copy username")
          ),
          el("p", { class: "copy-feedback", id: "copyFeedback", "aria-live": "polite" })
        ),
        el("div", { class: "contact-side-card" },
          el("span", { class: "discord-mark" }, icon("discord")),
          el("span", { class: "contact-side-label" }, "PREFERRED CONTACT"),
          el("strong", {}, CONFIG.displayHandle),
          el("span", { class: "contact-side-note" }, "Discord direct message")
        )
      )
    );
    return section;
  }

  function renderFooter() {
    return el("footer", { class: "site-footer" },
      el("a", { class: "footer-brand", href: "#home" }, "ch3z__", el("span", {}, " / STAFF PORTFOLIO")),
      el("span", {}, `© ${new Date().getFullYear()} ch3z__. Built with clarity and consistency.`),
      el("a", { href: "#home", class: "back-top" }, "Back to top ↑")
    );
  }

  function renderPage() {
    const main = $("pageContent");
    if (!main) return;
    main.replaceChildren();
    main.append(renderHero(), renderOverview(), renderHomePrinciples());
    main.append(renderRoleSection(sectionById("moderator")));
    main.append(renderRoleSection(sectionById("administrator")));
    main.append(renderRoleSection(sectionById("management")));
    main.append(renderContact(), renderFooter());
  }

  function renderHero() {
    const home = el("section", { class: "hero page-section", id: "home", "aria-labelledby": "hero-title" });
    const left = el("div", { class: "hero-copy" },
      el("div", { class: "availability-pill" }, el("span", { class: "online-dot" }), CONFIG.status),
      el("p", { class: "hero-kicker" }, "DISCORD STAFF PORTFOLIO"),
      el("h1", { id: "hero-title" }, "Building safer,", el("br"), el("span", {}, "stronger communities.")),
      el("p", { class: "hero-description" }, `Discord moderation, server administration and community management. With ${CONFIG.years} years on Discord, I bring platform knowledge, a calm approach and an understanding of what makes communities work.`),
      el("div", { class: "hero-actions" },
        el("a", { class: "button button-primary", href: "#moderator" }, "Explore portfolio", icon("arrow")),
        el("a", { class: "button button-secondary", href: "#contact" }, "Get in touch", icon("discord"))
      ),
      el("div", { class: "hero-metrics" },
        el("div", {}, el("strong", {}, `${CONFIG.years}`), el("span", {}, "YEARS ON DISCORD")),
        el("i"),
        el("div", {}, el("strong", {}, "03"), el("span", {}, "STAFF DISCIPLINES")),
        el("i"),
        el("div", {}, el("strong", {}, "ONE"), el("span", {}, "CONSISTENT APPROACH"))
      )
    );
    home.append(el("div", { class: "hero-grid" }, left, renderHeroProfile()));
    home.append(el("div", { class: "hero-bottom-line" },
      el("span", {}, "FOCUS AREAS"),
      el("div", { class: "hero-tags" },
        ["Moderation", "Administration", "Management", "Community Operations"].map((label) => el("span", {}, label))
      )
    ));
    return home;
  }

  /* ---------- Header navigation and interactions ---------- */
  const navLinks = [
    ["home", "Home"],
    ["moderator", "Moderator"],
    ["administrator", "Administrator"],
    ["management", "Management"],
    ["contact", "Contact"],
  ];

  function renderNavigation() {
    const nav = $("primaryNav");
    const mobile = $("mobileNav");
    [nav, mobile].forEach((target) => {
      if (!target) return;
      target.replaceChildren(...navLinks.map(([id, label]) =>
        el("a", { href: `#${id}`, class: id === "contact" ? "nav-contact" : "", "data-section-link": id }, label)
      ));
    });
  }

  function setupMobileMenu() {
    const button = $("menuButton");
    const nav = $("mobileNav");
    if (!button || !nav) return;
    const setOpen = (open) => {
      nav.classList.toggle("open", open);
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      button.innerHTML = open
        ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
    };
    button.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target) && !button.contains(event.target)) setOpen(false);
    });
  }

  function setupScrollSpy() {
    const sections = navLinks.map(([id]) => $(id)).filter(Boolean);
    const links = [...document.querySelectorAll("[data-section-link]")];
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach((link) => {
        const active = link.dataset.sectionLink === visible.target.id;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-25% 0px -60% 0px", threshold: [0, .15, .35, .6] });
    sections.forEach((section) => observer.observe(section));
  }

  function setupCopyButton() {
    const button = $("copyHandle");
    const feedback = $("copyFeedback");
    if (!button || !feedback) return;
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(CONFIG.displayHandle);
        feedback.textContent = "Username copied to clipboard.";
      } catch {
        feedback.textContent = `Copy this username: ${CONFIG.displayHandle}`;
      }
    });
  }

  renderNavigation();
  renderPage();
  setupMobileMenu();
  setupScrollSpy();
  setupCopyButton();
})();
