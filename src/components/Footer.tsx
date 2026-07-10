import { T } from "./T";
import { CONTACT } from "@/data/profile";

export default function Footer() {
  return (
    <footer>
      <div className="wrap foot-inner">
        <span className="mono">
          <T en="© 2026 Ji Yong Park · built with Next.js" ko="© 2026 박지용 · Next.js로 제작" />
        </span>
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
