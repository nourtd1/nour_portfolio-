---
name: "Nour'dev Portfolio"
description: "Interactive 3D portfolio for Annour Mahamat Abdoulaye — Software Engineer, Mobile & Web Developer."
colors:
  phosphor-signal: "#00C896"
  phosphor-dim: "rgba(0, 200, 150, 0.15)"
  phosphor-glow: "rgba(0, 200, 150, 0.35)"
  system-blue: "#0078D4"
  system-blue-dim: "rgba(0, 120, 212, 0.10)"
  system-blue-border: "rgba(0, 120, 212, 0.28)"
  accent-purple: "#5E5CE6"
  accent-orange: "#C19C00"
  shell-black: "#050810"
  desktop-bg: "#F3F3F3"
  surface-light: "rgba(255, 255, 255, 0.94)"
  ink-primary: "rgba(32, 32, 32, 0.94)"
  ink-secondary: "rgba(32, 32, 32, 0.68)"
  ink-tertiary: "rgba(32, 32, 32, 0.46)"
  error-red: "#E81123"
typography:
  display:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "54px"
    fontWeight: 650
    lineHeight: 0.96
    letterSpacing: "0"
  headline:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0"
  body:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0"
  label:
    fontFamily: "'IBM Plex Mono', 'Courier New', monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.07em"
  mono:
    fontFamily: "'IBM Plex Mono', 'Courier New', monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: "0.03em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "18px"
  xxl: "20px"
  pill: "9999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "6": "24px"
  "8": "32px"
  "10": "40px"
components:
  button-primary:
    backgroundColor: "{colors.system-blue}"
    textColor: "#ffffff"
    rounded: "{rounded.xl}"
    padding: "0 16px"
  button-primary-hover:
    backgroundColor: "#006CBF"
    textColor: "#ffffff"
    rounded: "{rounded.xl}"
    padding: "0 16px"
  button-ghost:
    backgroundColor: "rgba(255,255,255,0.82)"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.xl}"
    padding: "0 16px"
  btn-accent:
    backgroundColor: "{colors.phosphor-dim}"
    textColor: "{colors.phosphor-signal}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  btn-accent-hover:
    backgroundColor: "rgba(0,200,150,0.22)"
    textColor: "{colors.phosphor-signal}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  window-card:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.xl}"
    padding: "0"
  desktop-shortcut:
    backgroundColor: "rgba(255,255,255,0.92)"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.lg}"
    padding: "14px"
  tag-default:
    backgroundColor: "rgba(255,255,255,0.05)"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.pill}"
    padding: "3px 9px"
  badge-live:
    backgroundColor: "{colors.phosphor-dim}"
    textColor: "{colors.phosphor-signal}"
    rounded: "{rounded.pill}"
    padding: "3px 9px"
---

# Design System: Nour'dev Portfolio

## 1. Overview

**Creative North Star: "The Terminal Room"**

A dark airlock opening into a precision workstation. The 3D BIOS shell is the door — atmospheric, cinematic, phosphor-lit. The light OS interior is the work — operational, scannable, credible. Both surfaces are deliberate. Neither decorates by default.

The outer shell speaks in terminal emerald on near-void black. The inner windows speak in system white, Inter, and System Blue. The transition between them is the design statement: entering the monitor is crossing a threshold from spectacle to signal. The shell earns the content's credibility; the content earns the shell's ambition.

This system rejects every form of AI-portfolio comfort: no cream or warm-beige backgrounds, no gradient text, no glassmorphism used decoratively, no SaaS hero-metric layout, no numbered section eyebrows, no tracked all-caps kickers above every heading. The retro OS vocabulary (BIOS readout, monospace prompts, window chrome) is specific and earned — it references real computing history, not aesthetic mood-boarding.

