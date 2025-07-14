# 🏃‍♂️ Jogging Tracker

A React‑based jogging tracker web app that lets you record, visualize, and auto‑save your jogging sessions in real time. It uses modern Web APIs for live location tracking, route drawing, connection monitoring, and background autosave.

---

## 🌟 Features

- **Live Route Tracking**  
  Uses the **Geolocation API** to stream your latitude & longitude as you jog.  
- **Route Visualization**  
  Draws your path on a canvas in real time with the **Canvas API**.  
- **Connection Quality Indicator**  
  Shows network status (online/offline/bandwidth type) via the **Network Information API**.  
- **Auto‑Save Sessions**  
  Persists your session data every 30 s using the **Background Tasks API** (with `setInterval` fallback).  
- **Session Statistics**  
  Calculates total distance, time, and average speed (Haversine formula).  
- **Load Last Session** (optional)  
  On page load, reads your last session from `localStorage` so you can pick up where you left off.

---

## 📦 Tech Stack

- **React** (Create React App)  
- **Tailwind CSS** for rapid utility‑first styling  
- **Netlify** (or Vercel) for deployment  

---

## 🛠 Web APIs Used

| API                    | Purpose                                 |
| ---------------------- | --------------------------------------- |
| Geolocation API        | Track live position                     |
| Canvas API             | Draw jogging route                      |
| Network Information API| Monitor connection quality              |
| Background Tasks API   | Auto‑save session data in the background|

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/mayankrsagar/jogging-tracker
cd jogging‑tracker
