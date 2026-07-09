import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages (user site served at root).
  output: "export",
  // The export target has no image optimization server.
  images: { unoptimized: true },
  // Emit trailing-slash directories so Pages serves /section/ cleanly.
  trailingSlash: true,
};

export default nextConfig;
