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
- Visual language follows the Monad style reference (`docs/design-reference.md`, from styles.refero.design): warm parchment canvas #f6f3f1 (never pure white), serif headlines at weight 400 only (Newsreader + Chinese serif fallback), ALL UI strings in mono (IBM Plex Mono), single Lake Blue #2b59d1 accent reserved for primary actions, pastel gradient washes (coral/sky/mint/gold) as decoration only, 1px ash hairline borders + pill buttons instead of shadows.
- The `motion` library is loaded via `LazyMotion features={domAnimation} strict` — always use `m.*` components (never `motion.*`, strict mode throws). Current motion uses: layoutId nav dot, staggered hero entrance, count-up stats, AnimatePresence reader transitions. Ambient washes stay in CSS.
- Animation rules (from Emil Kowalski's design-eng standards): UI transitions under 300ms, strong ease-out `cubic-bezier(0.23, 1, 0.32, 1)`, only animate transform/opacity, press feedback `scale(0.98)` on :active, stagger 30-80ms. Slow ambient washes are the one exception to the 300ms rule.
- Sections below the hero use the `[data-reveal]` + `.revealed` animation pattern (IntersectionObserver, `card-boot` keyframes). Note for QA scripts: full-page screenshots must freeze animations, and programmatic scrolling must use `behavior: "instant"` because the site sets `scroll-behavior: smooth`.
