# Roam — Travel, Considered 🌍

A modern, responsive travel discovery web application built with **React and Vite**. Roam helps users explore destinations, discover famous places, save favorites, and plan trips through a visually rich travel experience.

The project was designed with a focus on **visual design, responsive layouts, smooth interactions, accessibility, and a clean user experience**.

---

## ✨ Overview

**Roam** is a travel exploration application created as a Front-End Developer assignment.

The application allows users to:

* Explore curated travel destinations
* Search and filter destinations
* View destination details and famous places
* Save destinations to favorites
* Use location awareness
* View travel-focused visual content
* Generate and view day-by-day itinerary layouts
* Interact with an AI travel assistant interface
* Experience the application across desktop and mobile screen sizes

The application uses a clean editorial-inspired visual style with large imagery, destination cards, subtle animations, responsive layouts, and intuitive navigation.

---

## 📸 Screenshots

Screenshots are added inside the public -> Screenshot.md


---

## 🚀 Features Completed

### 🗺️ Destination Explorer

* Curated destination collection
* Destination cards with imagery
* Search functionality
* Destination filtering
* Responsive grid layouts
* Detailed destination pages

### ❤️ Favorites

* Save destinations as favorites
* Favorites persist using browser local storage
* Favorite state is reflected throughout the application

### 📍 Location Awareness

* Browser-based location permission flow
* Location-aware travel experience
* Designed permission and fallback states

### 🌤️ Weather Experience

* Weather interface prepared for live weather integration
* Weather information displayed within the destination experience
* Graceful fallback behavior when live weather data is unavailable

### 🤖 AI Travel Assistant

* AI travel assistant interface
* Travel-focused conversation experience
* Prepared for Gemini API integration
* Fallback responses are available when the external AI service is unavailable

### 🗓️ Itinerary Planner

* Day-by-day itinerary presentation
* Structured travel activities
* Readable itinerary layout
* Designed to support AI-generated travel plans

### 🎨 Visual Design

* Editorial travel-inspired interface
* Large destination imagery
* Responsive typography
* Consistent spacing and visual hierarchy
* Interactive cards and buttons
* Subtle motion and hover interactions
* Desktop and mobile responsive layouts

### ♿ Accessibility

* Semantic HTML structure
* Keyboard-friendly interactive elements
* Accessible button labels
* Responsive layouts
* Designed states for loading, empty and unavailable content

---

## 🛠️ Technology Stack

* **React**
* **Vite**
* **JavaScript**
* **CSS**
* **Lucide React**
* **Local Storage**
* **Vercel**

### Planned / Prepared Integrations

The project structure includes server-side endpoints prepared for:

* OpenWeather API
* Pexels API
* Google Gemini API

These integrations can be enabled by adding the appropriate API keys through environment variables.

---

## 💻 How to Run the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/sameenakausar-05/roam-travel-experience.git
```

### 2. Open the project

```bash
cd roam-travel-experience
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local URL shown in your terminal, usually:

```text
http://localhost:5173
```

### 5. Create a production build

```bash
npm run build
```

The production files will be generated inside the `dist` folder.

---

## 🔐 Environment Variables

The project is structured to support server-side API integrations.

If API integrations are enabled, create a `.env.local` file in the project root:

```env
OPENWEATHER_API_KEY=your_openweather_key
PEXELS_API_KEY=your_pexels_key
GEMINI_API_KEY=your_gemini_key
```

**Never commit API keys or `.env.local` to GitHub.**

---

## 📁 Project Structure

```text
roam-travel-experience/
│
├── api/
│   ├── ai.js
│   ├── images.js
│   └── weather.js
│
├── public/
│   ├── screenshots/
│   └── robots.txt
│
├── src/
│   ├── data.js
│   ├── main.jsx
│   └── styles.css
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vercel.json
├── vite.config.js
└── README.md
```

---

## 🌐 Deployment

The application is deployed using **Vercel** and connected to the GitHub repository.

Every new commit pushed to the `main` branch can trigger a new deployment.

---

## 📱 Responsive Design

Roam is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile devices

The layout, navigation, cards, typography and interactive elements adapt to different screen sizes.

---

## 🎯 Project Goal

The goal of Roam is to create a travel experience that feels more like a polished digital product than a traditional travel website.

The design prioritizes:

1. Visual storytelling
2. Ease of exploration
3. Clear information hierarchy
4. Responsive interaction
5. Accessible user experiences
6. Smooth and engaging interactions

---

## 👩‍💻 Author

**Sameena Kausar**

Front-End Developer

---

## 📄 License

This project was created as an original front-end development assignment and portfolio project.
