# Digital Clock & Stopwatch

A lightweight, single-file web application that combines a real-time **Digital Clock** and a precision **Stopwatch** into one unified interface — featuring a fully dynamic, time-aware background that automatically adapts its visual theme based on the current hour of the day.

---

## Preview

### Clock
<img width="1413" height="1015" alt="image" src="https://github.com/user-attachments/assets/4c790336-27f9-4307-bc01-f75ea2b1c081" />


### Stopwatch
<img width="1408" height="1011" alt="image" src="https://github.com/user-attachments/assets/5f46215e-8ac0-4b1b-88d1-d4bf195690d5" />


> Background and celestial elements change automatically based on your local system time — no configuration required.

---

## Time-Based Themes

| Time of Day | Theme Description |
|------------|-----------------|
| 5 AM – 7 AM | Dawn — deep purple to warm orange gradient, rising sun at bottom |
| 7 AM – 12 PM | Morning — sky blue to cream, sun positioned low-left |
| 12 PM – 3 PM | Noon — vivid blue sky, sun at zenith (top-center) |
| 3 PM – 6 PM | Afternoon — golden orange gradient, sun descending right |
| 6 PM – 9 PM | Evening — dark horizon with burnt orange hues, setting sun |
| 9 PM – 5 AM | Night — deep navy/purple sky, moon top-right, animated stars |

---

## Features

### Digital Clock
- Displays current local time in **12-hour format** (`HH:MM:SS AM/PM`)
- Live date display — full day name, month, date, and year
- AM/PM indicator rendered as a separate DOM element beneath the time
- Updates every `1000ms` using `setInterval()`
- Powered by the JavaScript `Date` API

### Stopwatch
- Displays elapsed time in `HH:MM:SS:ms`
- Updates every `10ms` (centisecond precision)
- Controls: **START**, **STOP**, **RESET**
- Uses `Date.now()` delta calculation (drift-resistant)

### Dynamic Background System
- Six CSS gradient themes applied via `document.body.className`
- Celestial body (`#celestial`) using:
  - `border-radius: 50%`
  - `radial-gradient`
  - `box-shadow` glow
- Simulates sun/moon movement across the viewport
- Star field rendered using `<canvas>`:
  - 130 randomized stars with varying size and opacity
  - Visible only during evening/night via CSS `opacity`
- Smooth transitions:
  - `transition: background 2s ease`
  - `transition: all 2s ease`

### Tab-Based Navigation
- Two-panel layout (Clock / Stopwatch)
- Controlled via `classList.add/remove('active')`
- No frameworks or routing libraries used
- Active tab styled using `.tab-btn.active`

---

## Project Structure

```
project/
│
├── index.html       # Main HTML — structure, tab switcher, panel markup
├── style.css        # All styling — themes, layout, buttons, celestial, stars
└── index.js         # All logic — clock, stopwatch, tab switching, background engine
```
> The project is intentionally kept dependency-free. No npm packages, no build tools, no frameworks.
---
#Tech Stack

Technology	Usage
HTML5	Semantic structure, Canvas API for stars
CSS3	Linear gradients, `backdrop-filter`, `transition`, `radial-gradient`, `box-shadow`
Vanilla JavaScript (ES6+)	`Date` API, `setInterval`, `classList`, Canvas 2D context

---
 How It Works
Clock Logic: uses `updateClock`

Date logic: `Date.getHours()`

Instead of incrementing a counter, the stopwatch computes elapsed time as a delta between two `Date.now()` timestamps. This approach is drift-resistant — even if the browser throttles the interval (e.g. inactive tab), the displayed time remains accurate on resume.

---

Stars are drawn using the Canvas 2D API. Each star is an `arc()` circle with sub-pixel radius for a natural scatter. Visibility is controlled purely by CSS (`opacity: 0` by default, `opacity: 1` on `body.night` and `body.evening`) — the canvas content itself is always present, just hidden.

---

Usage
Clone or download the repository
Open `index.html` directly in any modern browser — no server required
The background and greeting will automatically reflect your current local time
Use the tab buttons to switch between Digital Clock and Stopwatch
```bash
git clone https://github.com/your-username/clock-stopwatch.git
cd clock-stopwatch
open index.html   # macOS
# or just double-click index.html on Windows/Linux
```
---
Browser Compatibility
Browser	Support
Chrome 88+	
Firefox 85+	
Safari 14+	
Edge 88+	
> `backdrop-filter: blur()` requires a Chromium-based or WebKit browser. It degrades gracefully (no blur effect) on unsupported browsers without breaking functionality.
---
This project is open source.
