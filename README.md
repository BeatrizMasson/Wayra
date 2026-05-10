# 🪁 Wayra — AI-Powered Travel Planner

> Your intelligent travel guide. Generate personalized day-by-day itineraries and safety briefings for any destination in the world — in 8 languages.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Claude AI](https://img.shields.io/badge/Anthropic-Claude-CC785C?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## ✨ What is Wayra?

**Wayra** (wind in Quechua — movement, freedom) is an AI-powered travel planning app that builds fully personalized itineraries based on your travel style, budget, and preferences.

In less than 3 minutes, you answer a few questions and Wayra delivers:

- 📅 **Day-by-day itinerary** — morning, afternoon and evening activities, tailored to your pace
- 🍽️ **Curated restaurants** — one pick per day matched to your cuisine preferences
- 🛡️ **"No Surprises" Briefing** — everything you need to know before you fly: visas, vaccines, driving rules, tipping culture, safety, weather and more
- 🚗 **Rental car module** — vehicle type, transmission, extras, and local driving rules
- 🌍 **8 languages** — Portuguese, English, Spanish, Mandarin, French, German, Italian, Arabic (with full RTL support)

---

## 🖥️ Features

| Feature | Description |
|---|---|
| 🗺️ Smart itinerary | AI-generated day-by-day plan optimized for your travel style |
| 🛡️ Safety briefing | Visas, vaccines, driving rules, weather, money, dress code |
| 🚗 Car rental module | Vehicle type, gear, extras, and local traffic rules |
| 🌍 8 languages | Full UI and AI-generated content in the selected language |
| 📱 Mobile-first | Designed for phones — clean, minimal, card-based layout |
| 🔒 Secure | API key lives on the server — never exposed to the browser |

---

## 🚀 Deploy in 5 Minutes (Vercel)

### Step 1 — Get your API Key
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Click **API Keys → Create Key**
3. Copy and save your key

### Step 2 — Upload to GitHub
1. Go to [github.com](https://github.com) and create a free account
2. Click **New repository** → name it `wayra` → **Create repository**
3. Upload all files from this folder

### Step 3 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → sign in with GitHub
2. Click **Add New Project** → select the `wayra` repository
3. Click **Deploy** — settings are auto-detected

### Step 4 — Add your API Key
1. In Vercel, go to **Settings → Environment Variables**
2. Add a new variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your key from Step 1
3. Click **Save**, then **Redeploy**

Your app will be live at a URL like `https://wayra.vercel.app`.

---

## 💻 Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file
cp .env.example .env.local

# 3. Add your API key to .env.local
# ANTHROPIC_API_KEY=sk-ant-your-key-here

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗂️ Project Structure

```
wayra/
├── src/
│   └── app/
│       ├── page.js              # Entry point
│       ├── layout.js            # Root layout
│       ├── WayraApp.jsx         # Main app (all screens + logic)
│       └── api/
│           └── claude/
│               └── route.js     # Server-side API proxy (keeps key safe)
├── public/                      # Static assets
├── .env.example                 # Environment variable template
├── next.config.js
└── package.json
```

---

## 🌍 Supported Languages

| Language | Code | RTL |
|---|---|---|
| 🇧🇷 Português | `pt` | No |
| 🇺🇸 English | `en` | No |
| 🇪🇸 Español | `es` | No |
| 🇨🇳 中文 (Mandarin) | `zh` | No |
| 🇫🇷 Français | `fr` | No |
| 🇩🇪 Deutsch | `de` | No |
| 🇮🇹 Italiano | `it` | No |
| 🇸🇦 العربية (Arabic) | `ar` | Yes |

---

## 💰 API Cost Estimate

Wayra uses **Claude Sonnet** via the Anthropic API. Each itinerary generation makes 3 API calls.

| Usage | Cost per itinerary | Suggested monthly budget |
|---|---|---|
| Personal / testing | ~$0.04 | $5 |
| Friends & family | ~$0.04 | $15 |
| Public app | ~$0.04 | $100+ |

> Tip: Set a monthly spending limit in the Anthropic Console under **Settings → Billing → Usage limits** to avoid unexpected charges.

---

## 🧱 Tech Stack

- **[Next.js 14](https://nextjs.org/)** — React framework with App Router
- **[React 18](https://react.dev/)** — UI library
- **[Anthropic Claude API](https://www.anthropic.com/)** — AI generation
- **[Vercel](https://vercel.com/)** — Deployment and hosting

---

## 📋 Onboarding Flow

Wayra asks 4–5 quick questions before generating:

1. **Destination & dates** — where, from where, when
2. **Traveler profile** — who's going, budget level
3. **Travel style** — up to 3 interests + travel pace
4. **Practical details** — transport preference, dietary restrictions
5. **Car module** *(only if rental car selected)* — vehicle type, transmission, extras

---

## 🔐 Security

The Anthropic API key is stored as a server-side environment variable and proxied through `/api/claude`. It is never exposed to the client browser.

---

## ✈️ About the Name

**Wayra** means *wind* in Quechua, the language of the Andes. Wind represents movement, freedom, and the spirit of exploration.

---

## 📄 License

MIT — free to use, modify and distribute.

---

*Built with ❤️ and powered by Claude AI*
