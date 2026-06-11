# ReplyForge

> **Handle difficult professional conversations with confidence.**

ReplyForge is a private, browser-only communication toolkit that helps you write confident, natural replies for high-stakes professional conversations — payment follow-ups, salary negotiations, client rejections, complaints, and more.

Built with React, TypeScript, Vite, Tailwind CSS, and the Gemini API. Everything runs in your browser. No backend. No database. No data leaves your machine except to the Gemini API.

---

## ✨ Features

- **3 Reply Variations** — Generate distinct replies for every situation
- **Quick Actions** — Make Firmer, More Polite, Shorter, More Human, More Confident
- **Smart Style Matching** — Add your own writing examples for personalised tone
- **Playbooks** — Save and load situational templates
- **Conversation Observations** — Plain-language tone insights, no AI scores
- **Dark / Light Mode** — Persisted across sessions
- **Fully Private** — API key and all data stored only in your browser

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or later
- **npm** 9 or later
- A **Gemini API key** (free at [Google AI Studio](https://aistudio.google.com/app/apikey))

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/replyforge.git
cd replyforge

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

The production bundle will be output to the `dist/` folder.

Preview the production build locally:

```bash
npm run preview
```

---

## 🔑 Gemini API Setup

ReplyForge uses the [Google Gemini API](https://ai.google.dev/) (`gemini-2.0-flash` model) directly from the browser.

1. Go to [Google AI Studio → API Keys](https://aistudio.google.com/app/apikey)
2. Create a new API key (free tier available)
3. Open ReplyForge in your browser
4. Click the **Settings** icon (⚙️) in the top-right header
5. Paste your API key and click **Save API Key**

> **Privacy:** Your API key is stored only in your browser's `localStorage`. It is never sent to any server except Google's Gemini API directly.

---

## 📦 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag and drop the `dist/` folder to netlify.com/drop
```

### GitHub Pages

```bash
npm run build
# Deploy the dist/ folder using gh-pages or GitHub Actions
```

The app is a pure static SPA — deploy the `dist/` folder to any static hosting provider.

---

## 🗂 Project Structure

```
src/
├── components/
│   ├── layout/        # Header, Sidebar, ThemeToggle
│   ├── workspace/     # IncomingMessage, SituationSelector, OutcomeSelector, RoleInput, WritingExamples, GenerateButton
│   ├── results/       # ReplyCard, ReplyGrid, RiskMeter
│   ├── playbooks/     # SavePlaybookModal
│   ├── settings/      # SettingsPanel
│   └── ui/            # Button, Modal, Toast, EmptyState
├── context/           # AppContext — global state via React Context
├── hooks/             # useTheme, useSettings, usePlaybooks, useGeneration, useToast
├── services/          # geminiService.ts — Gemini REST API calls
├── types/             # Shared TypeScript interfaces and constants
└── utils/             # localStorage helpers, promptBuilder, validators, cn
```

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS v3 |
| Icons | Lucide React |
| AI | Google Gemini API (gemini-2.0-flash) |
| Persistence | Browser localStorage |
| State | React Context + Custom Hooks |

---

## 📝 License

MIT — free for personal and commercial use.
