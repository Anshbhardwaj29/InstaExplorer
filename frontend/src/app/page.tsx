"use client";

import { useState } from "react";
import { Search, Activity, Users, Clock, Award, TrendingUp, RefreshCw } from "lucide-react";
import styles from "./page.module.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Home() {
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim()) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      // Fetch from our Python backend
      const res = await fetch(`http://localhost:8000/api/analyze/${handle}`);
      const json = await res.json();

      if (json.status === "success") {
        setData(json);
      } else {
        setError(json.message || "Failed to fetch analytics for this handle.");
      }
    } catch (err) {
      setError("Cannot connect to AI engine. Ensure Python backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // Convert Python snake_case to readable text
  const formatKey = (key: string) => key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>InstaExplorer XAI</h1>
        <p className={styles.subtitle}>
          Harness the power of Explainable AI to understand your audience, boost retention, and maximize Reel virality.
        </p>
      </header>

      <form className={styles.searchBox} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter public Instagram handle (e.g. nike)"
          className={styles.input}
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
        />
        <button type="submit" className={styles.searchBtn} disabled={loading || !handle}>
          {loading ? <RefreshCw className="animate-spin" size={20} /> : <Search size={20} />}
          Analyze
        </button>
      </form>

      {error && <div style={{ color: "var(--danger)", textAlign: "center" }}>{error}</div>}

      {loading && (
        <div className={styles.loader}>
          <Activity size={50} />
          <p style={{ marginTop: "1rem" }}>AI Model analyzing latest posts & engagement vectors...</p>
        </div>
      )}

      {data && (
        <div className={styles.dashboard}>
          {/* Profile Sidebar Area */}
          <aside className={styles.profileCard}>
            <img src={data.profile.profile_pic} alt="Profile" className={styles.avatar} />
            <h2 className={styles.handle}>@{data.profile.handle}</h2>
            <p className={styles.bio}>{data.profile.biography}</p>
            {data.is_mock && <p style={{color: "var(--warning)", fontSize: "0.8rem", marginBottom: "1rem"}}>*Using simulated insights due to API limits</p>}
            
            <div className={styles.statsGrid}>
              {Object.entries(data.profile.metrics).map(([key, value]) => (
                <div key={key} className={styles.statItem}>
                  <div className={styles.statValue}>{value as React.ReactNode}</div>
                  <div className={styles.statLabel}>{formatKey(key)}</div>
                </div>
              ))}
            </div>
          </aside>

          {/* AI Insights & Charts Area */}
          <section className={styles.insightsArea}>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Award size={30} color="var(--success)" />
                <h3 className={styles.cardTitle}>Account Health Score</h3>
              </div>
              <div className={styles.scoreCircle}>
                {data.xai_insights.overall_health_score}
              </div>
              <div style={{ textAlign: "center", marginTop: "1rem", color: "var(--text-secondary)" }}>
                Based on Engagement to Follower Ratio
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Clock size={30} color="var(--accent-primary)" />
                <h3 className={styles.cardTitle}>AI Retention Strategy</h3>
              </div>
              <p className={styles.insightText}>
                {data.xai_insights.xai_retention_advice}
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <TrendingUp size={30} color="var(--danger)" />
                <h3 className={styles.cardTitle}>Virality Analysis (SHAP)</h3>
              </div>
              <p className={styles.insightText}>
                {data.xai_insights.xai_virality_advice}
              </p>
              
              <div style={{ marginTop: "2rem", height: "300px" }}>
                 <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.profile.recent_posts || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
                      stroke="var(--text-secondary)" 
                    />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: 'none', borderRadius: '8px' }}
                      labelFormatter={(label) => new Date(label).toLocaleString()}
                    />
                    <Line type="monotone" dataKey="likes" stroke="var(--accent-primary)" strokeWidth={3} dot={{r: 6}} activeDot={{r: 8}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Users size={30} color="var(--warning)" />
                <h3 className={styles.cardTitle}>Optimal Audience Engagement</h3>
              </div>
              <p style={{ color: "var(--text-secondary)" }}>
                Our predictive models recommend posting on <strong>{data.xai_insights.best_day_recommendation}</strong> between <strong>{data.xai_insights.best_time_recommendation}</strong> to maximize initial 1-hour traction.
              </p>
            </div>
            
          </section>
        </div>
      )}
    </main>
  );
}
