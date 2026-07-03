# Design QA

## Scope

- Source visual target: `public/reference/model-core-reference.png`
- Prototype route: `http://127.0.0.1:5177/`
- Latest desktop capture: `qa-desktop-final-user-feedback.png`
- Latest mobile capture: `qa-mobile-final-user-feedback.png`
- Viewports checked: 1440x1024 desktop, 390x844 mobile

## Checks

| Check | Result | Evidence |
| --- | --- | --- |
| Page identity | Pass | Browser title is `Smile Hu - Product Model`. |
| Blank page / app shell | Pass | Hero, training graph, proof cards, notes, and footer render. |
| Framework overlay | Pass | No Vite or React error overlay detected. |
| Horizontal overflow | Pass | Desktop `scrollWidth=1425 <= width=1440`; mobile `scrollWidth=390`. |
| Right-side model graph | Pass | Outputs and Evaluation Loop stay inside the first viewport; Fine-tuning no longer overlaps Evaluation Loop. |
| Product card imagery | Pass | Three proof card visuals load from `public/reference/model-core-reference.png`; all have non-zero natural dimensions. |
| Responsive layout | Pass | Mobile layout stacks hero, model core, training panels, proof cards, notes, and footer without horizontal scroll. |

## Notes

- The real portrait is used instead of the generated silhouette from the visual target.
- The proof cards intentionally reuse cropped areas from the selected visual target so the product-image language matches the approved concept.
- Remaining P3 polish: the desktop proof-card row starts slightly lower than the reference because the live hero uses a larger real portrait treatment and more readable text spacing.

## Final Result

passed
