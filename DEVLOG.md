# ARTistic Expressions — Dev Log

A running record of decisions, changes, and progress on this project.

---

## 2026-04-24

- Renamed GitHub repo from `my-react-site` to `ARTistic-Expressions`
- Updated `git remote origin` URL to match new repo name
- Updated `index.html` `<title>` from `my-react-site` to `ARTistic Expressions`
- Updated `package.json` `name` field to `artistic-expressions`
- Fixed broken `node_modules` (missing `@rolldown/binding-linux-x64-gnu` native binding due to npm optional-dep bug) by removing `node_modules` and `package-lock.json` and running a clean `npm install`

---

## 2026-04-04

- Integrated AI image generation API into the app
- Iterated through several approaches to handle the API key securely (moved to Vercel environment variable)
- Debugged and resolved a 400 Bad Request error in the API call
- Refined API request format and payload structure across multiple commits
- Updated overall page layout

---

## 2026-04-03

- Initial commit — project scaffolded with Vite + React + Tailwind v4
- Fixed Tailwind v4 configuration issues on setup

---

## Project Overview

**ARTistic Expressions** is a React-based teaching tool for art educators. It supports a multi-day unit on abstract art where students express their personal support systems through visual metaphors.

**Core features:**
- 6 visual metaphors (Mountain, Anchor, Shield, Tree, Fortress, River) with descriptions and AI image generation prompts
- 5-day lesson plan with expandable day-by-day content and linked Google Slides
- Art supply reference list organized by category (foundations, media, adhesives, dry/wet media, tools)
- AI-generated artwork preview based on selected metaphor
- Teaching strategies and accessibility guidance

**Stack:** React 19, Vite 8, Tailwind CSS v4, Lucide React icons, deployed on Vercel
