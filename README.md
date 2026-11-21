# Meditation Center — Premium Multi-Page Demo Website

A peaceful, modern, and fully responsive multi-page website built with semantic HTML5, modern CSS3, and Vanilla JavaScript. Designed as a digital sanctuary that inspires calmness, simplicity, and trust.

---

## Brand Identity & Personality
* **Business Identity:** MEDITATION CENTER (Generic business identity without fabricated corporate names, spiritual lineages, or religious affiliations)
* **Tagline:** *"Find Stillness. Discover Clarity. Reconnect With Yourself."*
* **Logo:** Minimalist Zen Lotus symbol crafted in pure SVG (`assets/icons/logo-symbol.svg` and embedded inline)
* **Color Palette:**
  * Primary Background: Warm Ivory (`#F8F6F0`)
  * Secondary Background: Soft Beige (`#EDE6D9`)
  * Primary Accent: Sage Green (`#879681`)
  * Dark Accent: Forest Green (`#34483B`)
  * Secondary Accent: Muted Gold (`#C5A56A`)
  * Main Text: Deep Charcoal (`#30332F`)
  * Secondary Text: Muted Mineral (`#777A72`)
* **Typography:**
  * Headings: Cormorant Garamond (Serif)
  * Body: Inter (Sans-serif)

---

## Complete Page Directory (18 Individual HTML Pages)

| Page | File | Purpose |
|---|---|---|
| **Home** | [`index.html`](index.html) | Hero banner, introduction, 6 program cards, philosophy, featured formats, why meditate, facilitators, workshops, beginner welcome, final CTA |
| **About the Center** | [`about.html`](about.html) | Secular sanctuary story, philosophy of stillness, methodology, values, visitor expectations, and accessibility |
| **Meditation Programs** | [`meditation-programs.html`](meditation-programs.html) | In-depth breakdown of 8 meditation programs (structure, duration, beginner suitability, needs) |
| **Meditation Techniques** | [`meditation-techniques.html`](meditation-techniques.html) | 9 secular techniques explained simply: Mindfulness, Vipassana-inspired, Focused Attention, Loving-Kindness, Mantra, Walking, Body Scan, Breath Awareness, Silent |
| **Mindfulness Practice** | [`mindfulness.html`](mindfulness.html) | Everyday awareness, mindful breathing, walking, eating, chores, visual 5-step daily routine, and beginner tips |
| **Guided Meditation** | [`guided-meditation.html`](guided-meditation.html) | Spoken session benefits, session types, and an interactive frontend demo audio player component |
| **Breathwork** | [`breathwork.html`](breathwork.html) | Gentle breathing and relaxation sessions, diaphragmatic pacing, and essential safety guidelines |
| **Session Timetable** | [`schedule.html`](schedule.html) | Interactive timetable with functional Vanilla JS filters (Day of Week, Meditation Type, Experience Level, Time of Day) |
| **Instructors** | [`instructors.html`](instructors.html) | Facilitator directory for Instructor 01, 02, and 03 with teaching focuses and placeholder bios |
| **Retreats** | [`retreats.html`](retreats.html) | Immersive weekend and silent retreat concepts, sample retreat itinerary, packing guide, and registration enquiry |
| **Workshops** | [`workshops.html`](workshops.html) | 6 educational workshop intensives with durations, levels, and enquiry links |
| **Beginner's Guide** | [`beginner-guide.html`](beginner-guide.html) | Complete starter guide, posture advice, handling wandering thoughts, 5-step visual guide, and sample 7-day plan |
| **Online Meditation** | [`online-meditation.html`](online-meditation.html) | Live streaming sittings, recorded video library cards, and virtual private session inquiries |
| **Memberships & Pricing** | [`memberships.html`](memberships.html) | Drop-in, 5-pack, 10-pack, monthly pass, and private sessions with "Price to be announced" demo placeholders and FAQ |
| **Gallery** | [`gallery.html`](gallery.html) | Categorized responsive image gallery with category filter buttons and interactive Vanilla JS lightbox modal |
| **Frequently Asked Questions** | [`faq.html`](faq.html) | Accessible accordion answering 11 common questions, including studio etiquette and medical disclaimers |
| **Book a Session** | [`booking.html`](booking.html) | Complete session enquiry form with frontend validation and safe demo feedback modal |
| **Contact Us** | [`contact.html`](contact.html) | Dummy phone, email, Hyderabad demo address, operating hours, and frontend contact form |

