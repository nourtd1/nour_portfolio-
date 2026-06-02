<div align="center">

# 🖥️ NOUR'DEV — Interactive Portfolio 2026

**ANNOUR MAHAMAT ABDOULAYE**  
*Software Engineer · Mobile & Web Developer*  
Gisenyi, Rwanda 🇷🇼 · Originally from Chad 🇹🇩

[![Live](https://img.shields.io/badge/Live-portfolio--nour.vercel.app-00C896?style=flat-square&logo=vercel)](https://portfolio-nour-k56s.vercel.app/en)
[![App Store](https://img.shields.io/badge/App_Store-Mahamat_Abdoulaye_Annour-black?style=flat-square&logo=apple)](https://apps.apple.com/developer/mahamat-abdoulaye-annour/id1867114715)
[![Google Play](https://img.shields.io/badge/Google_Play-Nourdevtd-3DDC84?style=flat-square&logo=google-play)](https://play.google.com/store/apps/developer?id=Nourdevtd)
[![GitHub](https://img.shields.io/badge/GitHub-nourtd1-181717?style=flat-square&logo=github)](https://github.com/nourtd1)

</div>

---

## ✨ Overview

An immersive 3D interactive portfolio built on top of [Henry Heffernan's](https://henryheffernan.com) open-source architecture, fully redesigned with a **2026 Glassmorphism Dark + Neon** aesthetic.

The experience puts you in front of a **high-end gaming setup** where every window on the OS desktop is a section of the portfolio — About, Projects, Skills, Terminal, and Contact — all draggable, resizable, and interactive.

> 🎮 Navigate the 3D scene · 🖱️ Open windows · 💬 Explore projects

---

## 🎨 Design System

| Token | Value |
|---|---|
| **Accent Primary** | `#00C896` — Emerald green |
| **Accent Secondary** | `#A78BFA` — Soft violet |
| **Accent Warm** | `#FF6B35` — Warm orange |
| **Background** | `#050810` — Deep dark blue |
| **Glass Surface** | `rgba(255,255,255,0.05)` + `blur(20px)` |
| **Font Sans** | Space Grotesk |
| **Font Mono** | IBM Plex Mono |

---

## 🛠️ Tech Stack

### 3D Scene (`portfolio-website`)
| Technology | Role |
|---|---|
| [Three.js](https://threejs.org) r137+ | WebGL 3D engine |
| GLSL Shaders | Background effects, glow, scanlines |
| `camera-controls` | Smooth 3D camera movements |
| GSAP 3 | Timeline animations |
| Framer Motion | React component transitions |
| `GLTFLoader` | Gaming setup 3D model (`.gltf` / `.glb`) |
| Webpack 5 | Bundler |
| Express.js | Production server |
| Nodemailer | Contact form email delivery |

### 2D Desktop UI (`portfolio-inner-site`)
| Technology | Role |
|---|---|
| React 17 + TypeScript | UI framework (strict mode, no `any`) |
| CSS Modules | Component-scoped styling |
| Framer Motion | Window open/close animations |
| Custom Design System | `nour-design-system-2026.css` |

### 3D Model
| | |
|---|---|
| **Model** | Gaming Desktop PC |
| **Author** | [Yolala1232](https://sketchfab.com/Yolala1232) on Sketchfab |
| **License** | [CC Attribution 4.0](https://creativecommons.org/licenses/by/4.0/) |
| **Format** | glTF (PBR textures, emissive LEDs) |

---

## 🗂️ Project Structure

```
portfolio/
├── portfolio-website/          # 3D scene (Three.js)
│   ├── src/
│   │   ├── experience/         # Three.js core
│   │   │   ├── Computer.ts     # Gaming setup model loader + materials
│   │   │   ├── MonitorScreen.ts# Interactive screen plane
│   │   │   ├── World.ts        # Scene composition
│   │   │   └── Camera.ts       # Camera controls
│   │   ├── shaders/            # GLSL shaders (background, glow)
│   │   └── components/         # React overlay components
│   ├── static/
│   │   └── models/
│   │       └── gaming_desktop_pc/
│   │           ├── scene.gltf
│   │           ├── scene.bin
│   │           └── textures/
│   ├── server/                 # Express production server
│   └── bundler/                # Webpack configs (dev + prod)
│
└── portfolio-inner-site/       # 2D OS desktop (React)
    ├── src/
    │   ├── components/
    │   │   ├── About/          # Bio + stats window
    │   │   ├── Projects/       # 8 projects window
    │   │   ├── Skills/         # Tech stack window
    │   │   ├── Terminal/       # Interactive terminal
    │   │   └── Contact/        # Contact form window
    │   ├── styles/
    │   │   └── nour-design-system-2026.css
    │   └── data/
    │       └── projects.ts     # Projects data (typed)
    └── public/
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 16`
- npm `>= 8`

### Installation

```bash
# Clone the repo
git clone https://github.com/nourtd1/portfolio-2026.git
cd portfolio-2026

# Install 3D scene dependencies
cd portfolio-website
npm install

# Install desktop UI dependencies
cd ../portfolio-inner-site
npm install
```

### Development

```bash
# Terminal 1 — 3D scene (port 8081)
cd portfolio-website
npm run dev

# Terminal 2 — Desktop UI (port 3000)
cd portfolio-inner-site
npm run dev

# Open http://localhost:8081
```

### Production Build

```bash
# Build 3D scene
cd portfolio-website
npm run build

# Build desktop UI
cd ../portfolio-inner-site
npm run build
```

---

## 📱 Published Apps

| App | Platform | Stack | Status |
|---|---|---|---|
| [Pro Rently](https://apps.apple.com/rw/app/pro-rently/id6760939926) | iOS + Android | React Native · Expo · Supabase | ✅ Live |
| [Chadito](https://apps.apple.com/rw/app/chadito/id6757854742) | iOS + Android | React Native · Expo · Supabase | ✅ Live |
| Cheikh Ahmad Al-Nour | Android | React Native · Firebase | ✅ Live (4.8★) |
| Kaminuza Hub | Android | React Native · Supabase | ✅ Live |

---

## 🏗️ Featured Projects

| Project | Description | Stack |
|---|---|---|
| **Griot** | AI-powered portfolio platform for African developers | Next.js 14 · Supabase · Gemini AI |
| **QuickBill** | Offline-first invoicing for African SMEs | React Native · SQLite · Gemini OCR |
| **ProofHire** | AI talent screening — Umurava AI Hackathon | Next.js · MongoDB · Gemini 1.5 |
| **Steeven Institute** | Bilingual institutional website | Next.js · Tailwind CSS |

---

## ⚙️ Environment Variables

Create a `.env` file in `portfolio-website/` :

```env
# Contact form (Nodemailer)
EMAIL_USER=nourdevtd@gmail.com
EMAIL_PASS=your_app_password

# Port
PORT=8081
```

---

## 🎯 Key Features

- **Immersive 3D scene** — High-end gaming setup with RGB lighting rendered in WebGL
- **Interactive OS desktop** — Draggable, resizable windows with glassmorphism design
- **Neon material overrides** — PBR textures with emissive `#00C896` LED boosts
- **Terminal easter egg** — Type `whoami`, `ls projects/`, `status` for hidden responses
- **Contact form** — Powered by Nodemailer, sends directly to `nourdevtd@gmail.com`
- **Fully typed** — TypeScript strict mode throughout, zero `any`
- **Supabase RLS** — Row-level security on all backend tables

---

## 🌍 About Me

```
Name     : ANNOUR MAHAMAT ABDOULAYE
Alias    : Nour · NourDevTD
Role     : Software Engineer — Mobile & Web
Location : Gisenyi, Rwanda (from N'Djamena, Chad)
XP       : 3+ years · 8 live products · 4 published apps
Education: Final year — Software Engineering, Kigali Independent University
           Harvard CS50 Python certified
Work     : Remote developer @ ChadNova (ID: CN-DEV-006)
```

---

## 📬 Contact

| Channel | Link |
|---|---|
| Email | nourdevtd@gmail.com |
| GitHub | [github.com/nourtd1](https://github.com/nourtd1) |
| LinkedIn | [Annour Mahamat Abdoulaye](https://www.linkedin.com/in/annour-mahamat-abdoulaye-a799ba310) |
| YouTube | [@callme_nour](https://youtube.com/@callme_nour) |
| Phone | +250 798 977 292 |

---

## 📄 License & Credits

This project is **MIT Licensed** — see [LICENSE](./LICENSE) for details.

**Attribution (required by CC-BY-4.0):**
> 3D Model "Gaming Desktop PC" by [Yolala1232](https://sketchfab.com/Yolala1232)  
> Source: [Sketchfab](https://sketchfab.com) · License: [CC Attribution 4.0](https://creativecommons.org/licenses/by/4.0/)

**Inspired by:**
> Original portfolio concept by [Henry Heffernan](https://henryheffernan.com)  
> Source: [github.com/henryjeff/portfolio-website](https://github.com/henryjeff/portfolio-website) · License: MIT

---

<div align="center">

Built with 💚 from Gisenyi, Rwanda  
**NOUR'DEV · 2026**

</div>
