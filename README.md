# Abhinav Kadam — Data Analyst Portfolio

> Premium one-page portfolio website for an Aspiring Data Analyst

**Live Site:** https://abhianalyst.github.io/

---

## Overview

A premium, modern, and recruiter-friendly portfolio website built with pure HTML, CSS, and JavaScript — no frameworks, no dependencies, no build tools. Fully static and GitHub Pages compatible.

---

## Features

- **Premium Design** — Minimalist, spacious, and elegant with a data-visualization-inspired visual language
- **Animated Analytics Panel** — Custom-built interactive data dashboard in the hero section
- **Typing Effect** — Animated role titles in the hero
- **Scroll Animations** — Intersection Observer powered reveal effects
- **Active Nav Highlighting** — Automatically highlights the current section in the navbar
- **Scroll Progress Bar** — Orange top progress indicator
- **Counter Animations** — Animated number counters for key stats
- **Sparkline Charts** — SVG-drawn trend lines with draw animations
- **Bar Chart Animation** — Animated bar chart with staggered reveal
- **Mobile Hamburger Menu** — Full-screen mobile navigation with smooth transitions
- **Back to Top** — Smooth scroll back to top button
- **SEO Optimized** — Meta tags, Open Graph, Twitter Cards, JSON-LD structured data
- **Accessibility** — Semantic HTML, ARIA labels, keyboard navigation, focus states
- **Responsive** — Pixel-perfect from 320px to 1440px+

---

## Tech Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| Markup      | HTML5 (Semantic)              |
| Styling     | CSS3 (Custom Properties, Grid, Flexbox) |
| Scripting   | Vanilla JavaScript (ES6+)     |
| Fonts       | Google Fonts (Space Grotesk + Inter) |
| Icons       | Inline SVGs                   |
| Animations  | CSS Animations + JS (IntersectionObserver) |

---

## File Structure

```
/
├── index.html          # Main portfolio page
├── css/
│   └── style.css       # Complete stylesheet
├── js/
│   └── script.js       # All JavaScript functionality
├── assets/
│   ├── images/         # Project images (optional)
│   ├── icons/          # Custom icons (optional)
│   └── favicon/        # Favicon files (optional)
└── README.md           # This file
```

---

## Deploy to GitHub Pages

### Method 1 — Direct Upload

1. Create a new GitHub repository named `abhianalyst.github.io`
2. Upload all files to the `main` branch
3. Go to **Settings → Pages → Source → main branch / root**
4. Click **Save** — your site will be live in ~60 seconds

### Method 2 — Git CLI

```bash
# Clone your repo
git clone https://github.com/abhianalyst/abhianalyst.github.io.git

# Copy portfolio files into the repo folder
cp -r portfolio/* abhianalyst.github.io/

# Push to GitHub
cd abhianalyst.github.io
git add .
git commit -m "Initial portfolio deploy"
git push origin main
```

### Method 3 — GitHub Actions (Auto Deploy)

Create `.github/workflows/deploy.yml` with:

```yaml
name: Deploy Portfolio
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

---

## Customization

### Update Personal Info

All personal information is in `index.html`. Search for and replace:
- `Abhinav Kadam` → Your name
- `abhinavkadam852@gmail.com` → Your email
- `+91 9422119980` → Your phone
- `abhianalyst` → Your GitHub username
- `abhinavkadam47` → Your LinkedIn username

### Update Resume Link

Find the "View Resume" links and replace the `href` with your Google Drive or direct PDF link:
```html
href="YOUR_RESUME_URL_HERE"
```

### Add/Edit Projects

Each project is an `<article class="project-card">` element in the `#projects` section. Copy an existing card and update the content.

### Color Scheme

All colors are CSS custom properties in `css/style.css`:
```css
:root {
  --orange: #FF6B00;        /* Primary accent */
  --orange-2: #FF8C42;      /* Secondary accent */
  --orange-hover: #FF9F5A;  /* Hover state */
  --dark: #111111;          /* Dark text */
  --body: #555555;          /* Body text */
}
```

---

## Performance Tips

- Fonts are preconnected for faster loading
- Animations use `transform` and `opacity` only (GPU-accelerated)
- IntersectionObserver used instead of scroll listeners for animations
- No external dependencies except Google Fonts

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Full |
| Firefox | ✅ Full |
| Safari  | ✅ Full |
| Edge    | ✅ Full |
| IE 11   | ❌ Not supported |

---

## License

MIT License — Free to use and modify.

---

*Built with ❤️ and data — Abhinav Kadam*
