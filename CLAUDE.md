@AGENTS.md

## Dev tooling & MCP

- **chrome-devtools MCP** is configured in `.mcp.json`. Use it to drive a real Chrome instance for visual/runtime verification of UI and Framer Motion animations (approve the server on first session start).
- **hhosting-ai-devtoolkit** (`D:\project\hhosting-ai-devtoolkit`) is a CLI harness — it ships **no MCP server** in v0.5.0, so use it via the CLI. This project is registered as `jypark-portfolio` (profile `next-web`). Useful commands (run with `node "C:\Program Files\nodejs\node.exe"` if PATH is stale):
  - `node D:\project\hhosting-ai-devtoolkit\bin\ai-devtoolkit.mjs gate --target D:\project\github_page` — quality gate (typecheck/lint/build) before commits.
  - `node D:\project\hhosting-ai-devtoolkit\bin\ai-devtoolkit.mjs capture --name jypark-portfolio` — snapshot project knowledge after a milestone.
  - `node D:\project\hhosting-ai-devtoolkit\bin\ai-devtoolkit.mjs obsidian --query "<topic>" --name jypark-portfolio` — retrieval memory (after `obsidian --init`).
- **Fable 5 playbook** lives at `D:\project\hhosting-ai-devtoolkit\claude\fable5\` (`FABLE5_CORE.md` is the distilled version). Follow its planning/verification discipline.
- **ui-ux-pro-max** design skill is installed under `.claude/skills/`.

## Build / deploy

- Static export for GitHub Pages (user site `JYPark-Code.github.io`, served at root). `npm run build` emits `out/` (gitignored).
- Gate ladder before declaring done: `npm run typecheck` → `npm run lint` → `npm run build` → observe in browser (chrome-devtools MCP).
