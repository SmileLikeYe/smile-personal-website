# Prototype Instructions

Run the local server yourself and open the preview in the in-app browser. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Prototype Design Decisions

- Homepage concept: Smile Hu as an A-level product model.
- Narrative: Tongji CS is pre-training; PIN AI, MTEB, iOS/mobile AI, Codex skills, and agent workflows are fine-tuning; shipped products, PRs, notes, and systems are outputs.
- Do not use `AI Native` as a visible hero label.
- Use the provided real portrait directly as an asset; do not ask ImageGen to redraw or imitate the face.
- Motion should explain the model flow: context in, fine-tuning adapters, outputs, and evaluation loop.
- All editable site copy (profile, hero stats, projects, about) lives in `src/content/site.js`; components read from it. Numbers marked `[MOCK]` await real data from the user.
- Blog posts target interviewers at Chinese AI companies; new posts are written in Chinese by default, UI copy stays in English.
- Post deep links use the `#post/<slug>` hash format; plain `#section` anchors are reserved for navigation.
- Sections below the hero use the `[data-reveal]` + `.revealed` animation pattern (IntersectionObserver, `card-boot` keyframes). Note for QA scripts: full-page screenshots must freeze animations, and programmatic scrolling must use `behavior: "instant"` because the site sets `scroll-behavior: smooth`.
