 # ⏰ Glassmorphic Analog Clock Web App

A beautiful **glass-style analog clock** with real-time animation, **alarm**, and a **stopwatch** — all built with pure HTML, CSS, and JavaScript.  
Minimal, clean, and interactive — no frameworks, no clutter. Just good old creative front-end code.

## 🔮 Features

- ✅ **Live Analog Clock** — ticks every second like a charm.
- ⏰ **Alarm System** — set an alarm time (with AM/PM), and it plays a custom audio alert.
- ⏱️ **Stopwatch Mode** — start, stop, and track time with accurate hand animations.
- 🧊 **Glassmorphic Design** — fully responsive with frosted glass UI.
- 🎨 **Custom Clock Hands** — minute, hour, and second hands rotate with smooth transitions.
- 🌈 **Spline Background** — 3D animated background from Spline for that premium feel.

## 🧠 Tech Stack

- **HTML5** — semantic markup
- **CSS3** — modern flexbox layout, glassmorphism, and responsive design
- **JavaScript (Vanilla)** — core logic for clock, alarm, and stopwatch
- **Spline (iframe)** — animated 3D background for visuals

## 🚀 How It Works

### 🎯 Live Clock
- The analog hands rotate based on system time using `setInterval`.
- Responsive sizing and hand length adjusts with screen size.

### ⏰ Alarm Mode
- Click **“Set Alarm”** and input:
  - Hour (1–12)
  - Minutes (0–59)
  - AM/PM
- Clock freezes at 12:00:00 to symbolize it’s in “alarm mode”.
- When time matches, the alarm **plays a funny MP3 sound** and flashes a message.
- “Cancel Alarm” button stops the alarm and resets the clock.

### ⏱ Stopwatch Mode
- Starts from 00:00:00
- Every second updates:
  - Stopwatch display
  - Clock hands based on elapsed time
- Can be **stopped/reset** any time

## 📦 File Structure

```plaintext
📁 your-project-folder
├── index.html
├── style.css
├── script.js
└── funny-alarm-317531.mp3