**Key Characteristics:**
- Two distinct visual registers: shell (dark, phosphor) and interior (light, operational) — each consistent within itself
- Phosphor Signal green (#00C896) is the brand color; System Blue (#0078D4) is the OS interaction color — never swapped or mixed decoratively
- Monospace (IBM Plex Mono) is reserved for system readouts, terminal lines, status labels, timestamps, and tech-stack values — never for headings or body prose
- Glass surfaces in the comfort theme are functional (window chrome, taskbar blur) not decorative
- Motion is present and purposeful: the BIOS typewriter, window open/close, stagger on lists — but there is no scroll-jacked choreography

## 2. Colors: The Phosphor Palette

Two distinct palettes sharing one brand anchor — Phosphor Signal green — across both registers.

### Primary
- **Phosphor Signal** (`#00C896`): The original brand accent. Used on the BIOS loading screen, terminal cursor, avatar ring, and accent buttons in the dark shell. The glow of a 1980s terminal; the color of proof. In the dark shell, it carries the full weight of brand identity. In the light interior, it appears only in the `btn--primary` variant and terminal prompt — reserved, not scattered.
- **Phosphor Dim** (`rgba(0, 200, 150, 0.15)`): Background fill for green-accented badges, buttons, and hover states. Never used as a standalone surface.
- **Phosphor Glow** (`rgba(0, 200, 150, 0.35)`): Box-shadow glow for the terminal cursor and active accent elements in the dark shell.

### Secondary
- **System Blue** (`#0078D4`): The OS interaction color of the comfort theme. Focus rings, selected tabs, active window borders, primary CTA buttons in the Portfolio Hub. Inherited from decades of desktop OS conventions — intentionally familiar inside window chrome. In the dark shell this becomes `rgba(0,120,212,0.10)` as a dim only.
- **Accent Purple** (`#5E5CE6`): Applied to the Command Center (Terminal) app shortcut and terminal path indicators. Secondary accent for secondary apps.
- **Accent Orange** (`#C19C00`): Applied to the Build Credits app shortcut. Tertiary accent. Warm, intentional, rare.

### Neutral
- **Shell Black** (`#050810`): Root background for the BIOS loading screen and any dark-mode surface. Near-void, with faint blue-tint to avoid pure thermal black.
- **Desktop Background** (`#F3F3F3`): Root background for the comfort OS desktop. Neutral mid-grey — not warm-cream, not pure white.
- **Surface Light** (`rgba(255, 255, 255, 0.94)`): Window body backgrounds, taskbar, launchpad. White with a trace of transparency to allow backdrop-filter to show through.
- **Ink Primary** (`rgba(32, 32, 32, 0.94)`): Body text, headings, and labels on light surfaces. Deep charcoal, not pure black.
- **Ink Secondary** (`rgba(32, 32, 32, 0.68)`): Secondary text, descriptions, captions on light surfaces.
- **Ink Tertiary** (`rgba(32, 32, 32, 0.46)`): Placeholder text, timestamps, metadata. Never used for body copy.

### Named Rules
**The Two-Register Rule.** Phosphor Signal (#00C896) belongs to the dark BIOS shell. System Blue (#0078D4) belongs to the light OS desktop. Mixing them — using green in the window chrome or blue in the BIOS readout — breaks the threshold. Each register has one primary accent; keep them sovereign.

**The Rarity Rule.** Phosphor Signal appears on ≤15% of any light-theme screen. Its rarity in the interior is the point: when it does appear (terminal cursor, a badge), it reads as a deliberate reference back to the shell.

## 3. Typography

**Display / Body Font:** Inter (system-ui, sans-serif)
**Label / Mono Font:** IBM Plex Mono (Courier New, monospace)

**Character:** A deliberate two-role pairing. Inter handles all prose, headings, and UI text — its geometric precision reads as engineered, not decorative. IBM Plex Mono is the system voice: status readouts, file paths, timestamps, tech-stack annotations, and terminal lines. The contrast between them signals the difference between content (human-readable prose) and system (machine-readable data). No third family; adding one would dissolve the binary.

**Note on reflex-rejection:** IBM Plex Mono appears on the reflex-reject list for new projects. Here it is identity-preservation: the project already ships with it as the system/mono voice, and the BIOS screen is the literal referent for the aesthetic. It stays because the brief demands it, not by reflex.

### Hierarchy
- **Display** (weight 650, 54px, line-height 0.96): The `desktop-home__title` — the user's name in large, tight, black type on the OS desktop. One use per screen maximum. `text-wrap: balance`.
- **Headline** (weight 600, 32px, line-height 1.2): Section headings inside Portfolio Hub windows. Never used for decorative or eyebrow purposes.
- **Title** (weight 500, 20px, line-height 1.35): Window titles, section sub-headers, app names. The 500 weight creates a clear step down from Headline without dropping to body.
- **Body** (weight 400, 14–16px, line-height 1.65): All prose content in the Portfolio Hub. Max line length: 65ch in sidebar-adjacent layouts; 75ch when full-width.
- **Label/Mono** (IBM Plex Mono, 10–12px, letter-spacing 0.06–0.11em): Status text, timestamps, `hub-home__eyebrow`, window titles, tech-stack readouts, terminal output. Uppercase only for short system-status labels (≤4 words). Never for body sentences.

### Named Rules
**The Mono Discipline Rule.** Monospace is reserved for system data: terminal lines, stack labels, timestamps, status readouts. The moment it appears in running prose or section headings, it stops reading as "system voice" and starts reading as "developer aesthetic costume."

**The Scale Ratio Rule.** Steps between display (54px) → headline (32px) → title (20px) → body (14px) maintain ≥1.40 ratio. Never compress steps to less than 1.25× — flat scales read as uncommitted.

## 4. Elevation

This system uses a hybrid strategy: **tonal layering as default, structural shadow as state**. Surfaces are differentiated by background opacity and backdrop-filter rather than by drop-shadow depth. Shadows appear in response to context (focused window, hover state, elevated card) rather than as ambient decoration on every surface.

The comfort theme uses light, diffuse shadows. The dark shell uses glow (box-shadow with color) rather than shadow (box-shadow with black alpha). The two elevation languages are register-specific and never mixed.

### Shadow Vocabulary

**Comfort theme:**
- **Window ambient** (`0 22px 62px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.72)`): Default window resting state. Diffuse, long. The inset highlight creates a subtle top-edge bevel.
- **Window focused** (`0 26px 76px rgba(0,0,0,0.17), 0 0 0 3px rgba(0,120,212,0.08), inset 0 1px 0 rgba(255,255,255,0.82)`): Active focused window. The 3px ring reads as a focus indicator without being a border.
- **Card ambient** (`0 14px 28px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.72)`): Shortcut cards and content panels on hover.
- **Taskbar** (`0 18px 46px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.75)`): The floating taskbar sits higher than window surfaces; its shadow reflects that.

**Dark shell:**
- **Terminal glow-green** (`0 0 12px rgba(0,200,150,0.45), 0 0 32px rgba(0,200,150,0.15)`): The terminal cursor and active green-accented elements. Glow, not shadow.
- **Terminal glow-purple** (`0 0 12px rgba(167,139,250,0.40), 0 0 28px rgba(167,139,250,0.12)`): Path indicators.

### Named Rules
**The Flat-By-Default Rule.** Surfaces at rest carry only the inset bevel highlight. Drop shadows appear on hover or focused state. A page that shadows everything equally has no focal hierarchy.

**The Register Firewall Rule.** Glow-style box-shadows (colored, radial, bloom-like) belong to the dark shell only. In the comfort theme, all shadows are achromatic (rgba black alpha). A green glow on a white window surface is a register violation.

## 5. Components

### Buttons

Three distinct contexts, each with its own vocabulary:

**BIOS Shell — `.btn--primary` / `.btn--ghost`:**
- **Shape:** Slightly rounded (12px radius). Not pill, not square.
- **Primary (Accent Green):** `background: rgba(0,200,150,0.15)`, text `#00C896`, `border: 0.5px solid rgba(0,200,150,0.25)`. On hover: background lifts to `rgba(0,200,150,0.22)`, green glow box-shadow fires.
- **Ghost:** `background: rgba(255,255,255,0.04)`, border `rgba(255,255,255,0.10)`, text secondary. On hover: both background and border step up.

**Portfolio Hub (Comfort) — `.hub-home__button`:**
- **Shape:** 10px radius. Compact (min-height 40px, padding 0 16px).
- **Primary:** Solid `#0078D4`, white text. Clear call-to-action.
- **Secondary:** White-glass background, charcoal text, 0.5px dark border. On hover: `translateY(-1px)`, border darkens.

**Window Controls:**
- 38×32px, 9px radius, transparent background. Icon-only.
- On hover: `rgba(0,0,0,0.055)` tint.
- Close button exception: hover fills `rgba(232,17,35,0.92)` with white icon — the Windows close convention, intentionally preserved.

### Chips and Badges

**Status badges (`.badge`):** Pill shape (9999px radius), 10px font, weight 500. Three variants: `badge--live` (green), `badge--wip` (purple), `badge--hackathon` (orange). Background is the accent's dim variant; border is the accent's border variant. Never used as navigation or interactive elements.

**Tech-stack tags (`.tag`):** Pill, IBM Plex Mono, 10px. Default: very faint white-glass. Three accent variants (green, purple, orange). On hover: background and border lift; text goes primary.

### Windows / Cards

**App Window (`.window`):** The primary content container. 18px radius, glass background (`rgba(255,255,255,0.94)`), backdrop-filter blur(28px). The focused state adds a System Blue ring (`0 0 0 3px rgba(0,120,212,0.08)`) and tightens the background to near-opaque white. Draggable via the titlebar (`.window__bar`), which shows `cursor: grab` on hover.

**Desktop Shortcut (`.desktop-shortcut`):** 16px radius, white-glass, 0.5px dark border. On hover: `translateY(-2px)` lift + deepened shadow. Selected state: System Blue tint + ring. Used only for app launchers on the OS desktop — not reused as content cards inside windows.

**Inset Card (`.card-inset`):** 8px radius, very faint glass background. Used inside windows for nested data groupings. If a card appears inside another card, remove the inner radius — nested rounding is visually redundant.

### Inputs

- **Style:** Faint glass background (`rgba(255,255,255,0.04)` dark / solid on light), 0.5px border, 8px radius, Inter 14px.
- **Focus:** `border-color` shifts to `accent-primary-border`; `box-shadow: 0 0 0 3px accent-primary-dim`. The ring is the focus indicator, not a border change alone.
- **Placeholder:** `--text-tertiary`. Verify contrast — faint placeholder text is a common WCAG AA failure.
- **Terminal input exception:** The embedded terminal input (`.terminal input.terminal__cmd`) has no background, no border, no radius. It reads as inline terminal text, not a form field.

### Navigation

**Vertical Navbar (Portfolio Hub sidebar):** Fixed-width 300px, 48px internal padding, white background. Brand name at top as display type. Nav links in Inter uppercase-tracked text. Active state indicated by the router highlight. Hidden on the Home route (the hub-home layout replaces it).

**Taskbar:** Fixed bottom, centered, floating (18px from bottom edge). Frosted-glass background, 18px radius, 58px height. Contains: logo glyph, brand name, status text in System Blue, clock in mono, active window tabs. Tabs use 13px radius pill shape, hover tint, active state shows System Blue border + tinted background. The taskbar has a start-menu dropdown (`.taskbar__startmenu`) that floats above it at `bottom: 72px`.

### Signature Component: BIOS Loading Screen

The entry point. Pure black, full-screen. Three sequential states:

1. **BIOS readout:** Monospace text in terminal white, phosphor-green headers (`#00C896` and `#00C896` brand tint), simulated BIOS format (RAM check, resource loading list, blinking cursor). No animation beyond cursor blink and text progression.
2. **Transition:** Loading text fades out (opacity 0), blinking cursor holds, then the start popup fades in.
3. **Start popup:** White-bordered (`7px solid #fff`) black box. Nour OS v1.0 launch message, optional mobile warning in yellow, two buttons: START (enters 3D room) and OPEN PORTFOLIO (direct link). The 7px solid white border is a deliberate heavy retro-computer frame; do not reduce it.

## 6. Do's and Don'ts

### Do:
- **Do** use Phosphor Signal (`#00C896`) as the primary accent on dark surfaces and sparingly (≤15% surface area) on light surfaces.
- **Do** use IBM Plex Mono exclusively for system data: timestamps, terminal output, tech-stack labels, status readouts, and window titles. Keep it out of headings and running prose.
- **Do** verify WCAG AA contrast (4.5:1) on all body text, especially `--text-secondary` (`rgba(32,32,32,0.68)`) against `#F3F3F3` backgrounds. That combination reads as 5.4:1; preserve it.
- **Do** use the window focused state (`border: 0.5px solid rgba(0,120,212,0.24)` + blue ring) to indicate the active window. The ring must be visible without relying on border alone.
- **Do** provide a `prefers-reduced-motion` override for every animation (BIOS typewriter, window scale-in, stagger lists): instant opacity change, no transform.
- **Do** preserve the 7px solid white border on the BIOS popup dialog — it's the retro-computer frame, not a generic border.
- **Do** reserve backdrop-filter blur (28–30px) for the window chrome and taskbar. Content cards inside windows use background tints, not blur.

### Don't:
- **Don't** use gradient text (`background-clip: text` with a gradient fill). Ever. Phosphor Signal is one solid color; it doesn't need a gradient to read as "designed."
- **Don't** use glassmorphism decoratively. Blur surfaces belong to window chrome (taskbar, window body, start menu). Content sections and project cards inside windows use solid or near-solid backgrounds.
- **Don't** display stats (8 products, 4 apps, 3+ years) in a hero-metric grid layout: big number, small label, gradient accent. This is the SaaS landing-page anti-reference from PRODUCT.md. The `hub-home__stats` panel exists as a sidebar within a two-column layout — keep it in that context.
- **Don't** add tracked all-caps eyebrows above every section. The `hub-home__eyebrow` ("PORTFOLIO HUB") is the one deliberate kicker; it marks the entry surface. Do not replicate this pattern on About, Experience, Projects, or any other route.
- **Don't** use numbered section markers (01 / 02 / 03) as scaffold. The routes are navigation, not a sequence.
- **Don't** add Inter or IBM Plex Mono in weights or styles not defined in the scale. No italic Inter, no bold Plex Mono headlines.
- **Don't** mix the two elevation languages: no colored glows on light-theme surfaces, no achromatic shadows on the dark shell.
- **Don't** use a warm-tinted or cream background (`#FAF9F7`, `oklch(97% 0.02 90)`, etc.). The desktop bg is `#F3F3F3` — neutral grey, chroma 0. Warmth is carried by accent colors, not background tint.
- **Don't** display the portfolio as a dark editorial / dev blog: pure black + mono-only + minimal-everything reads as a README, not a portfolio. The comfort desktop is light and operational by design.
