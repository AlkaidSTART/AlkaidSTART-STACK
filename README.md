# AlkaidLight Blog 🌟

> A modern, AI-friendly personal blog built with **Next.js (App Router)** and **Vibe Coding** philosophy.

## 👋 About Me (自我介绍)

Hello! I'm **Alkaid**, a passionate developer exploring the frontiers of software engineering and AI.

This blog is my digital garden where I share:
- 🚀 Tech insights and tutorials
- 🤖 AI experiments and MCP integrations
- 💡 Thoughts on "Vibe Coding" and modern development workflows

## 🛠️ Tech Stack

This project is built with a cutting-edge stack designed for performance and developer experience:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, SSG)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Content**: MDX (Markdown + React)
- **Search**: [Pagefind](https://pagefind.app/) (Static, client-side search)
- **Comments**: [Giscus](https://giscus.app/) (GitHub Discussions)
- **Deployment**: GitHub Actions + GitHub Pages
- **AI Integration**: Custom MCP Endpoint for AI Agents

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/AlkaidSTART/AlkaidSTART-STACK.git
    cd alkaidlight
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it.

4.  **Build for production**:
    ```bash
    npm run build
    ```
    This will generate the static site in the `out` directory and index the content for search.

## 📝 Writing Posts

Create a new `.mdx` file in `content/posts/`:

```markdown
---
title: 'My New Post'
date: '2026-02-20'
description: 'Description for SEO'
tags: ['nextjs', 'coding']
---

# Content starts here...
```

## 🤖 AI Access (MCP)

This blog exposes its content via a Model Context Protocol (MCP) compatible endpoint at:
`https://your-domain.com/api/mcp.json`

AI agents can use this to index and understand your blog posts automatically.

---

© 2026 AlkaidLight. Built with ❤️ and 🤖.
