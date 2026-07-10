import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jypark-code.github.io"),
  title: "Ji Yong Park — Software Engineer",
  description:
    "Portfolio of Ji Yong Park (박지용), a software engineer — backend-strong, full-stack fast with AI tooling. Browse selected work, then open a project for the full story.",
  openGraph: {
    title: "Ji Yong Park — Software Engineer",
    description:
      "Selected work, journey, and stack of Ji Yong Park (박지용) — reliable web systems, backend to full-stack.",
    url: "https://jypark-code.github.io",
    siteName: "Ji Yong Park",
    type: "website",
  },
};

// Runs before first paint: apply the persisted theme/language to <html> so the
// CSS-driven design (which keys off :root[data-theme] / :root[data-lang]) never
// flashes the wrong theme or language on load. Defaults: dark theme, English.
const noFlash = `(function(){try{var d=document.documentElement;
var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t='dark';d.setAttribute('data-theme',t);
var l=localStorage.getItem('lang');if(l!=='en'&&l!=='ko')l='en';d.setAttribute('data-lang',l);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" data-lang="en" suppressHydrationWarning>
      <head>
        {/* Pretendard — Korean-capable variable font (fixes thin Hangul fallback). */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendard-variable-dynamic-subset.min.css"
        />
        <script dangerouslySetInnerHTML={{ __html: noFlash }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
