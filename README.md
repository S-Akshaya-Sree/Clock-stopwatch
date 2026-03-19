Digital Clock & Stopwatch
A lightweight, single-file web application that combines a real-time Digital Clock and a precision Stopwatch into one unified interface — featuring a fully dynamic, time-aware background that automatically adapts its visual theme based on the current hour of the day.
---

Preview
CLOCK
<img width="1893" height="1016" alt="image" src="https://github.com/user-attachments/assets/580ad9a7-73fc-461b-8040-bab7d7882d85" />
STOPWATCH
<img width="1917" height="1010" alt="image" src="https://github.com/user-attachments/assets/a63f8f62-4231-4f3a-9720-9d977426c7cb" />


> Background and celestial elements change automatically based on your local system time — no configuration required.
Time of Day	Theme
5 AM – 7 AM	Dawn — deep purple to warm orange gradient, rising sun at bottom
7 AM – 12 PM	Morning — sky blue to cream, sun positioned low-left
12 PM – 3 PM	Noon — vivid blue sky, sun at zenith (top-center)
3 PM – 6 PM	Afternoon — golden orange gradient, sun descending right
6 PM – 9 PM	Evening — dark horizon with burnt orange hues, setting sun
9 PM – 5 AM	Night — deep navy/purple sky, moon top-right, animated stars
---

Features
Digital Clock
Displays current local time in 12-hour format (`HH:MM:SS AM/PM`)
Live date display — shows full day name, month, date, and year
AM/PM indicator rendered as a separate DOM element beneath the time display
Updates every 1000ms via `setInterval()`, driven by the `Date` API
Stopwatch
Displays elapsed time in `HH:MM:SS:ms` format (hours, minutes, seconds, centiseconds)
Updates every 10ms for high-resolution centisecond accuracy
Three controls: START, STOP, RESET
Accurately tracks elapsed time using `Date.now()` delta calculations — immune to interval drift
Dynamic Background System
Six distinct CSS gradient themes applied via `document.body.className` swap
A celestial body (`#celestial` div) — rendered as a `border-radius: 50%` circle with `radial-gradient` and `box-shadow` glow — repositions itself across the viewport to simulate the sun's arc (or moon at night)
Star field rendered on an HTML5 `<canvas>` element — 130 randomised dots with varying radii and opacity, constrained to the upper 75% of the viewport; fades in only during evening/night via CSS `opacity` transition
All theme transitions are smoothly animated using `transition: background 2s ease` and `transition: all 2s ease` on the celestial element
Tab-Based Navigation
Two-panel layout controlled by a custom tab switcher
Panel visibility toggled via `classList.add/remove('active')` — no routing library or framework required
Active tab highlighted with a semi-transparent white border using CSS `.tab-btn.active`
---
Project Structure
```
project/
│
├── index.html       # Main HTML — structure, tab switcher, panel markup
├── style.css        # All styling — themes, layout, buttons, celestial, stars
└── index.js         # All logic — clock, stopwatch, tab switching, background engine
```
> The project is intentionally kept dependency-free. No npm packages, no build tools, no frameworks.
---
Tech Stack
Technology	Usage
HTML5	Semantic structure, Canvas API for stars
CSS3	Linear gradients, `backdrop-filter`, `transition`, `radial-gradient`, `box-shadow`
Vanilla JavaScript (ES6+)	`Date` API, `setInterval`, `classList`, Canvas 2D context
---
 How It Works
Clock Logic (`updateClock`)
```js
function updateClock() {
    const now = new Date();
    const h24 = now.getHours();           // 0–23 for time-of-day detection
    let h = h24 % 12 || 12;              // convert to 12-hour format
    const meridiem = h24 >= 12 ? 'PM' : 'AM';
    // ... update DOM + call applyTimeOfDay(h24)
}
setInterval(updateClock, 1000);
```
`Date.getHours()` returns a 24-hour integer. The modulo operation `% 12 || 12` converts it to 12-hour format (the `|| 12` handles the midnight/noon edge case where `% 12` would return `0`).
---
Stopwatch Logic
```js
function swStart() {
    swStart_ = Date.now() - swElapsed;   // anchor start point, preserving prior elapsed time
    swTimer = setInterval(swUpdate, 10);
}
function swUpdate() {
    swElapsed = Date.now() - swStart_;   // delta from anchor = total elapsed
    // decompose into hrs / min / sec / centiseconds
}
```
Instead of incrementing a counter, the stopwatch computes elapsed time as a delta between two `Date.now()` timestamps. This approach is drift-resistant — even if the browser throttles the interval (e.g. inactive tab), the displayed time remains accurate on resume.
---
Dynamic Background Engine
```js
const timeSlots = [
    { range: [5,  7],  cls: 'dawn',    greeting: 'Good dawn! ' },
    { range: [7,  12], cls: 'morning', greeting: 'Good morning! ' },
    // ...
];

function applyTimeOfDay(h) {
    const slot = timeSlots.find(s => h >= s.range[0] && h < s.range[1]);
    if (!slot || slot.cls === currentCls) return;  // bail early if no change
    currentCls = slot.cls;
    document.body.className = slot.cls;            // triggers CSS theme swap
    document.getElementById('greeting').textContent = slot.greeting;
}
```
`Array.find()` performs a linear scan through `timeSlots` to match the current hour to a range. The `currentCls` guard prevents unnecessary DOM writes every second when the theme hasn't changed.
---
Star Field Rendering
```js
function drawStars() {
    const canvas = document.getElementById('stars');
    canvas.width = window.innerWidth;    // resize canvas to viewport
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    for (let i = 0; i < 130; i++) {
        // randomise position, radius (0.3–1.8px), and opacity (0.4–1.0)
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    }
}
window.addEventListener('resize', drawStars);  // re-render on viewport resize
```
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
