# CV Project – Polish Todo

## Data Model
- [ ] Update fallback `cv.json` to include all fields used in templates (e.g., `edu.url`, `edu.department`, `edu.major`).
- [ ] Add optional chaining (`?.`) in templates for fields that may be missing, to avoid rendering `undefined`.
- [ ] Verify real `cv.json` matches the structure expected by all template functions.

## CSS & Class Names
- [ ] Rename `.languages-content` in `renderSkillGroup` to something more semantic (e.g., `.skills-group-items`).
- [ ] Consider using separate classes for skill items vs. language items to avoid confusion.

## PDF Export
- [ ] Explore `window.print()` as an alternative PDF method (using a print stylesheet) for selectable text and standard page sizes.
- [ ] Lazy-load `html2canvas` and `pdf-lib` only when export button is clicked to improve initial page load.
- [ ] Test PDF output on different browsers; adjust scale or page size if needed.

## Performance & Dependencies
- [ ] Remove `MathJax` script if it’s not needed (unlikely for a CV).
- [ ] Minify CSS and JS for production deployment.

## Code Organization
- [ ] Move `CVApplication` class and PDF export function into separate `.js` files (e.g., `cv-app.js`, `pdf-export.js`).
- [ ] Extract fallback CV data into its own JSON file or a dedicated JS constant file.

## Accessibility
- [ ] Add `aria-hidden="true"` to the indicator characters (`■▸□`) so screen readers ignore them.
- [ ] Consider using a more accessible progress bar (CSS-based with ARIA attributes) for skill/language levels.
- [ ] Ensure theme toggle button has an accessible label (already there, but double-check).

## Anti‑crawler / Contact Reveal
- [ ] Ensure `dec` function from `script.js` is loaded before `setupDecryptionHandlers` runs.
- [ ] Evaluate if hover-to-reveal is user‑friendly; maybe add a small “Reveal” button as an alternative.
- [ ] Test on touch devices (hover doesn’t work) – focus event should cover taps, but verify.

## Miscellaneous
- [ ] Add a print stylesheet for a clean, printer‑friendly version.
- [ ] Consider adding a meta theme-color for better mobile browser integration.
- [ ] Validate HTML and CSS with W3C validators for any minor issues.
