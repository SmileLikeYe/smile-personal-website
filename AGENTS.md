# Prototype Instructions

Run the local server yourself and open the preview in the in-app browser. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Prototype Design Decisions

- Homepage concept (2026-07 改版): 个人积累与分发平台 — 宣传自己 + 沉淀影响力。Narrative loop: 写 WRITE（文章）→ 建 BUILD（产品/项目）→ 淀 DISTILL（skill）。内容先在本站沉淀，再分发到 GitHub / 小红书等平台（About 区的"全平台信号台"跟踪各渠道 LIVE/SOON 状态）。
- Layout follows the editorial-magazine reference from github.com/Sac-Y/sac-ai.com: giant serif section wordmarks (About me / Writing / Skills / Build / Let's talk.), numbered index lists with hairline dividers, mono micro-labels, blueprint decorations (rail lines, corner crosses, portrait crosshairs). Avoid gimmicky "tech-demo" visualizations — the user explicitly rejected 华而不实 content (the old Transformer training-panel was removed for this reason).
- Do not use `AI Native` as a visible hero label.
- Use the provided real portrait directly as an asset (framed small, 档案照 style with crosshair marks); do not ask ImageGen to redraw or imitate the face.
- All editable site copy (profile, about, channels, skills, projects, queued, marquee) lives in `src/content/site.js`; components read from it. Values marked `[MOCK]` await real data from the user.
- Blog posts target interviewers at Chinese AI companies and cross-platform readers; new posts are written in Chinese by default. UI mixes English serif wordmarks + mono English micro-labels + Chinese body copy (editorial style).
- Post deep links use the `#post/<slug>` hash format; plain `#section` anchors are reserved for navigation.
- Visual tokens still follow the Monad style reference (`docs/design-reference.md`, from styles.refero.design): warm parchment canvas #f6f3f1 (never pure white) with subtle dot-grid + paper-grain noise, serif headlines at weight 400 only (Newsreader + Chinese serif fallback), ALL UI strings in mono (IBM Plex Mono), single Lake Blue #2b59d1 accent, 1px ash hairline borders + pill buttons instead of shadows. Pastel washes were removed in the editorial redesign.
- The `motion` library is loaded via `LazyMotion features={domAnimation} strict` — always use `m.*` components (never `motion.*`, strict mode throws). Current motion uses: layoutId nav dot, staggered hero entrance, AnimatePresence writing grid↔reader transitions. Marquee/pulse loops stay in CSS.
- Animation rules (from Emil Kowalski's design-eng standards): UI transitions under 300ms, strong ease-out `cubic-bezier(0.23, 1, 0.32, 1)`, only animate transform/opacity, press feedback `scale(0.98)` on :active, stagger 30-80ms. Slow ambient washes are the one exception to the 300ms rule.
- Sections below the hero use the `[data-reveal]` + `.revealed` animation pattern (IntersectionObserver, `card-boot` keyframes). Note for QA scripts: full-page screenshots must freeze animations, and programmatic scrolling must use `behavior: "instant"` because the site sets `scroll-behavior: smooth`.
