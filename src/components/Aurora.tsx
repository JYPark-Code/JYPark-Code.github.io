/**
 * Ambient "daylight aurora" backdrop for light theme — two or three large, very
 * pale washes of the signature colours that drift slowly, like soft morning
 * light. Pure CSS (see globals.css `.aurora`), shown only in light theme; the
 * dark theme uses the Starfield canvas instead. No JS/canvas cost.
 */
export default function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
  );
}
