# Design QA

## Scope

- Source visual target: `public/reference/model-core-reference.png`
- Prototype route: `http://127.0.0.1:5177/`
- Latest desktop captures: `qa-review-fixed-desktop-wide.png`, `qa-review-fixed-desktop-1440.png`
- Latest mobile capture: `qa-review-fixed-mobile.png`
- Viewports checked: 1692x1227 desktop, 1440x1024 desktop, 390x844 mobile

## Checks

| Check | Result | Evidence |
| --- | --- | --- |
| Page identity | Pass | Browser title is `Smile Hu - Product Model`. |
| Blank page / app shell | Pass | Hero, training graph, proof cards, notes, and footer render. |
| Framework overlay | Pass | No Vite or React error overlay detected. |
| Horizontal overflow | Pass | 1692 viewport `scrollWidth=1677`, 1440 viewport `scrollWidth=1425`, mobile `scrollWidth=390`. |
| Right-side model graph | Pass | Diagram text/cards remain HTML controls; non-clickable lines, particles, rings, and portrait frame are a decorative background image on desktop. |
| Core portrait alignment | Pass | Desktop uses the composite portrait background; mobile hides it and shows the real portrait as a regular image. |
| 02 adapter readability | Pass | Adapter titles/subtitles use short one-line labels; DOM checks show no wrapping or clipping at 1692, 1440, or 390 widths. |
| Hover / motion behavior | Pass | Buttons, chips, training cards, adapter rows, proof cards, and proof imagery respond on hover without changing element dimensions or causing overlap. |
| Product card imagery | Pass | Three proof card visuals load from individual assets in `public/assets/work-shots/`; all have non-zero natural dimensions. |
| Responsive layout | Pass | Mobile layout stacks hero, model core, training panels, proof cards, notes, and footer without horizontal scroll. |

## Notes

- The real portrait is used instead of the generated silhouette from the visual target.
- The right-side connector lines, particles, glow, rings, and portrait frame are a decorative image so the complex linework does not overlap the clickable HTML cards.
- The 02 adapter subtitles are intentionally short (`Assistant`, `Eval`, `Runtime`, `Loops`, `Workflow`) so the cards stay readable in one line.
- The proof cards use cropped product visual assets so the card imagery remains clean and independent.
- Remaining P3 polish: exact line endpoints in the decorative background are illustrative; clickable card content remains the source of truth.

## Final Result

passed
