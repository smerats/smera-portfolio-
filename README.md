# SMERA T S — Personal Portfolio Website

A modern, visually stunning, highly interactive, and responsive portfolio website designed and built for **SMERA T S** — Final-Year Computer Science Engineering Student & Aspiring Software Engineer.

---

## 🌟 Visual Theme & Design Language

- **Deep Black Theme**: Built with rich charcoal `#050508` base, glassmorphism cards (`backdrop-filter: blur(18px)`), and translucent layered borders.
- **Neon Accents**: Electric violet (`#8b5cf6`), cyber blue (`#38bdf8`), and neon cyan (`#06b6d4`).
- **Interactive Particle Constellation**: Real-time canvas physics network that connects nodes and reacts to mouse proximity.
- **Custom Cursor Follower**: Smooth lagging ambient glow and interactive cursor dot on desktop.
- **3D Interactive Card Tilt**: Dynamic perspective tilt on project and skill cards.
- **Typewriter Effect**: Multi-role animated typing sequence for Smera's core competencies.
- **Full Responsiveness**: Optimized layout across desktops, laptops, tablets, and smartphones.
- **Accessibility & Reduced Motion**: Automatically respects system `prefers-reduced-motion` settings.

---

## 📂 Project Architecture

```
smera-portfolio-/
├── index.html                     # Semantic HTML5 markup, SEO meta tags, OpenGraph & accessibility
├── package.json                   # NPM configuration and dev scripts
├── README.md                      # Documentation and customization guide
└── assets/
    ├── css/
    │   ├── style.css              # Theme variables, glassmorphism, responsive grid, components
    │   └── animations.css         # Keyframes, transitions, preloader, and scroll reveal effects
    ├── js/
    │   ├── main.js                # Nav spy, project modal, mobile drawer, 3D tilt, contact handler
    │   ├── particles.js           # Dynamic particle constellation canvas
    │   └── typing.js              # Typewriter role animation
    └── images/
        ├── favicon.svg            # STS monogram neon hexagon favicon
        ├── og-preview.svg         # Social media sharing preview card
        ├── profile-hero.svg       # Sleek placeholder avatar for Hero section
        ├── profile-about.svg      # Technical placeholder illustration for About section
        └── projects/
            ├── deepfake-audio.svg # Audio waveform & CNN classification diagram
            ├── kerala-tourism.svg # RAG, FAISS & Mistral 7B tourism architecture
            └── pixradar.svg       # Facial matching HUD & event photography radar
```

---

## 🚀 How to Run Locally

You have multiple zero-friction options to preview the site:

### Option 1: Direct Browser Launch (No tools required)
Simply double-click `index.html` or drag it into any web browser (Chrome, Edge, Firefox, Brave, Safari).

### Option 2: Using Node / NPM
```bash
npx serve .
# or
npm start
```

### Option 3: Using Python
```bash
python -m http.server 3000
```
Then navigate to `http://localhost:3000` in your browser.

---

## ✏️ How to Personalize Your Information

The codebase is organized so you can easily replace the placeholders with your personal details:

### 1. Uploading Your Personal Photographs
- **Hero Photo**: Save your portrait photo as `profile-hero.jpg` or `profile-hero.png` inside `assets/images/`. Then in `index.html` (around Line 195), change:
  ```html
  <img src="assets/images/profile-hero.jpg" alt="SMERA T S" class="hero-photo-img">
  ```
- **About Me Photo**: Save your picture as `profile-about.jpg` inside `assets/images/` and update around Line 265 in `index.html`.
*(Note: Until you upload your photos, the included vector placeholder graphics will display smoothly with zero broken image icons).*

### 2. Updating Contact Information
Search for `INSERT` in `index.html` to find the LinkedIn placeholder:
- **LinkedIn Profile**:
  ```html
  <a href="https://www.linkedin.com/in/your-profile-slug" target="_blank" ...>
  ```
- **Email Address**:
  Update `smerats.contact@example.com` in `index.html` and `assets/js/main.js` with your real email.

### 3. Project Repositories
- **Deepfake Audio Detection**: Update the placeholder URL in `index.html` (Line 385) and in `assets/js/main.js` (Line 230) once you publish the repository.
- **Kerala Tourism Assistant**: Already linked directly to your official repository: `https://github.com/smerats/KERALA-TOURISM-ASSISTANT`.
- **PixRadar**: Update the placeholder URL once you publish the repository.

---

## 🌐 Deploying to GitHub Pages (Free Hosting)

Since this repository is already on GitHub:
1. Go to your repository settings: `https://github.com/smerats/smera-portfolio-/settings/pages`.
2. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
3. Select the branch (e.g., `main` or `master`) and folder `/(root)`.
4. Click **Save**. Within 1–2 minutes, your portfolio will be live at:
   `https://smerats.github.io/smera-portfolio-/`

---

## 📄 License
Designed and developed for **SMERA T S**. All rights reserved.
