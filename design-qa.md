# Design QA

## Scope

- Source visual target: `public/reference/model-core-reference.png`
- Prototype route: `http://127.0.0.1:5177/`
- Latest desktop capture: `qa-desktop-centered-core.png`
- Latest mobile capture: `qa-mobile-centered-core.png`
- Viewports checked: 1440x1024 desktop, 390x844 mobile

## Checks

| Check | Result | Evidence |
| --- | --- | --- |
| Page identity | Pass | Browser title is `Smile Hu - Product Model`. |
| Blank page / app shell | Pass | Hero, training graph, proof cards, notes, and footer render. |
| Framework overlay | Pass | No Vite or React error overlay detected. |
| Horizontal overflow | Pass | Desktop `scrollWidth=1425 <= width=1440`; mobile `scrollWidth=390`. |
| Right-side model graph | Pass | Diagram text/cards remain HTML controls; non-clickable lines/particles/rings are a background image. |
| Core portrait alignment | Pass | Background image center and portrait center both resolve to `cx=933, cy=363` at 1487x1058. |
| Product card imagery | Pass | Three proof card visuals load from individual assets in `public/assets/work-shots/`; all have non-zero natural dimensions. |
| Responsive layout | Pass | Mobile layout stacks hero, model core, training panels, proof cards, notes, and footer without horizontal scroll. |

## Notes

- The real portrait is used instead of the generated silhouette from the visual target.
- The right-side connector lines, particles, glow, and rings are a generated decorative image so the complex linework does not overlap the clickable HTML cards.
- The proof cards use cropped product visual assets so the card imagery remains clean and independent.
- Remaining P3 polish: exact line endpoints in the decorative background are illustrative; clickable card content remains the source of truth.

## Final Result

passed
