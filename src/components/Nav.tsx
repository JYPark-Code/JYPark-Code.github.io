import PrefToggles from "./PrefToggles";
import VisitorCount from "./VisitorCount";

// Nav tabs stay English in both languages (UI chrome), per the user's preference.
export default function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#top" className="brand">
          JYPark.dev
        </a>
        <VisitorCount variant="nav" />
        <nav className="nav-links" aria-label="Sections">
          <a href="#browse" className="sec">
            work
          </a>
          <a href="#journey" className="sec">
            journey
          </a>
          <a href="#about" className="sec">
            about
          </a>
          <a href="#contact">contact</a>
          <PrefToggles />
        </nav>
      </div>
    </header>
  );
}
