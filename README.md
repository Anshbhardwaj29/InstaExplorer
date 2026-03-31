<h1 align="center">
  <br>
  InstaExplorer XAI Dashboard
  <br>
</h1>

<h4 align="center">An AI-powered Instagram Analytics & Explainable AI Dashboard.</h4>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a>
</p>

---

## 🎯 About The Project

**InstaExplorer** is a cutting-edge analytics tool designed for public Instagram accounts. By fetching real-time account metrics and feeding them into an Explainable AI (XAI) engine, this dashboard provides creators and marketers with clear, actionable insights on how to improve **Retention**, increase **Virality**, and discover the **Optimal Engagement Times** for their audience. 

*Note: Due to Instagram's aggressive anti-scraping measures, the backend features a robust fallback mechanism that generates simulated, highly realistic AI insights when live scraping is blocked.*

## ✨ Features

- **Explainable AI (XAI) Insights**: Get human-readable advice on *why* certain reels perform better and *how* to adjust your content strategy.
- **Premium Dark Mode UI**: Built with Next.js using custom glassmorphism CSS, neon accents, and modern typography.
- **Interactive Visualizations**: Seamless chart rendering using `recharts` to map historical engagement.
- **Resilient Data Collection**: Python `instaloader` wrapper with an intelligent mockup fallback.
- **Lightning Fast API**: Powered by FastAPI to serve AI inferences instantaneously.

## 🛠️ Tech Stack

**Frontend:**
- [Next.js](https://nextjs.org/) (React Framework)
- Vanilla CSS Modules (Custom Premium Dashboard UI)
- [Recharts](https://recharts.org/) (Data Visualization)
- [Lucide React](https://lucide.dev/) (Icons)

**Backend:**
- [Python 3](https://www.python.org/)
- [FastAPI](https://fastapi.tiangolo.com/) (API Framework)
- `instaloader` (Instagram Data Scraping)
- `scikit-learn` & `shap` (Machine Learning / XAI dependencies)

---

## 💻 Installation

To run this project locally, you will need Node.js and Python installed on your machine.

### 1. Clone the repository

```bash
git clone https://github.com/Anshbhardwaj29/InstaExplorer.git
cd InstaExplorer
```

### 2. Setup the Python Backend

```bash
# Navigate to the backend directory
cd backend

# (Optional but recommended) Create a virtual environment
python -m venv venv
venv\Scripts\activate  # On Windows

# Install the dependencies
pip install -r requirements.txt
```

### 3. Setup the Next.js Frontend

```bash
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install Node modules
npm install
```

---

## 🚀 Usage

You need to run both the Frontend and Backend servers simultaneously to use the dashboard.

**Start the Backend API:**
```bash
cd backend
python main.py
```
*The API will start at `http://localhost:8000`*

**Start the Frontend Dashboard:**
```bash
cd frontend
npm run dev
```
*The web app will start at `http://localhost:3000`*

Once both servers are running, open your browser and navigate to `http://localhost:3000`. Enter any public Instagram handle (e.g., `nike`) to generate your AI insights!

---

## 🔮 Future Roadmap

- [ ] Integrate Official Facebook/Instagram Graph API.
- [ ] Connect Gemini LLM to process SHAP values directly.
- [ ] Add PostgreSQL database integration to save user historical queries.
- [ ] Expand analytics tracking to TikTok and YouTube Shorts.
