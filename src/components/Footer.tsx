import { T } from "./T";
import { CONTACT } from "@/data/profile";
import Colophon from "./Colophon";

export default function Footer() {
  return (
    <footer>
      <div className="wrap foot-inner">
        <Colophon />
        <div className="foot-links">
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="#top">
            <T en="Back to top ↑" ko="맨 위로 ↑" />
          </a>
        </div>
      </div>
    </footer>
  );
}