---

## Interactive Features (Vanilla JavaScript)
All interactions are implemented in `assets/js/main.js` with zero third-party framework dependencies:
1. **Responsive Navigation:** Hamburger drawer menu with ARIA accessibility tags and outside-click dismissal.
2. **Accessible Dropdown Menus:** Desktop hover and keyboard/touch support for multi-page categories.
3. **Active Nav Detection:** Automatically highlights the current page link.
4. **Scroll Reveal Animations:** Intersection Observer API triggers gentle upward fades as elements enter the viewport.
5. **Timetable Filter Engine:** Real-time multi-criteria filtering across Day, Type, Level, and Time of Day with empty-state feedback and reset controls.
6. **Gallery Lightbox:** Modal window with backdrop blur, image preview, previous/next buttons, close button, and keyboard shortcuts (Escape, Left Arrow, Right Arrow).
7. **Demo Audio Player Simulation:** Interactive play/pause, scrub bar, elapsed/total time updates, and track selector clearly identified as an illustrative simulation.
8. **Form Validations:** Real-time field checks and email format validation for Booking and Contact forms with custom safe confirmation dialogs.
9. **Back to Top Button:** Smoothly scrolls back to the top when page is scrolled down.

---

## Image Placeholder & Workflow Architecture
* **Strict Technology Compliance:** No external images are downloaded, scraped, or hotlinked. No broken image icons appear in any browser.
* **Aspect Ratios Preserved:** Hero (21:9), Programs (4:5), Portraits (3:4), Cards/Retreats/Thumbnails (16:9), Still Life/Features (4:3).
* **`IMAGE-GENERATION-GUIDE.md`:** Contains a complete 77-image inventory table, individual copy-ready Google Flow prompts, exact filename mapping, and step-by-step image replacement instructions.

---

## How to Test and Host the Website

### Local Preview
Open any HTML file directly in any modern web browser, or serve using a lightweight local web server:

```powershell
# Using Python
python -m http.server 8000

# Using Node (npx)
npx serve .

# Using PHP (if available)
php -S localhost:8000
```
Then navigate to `http://localhost:8000` in your browser.

### Hosting on Hostinger Static Hosting
1. Compress all files in the root folder (all `.html` files, `assets/`, `sitemap.xml`, `robots.txt`) into a `.zip` archive.
2. Log in to Hostinger hPanel -> File Manager (or connect via FTP / SFTP).
3. Upload and extract all files directly into the `public_html/` root directory.
4. Verify SSL is enabled under Hostinger Security -> SSL.
5. All relative paths (`assets/css/style.css`, `assets/js/main.js`, etc.) will load instantly with zero server-side runtime requirements.

---

## SEO & Accessibility Guidance
* **Semantic HTML5:** `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
* **Headings:** Single `<h1>` per page with hierarchical `<h2>` and `<h3>` tags.
* **Metadata:** Unique title tags, meta descriptions, and Open Graph tags across all 18 pages.
* **Canonical URLs:** Structured canonical link tags included on all pages.
* **Sitemap:** Clean XML sitemap provided in `sitemap.xml`.
* **Keyboard Accessibility:** Visible `:focus-visible` styling with skip-to-content links.
* **Educational & Medical Notices:** Clearly states that meditation is an educational practice and not a medical or psychiatric therapy substitute.
