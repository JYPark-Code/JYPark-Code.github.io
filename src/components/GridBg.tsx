/**
 * Neutral "blueprint" dot-grid backdrop for light theme — a static, colourless,
 * barely-there texture that sits behind all content (styling in globals.css
 * `.gridbg`). It adds a crafted, engineered feel without pulling focus from the
 * résumé or competing with the pastel cards. Shown only in light theme; dark
 * keeps the Starfield canvas. No JS/canvas cost.
 */
export default function GridBg() {
  return <div className="gridbg" aria-hidden="true" />;
}
