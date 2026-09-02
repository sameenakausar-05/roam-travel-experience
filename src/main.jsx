import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, CalendarDays, Check, ChevronDown, Compass, Crosshair,
  Globe2, Heart, MapPin, Menu, MessageCircle, Navigation, Search,
  Send, Sparkles, Sun, X, Wind, CloudRain, Cloud, LoaderCircle
} from "lucide-react";
import { destinations, continents } from "./data";
import "./styles.css";

const FALLBACK_WEATHER = {
  main: { temp: 20, feels_like: 20, humidity: 62 },
  weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
  wind: { speed: 3.2 },
  name: "Your location"
};

function App() {
  const [active, setActive] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle");
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("roam-favs") || "[]"));
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return destinations.filter(d =>
      (filter === "All" || d.continent === filter) &&
      (!q || `${d.name} ${d.country} ${d.region}`.toLowerCase().includes(q))
    );
  }, [query, filter]);

  const visible = showAll ? filtered : filtered.slice(0, 6);

  useEffect(() => {
    localStorage.setItem("roam-favs", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) =>
    setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);

  async function useMyLocation() {
    setLocationStatus("loading");
    setWeatherError("");
    if (!navigator.geolocation) {
      setLocationStatus("error");
      setWeatherError("Location isn't supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(async pos => {
      const coords = [pos.coords.latitude, pos.coords.longitude];
      setLocation(coords);
      setLocationStatus("success");
      try {
        const r = await fetch(`/api/weather?lat=${coords[0]}&lon=${coords[1]}`);
        if (!r.ok) throw new Error("Weather service unavailable.");
        setWeather(await r.json());
      } catch {
        setWeatherError("Live weather couldn't be loaded, so we're showing a calm fallback.");
        setWeather(FALLBACK_WEATHER);
      }
    }, () => {
      setLocationStatus("denied");
      setWeatherError("Location access was declined. You can still explore by destination.");
    }, { enableHighAccuracy: true, timeout: 10000 });
  }

  function openDestination(d) {
    setActive(d);
    setChatOpen(false);
    setPlannerOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app">
      <header className="nav">
        <a className="brand" href="#" onClick={() => setActive(null)} aria-label="Roam home">
          <span className="brand-mark"><Compass size={17}/></span>
          <span>roam<span className="brand-dot">.</span></span>
        </a>
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#destinations" onClick={() => setMenuOpen(false)}>Explore</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
          <button className="nav-cta" onClick={() => setPlannerOpen(true)}>Plan a trip <ArrowRight size={15}/></button>
        </nav>
        <button className="icon-btn mobile-menu" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle navigation">
          {menuOpen ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </header>

      {!active ? (
        <>
          <Hero onExplore={() => document.getElementById("destinations")?.scrollIntoView({behavior:"smooth"})} onLocation={useMyLocation} locationStatus={locationStatus}/>
          <main>
            <section className="location-strip">
              <div>
                <span className="eyebrow">Where are you now?</span>
                <strong>{locationStatus === "success" ? "Using your location" : "Make the experience yours"}</strong>
              </div>
              <button className="ghost-btn" onClick={useMyLocation} disabled={locationStatus === "loading"}>
                {locationStatus === "loading" ? <LoaderCircle className="spin" size={17}/> : <Crosshair size={17}/>}
                {locationStatus === "success" ? "Location active" : "Use my location"}
              </button>
            </section>
            {weather && <WeatherCard weather={weather} error={weatherError}/>}
            {weatherError && !weather && <div className="notice">{weatherError}</div>}

            <section id="destinations" className="explore section-pad">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">The world, your way</span>
                  <h2>Find somewhere <em>worth going.</em></h2>
                </div>
                <p>Six places to start. Search, filter, or follow a feeling.</p>
              </div>
              <div className="controls">
                <label className="search">
                  <Search size={18}/>
                  <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search destinations…" aria-label="Search destinations"/>
                  {query && <button onClick={() => setQuery("")} aria-label="Clear search"><X size={16}/></button>}
                </label>
                <div className="filters" role="group" aria-label="Filter by continent">
                  {continents.map(c => <button key={c} className={filter === c ? "active" : ""} onClick={() => setFilter(c)}>{c}</button>)}
                </div>
              </div>

              {visible.length ? (
                <div className="destination-grid">
                  {visible.map(d => (
                    <DestinationCard key={d.id} destination={d} favorite={favorites.includes(d.id)} onFavorite={() => toggleFavorite(d.id)} onOpen={() => openDestination(d)}/>
                  ))}
                </div>
              ) : <EmptyState onReset={() => {setQuery("");setFilter("All")}}/>}
              {filtered.length > 6 && <button className="load-more" onClick={() => setShowAll(v => !v)}>{showAll ? "Show less" : `See all ${filtered.length} destinations`} <ChevronDown className={showAll ? "rotate" : ""} size={17}/></button>}
            </section>

            <section id="how-it-works" className="philosophy">
              <div className="philosophy-copy">
                <span className="eyebrow">Less planning. More anticipation.</span>
                <h2>A trip should feel like a <em>story</em>, not a spreadsheet.</h2>
                <p>Roam brings discovery, live weather and thoughtful AI planning into one quiet interface. Start with a place you love, then let the details fall into place.</p>
                <button className="dark-btn" onClick={() => setPlannerOpen(true)}>Build my itinerary <Sparkles size={16}/></button>
              </div>
              <div className="manifesto">
                {[
                  ["01","Discover","Curated destinations with enough context to make the first click count."],
                  ["02","Understand","Live weather and location awareness, right when you need them."],
                  ["03","Plan","A conversational travel companion that turns a destination into a day-by-day plan."]
                ].map(([n,t,b]) => <div className="manifesto-row" key={n}><span>{n}</span><div><h3>{t}</h3><p>{b}</p></div><ArrowRight size={18}/></div>)}
              </div>
            </section>
          </main>
        </>
      ) : <DestinationPage destination={active} onBack={() => setActive(null)} favorite={favorites.includes(active.id)} onFavorite={() => toggleFavorite(active.id)} onPlan={() => setPlannerOpen(true)} onChat={() => setChatOpen(true)}/>}

      <footer className="footer">
        <div className="brand"><span className="brand-mark"><Compass size={17}/></span><span>roam<span className="brand-dot">.</span></span></div>
        <p>Travel, considered.</p>
        <span>Built for the curious.</span>
      </footer>

      {plannerOpen && <PlannerModal destination={active || destinations[0]} onClose={() => setPlannerOpen(false)}/>}
      {chatOpen && <Chat destination={active || destinations[0]} onClose={() => setChatOpen(false)}/>}
      {!chatOpen && <button className="chat-fab" onClick={() => setChatOpen(true)} aria-label="Open travel assistant"><MessageCircle size={20}/><span>Ask Roam</span></button>}
    </div>
  );
}

function Hero({onExplore, onLocation, locationStatus}) {
  return <section className="hero">
    <video className="hero-video" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80">
      <source src="https://cdn.coverr.co/videos/coverr-aerial-view-of-the-mountains-1572/1080p.mp4" type="video/mp4"/>
    </video>
    <div className="hero-overlay"/>
    <div className="hero-content">
      <span className="hero-kicker"><span/> The thoughtful travel guide</span>
      <h1>Go somewhere<br/><em>that stays with you.</em></h1>
      <p>Explore remarkable places, check the weather where you are, and turn curiosity into a considered itinerary.</p>
      <div className="hero-actions">
        <button className="light-btn" onClick={onExplore}>Start exploring <ArrowRight size={17}/></button>
        <button className="hero-location" onClick={onLocation}><Navigation size={16}/> {locationStatus === "success" ? "Location found" : "Use my location"}</button>
      </div>
    </div>
    <div className="hero-meta"><span>01 / 06</span><span>Scroll to wander ↓</span></div>
  </section>
}

function DestinationCard({destination:d, favorite, onFavorite, onOpen}) {
  return <article className="destination-card" onClick={onOpen} tabIndex="0" onKeyDown={e => e.key==="Enter" && onOpen()}>
    <div className="card-image"><img src={d.image} alt={`${d.name}, ${d.country}`} loading="lazy"/><span className="card-region">{d.continent}</span><button className={`favorite ${favorite ? "saved":""}`} onClick={e => {e.stopPropagation();onFavorite()}} aria-label={favorite ? `Remove ${d.name} from favorites` : `Save ${d.name}`}>{favorite ? <Heart fill="currentColor" size={17}/> : <Heart size={17}/>}</button></div>
    <div className="card-body"><div className="card-title"><div><h3>{d.name}</h3><span>{d.country}</span></div><ArrowRight size={19}/></div><p>{d.tagline}</p><div className="card-facts"><span><CalendarDays size={14}/>{d.duration}</span><span><Sun size={14}/>{d.best}</span></div></div>
  </article>
}

function EmptyState({onReset}) {
  return <div className="empty"><Globe2 size={32}/><h3>No destination found</h3><p>Try another name or open the full world.</p><button className="ghost-btn" onClick={onReset}>Reset filters</button></div>
}

function WeatherCard({weather, error}) {
  const icon = weather.weather?.[0]?.main;
  const WeatherIcon = icon === "Rain" ? CloudRain : icon === "Clouds" ? Cloud : Sun;
  return <section className="weather-wrap"><div className="weather-card">
    <div className="weather-location"><span className="eyebrow">Right now</span><strong><MapPin size={16}/>{weather.name || "Your location"}</strong><small>{weather.weather?.[0]?.description || "Current conditions"}</small></div>
    <div className="weather-temp"><WeatherIcon size={32}/><strong>{Math.round(weather.main?.temp ?? 20)}°</strong><span>feels {Math.round(weather.main?.feels_like ?? 20)}°</span></div>
    <div className="weather-stats"><span><Wind size={15}/>{weather.wind ? Math.round(weather.wind.speed * 3.6) : 12} km/h wind</span><span>Humidity {weather.main?.humidity ?? 62}%</span></div>
  </div>{error && <p className="weather-note">{error}</p>}</section>
}

function DestinationPage({destination:d,onBack,favorite,onFavorite,onPlan,onChat}) {
  return <main className="detail">
    <button className="back-btn" onClick={onBack}>← Back to destinations</button>
    <section className="detail-hero">
      <img src={d.image} alt="" />
      <div className="detail-gradient"/>
      <div className="detail-title"><span className="eyebrow">{d.continent} · {d.country}</span><h1>{d.name}</h1><p>{d.tagline}</p></div>
      <button className={`favorite detail-fav ${favorite ? "saved":""}`} onClick={onFavorite}>{favorite ? <Heart fill="currentColor"/> : <Heart/>}<span>{favorite ? "Saved" : "Save place"}</span></button>
    </section>
    <section className="detail-intro">
      <div><span className="eyebrow">A closer look</span><p>{d.description}</p></div>
      <div className="quick-facts"><span><small>Ideal stay</small><strong>{d.duration}</strong></span><span><small>Best window</small><strong>{d.best}</strong></span><span><small>Weather</small><strong>{d.temperature} avg.</strong></span></div>
    </section>
    <section className="places section-pad">
      <div className="section-heading"><div><span className="eyebrow">Worth the detour</span><h2>Three places to <em>begin.</em></h2></div><p>Not a checklist. Just the landmarks, neighbourhoods and small worlds that make the destination itself.</p></div>
      <div className="places-grid">{d.places.map((p,i)=><article className="place-card" key={p.name}><div className="place-number">0{i+1}</div><img src={p.image} alt={p.name} loading="lazy"/><div className="place-copy"><span>{p.type}</span><h3>{p.name}</h3><p>{p.note}</p></div></article>)}</div>
    </section>
    <section className="plan-banner"><div><span className="eyebrow">Your next move</span><h2>Ready to make it <em>real?</em></h2><p>Ask Roam what to see, when to go, or generate a day-by-day itinerary.</p></div><div className="banner-actions"><button className="light-btn" onClick={onPlan}>Plan this trip <Sparkles size={16}/></button><button className="outline-light" onClick={onChat}><MessageCircle size={16}/> Ask a question</button></div></section>
  </main>
}

function PlannerModal({destination:d,onClose}) {
  const [days,setDays]=useState(5), [style,setStyle]=useState("Balanced"), [loading,setLoading]=useState(false), [plan,setPlan]=useState(null), [error,setError]=useState("");
  async function generate() {
    setLoading(true);setError("");
    const prompt = `Create a ${days}-day itinerary for ${d.name}, ${d.country}. Travel style: ${style}. Return ONLY valid JSON: {"days":[{"day":1,"title":"...","morning":"...","afternoon":"...","evening":"..."}]}. Make it realistic, varied, and geographically sensible.`;
    try {
      const r=await fetch("/api/ai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({destination:d.name,messages:[{role:"user",content:prompt}]})});
      const data=await r.json(); if(!r.ok) throw new Error(data.error);
      const cleaned=data.text.replace(/```json|```/g,"").trim();
      setPlan(JSON.parse(cleaned));
    } catch {
      setPlan({days:Array.from({length:days},(_,i)=>({day:i+1,title:["Arrive & orient","Culture & character","Local rhythm","A day beyond","Slow finale"][i]||`Day ${i+1}`,morning:i===0?`Settle into ${d.name} and take a gentle neighbourhood walk.`:`Start with a relaxed breakfast, then explore a local highlight.`,afternoon:`Visit ${d.places[i%d.places.length].name} and leave time to wander nearby.`,evening:`Choose a neighbourhood restaurant and end with an unhurried evening.`}))});
      setError("AI is not configured yet, so this is a polished demo itinerary. Add GEMINI_API_KEY to enable live generation.");
    } finally {setLoading(false)}
  }
  return <div className="modal-backdrop" role="dialog" aria-modal="true"><div className="planner-modal">
    <button className="modal-close" onClick={onClose} aria-label="Close"><X/></button>
    {!plan ? <div className="planner-form"><span className="eyebrow">Roam planner</span><h2>Make <em>{d.name}</em> yours.</h2><p>Tell us the shape of your trip. Roam will turn it into a readable day-by-day plan.</p>
      <label>How many days?<div className="segmented">{[3,5,7].map(n=><button className={days===n?"active":""} onClick={()=>setDays(n)} key={n}>{n} days</button>)}</div></label>
      <label>Travel style<div className="segmented">{["Slow","Balanced","Curious"].map(s=><button className={style===s?"active":""} onClick={()=>setStyle(s)} key={s}>{s}</button>)}</div></label>
      <button className="dark-btn full" onClick={generate} disabled={loading}>{loading?<><LoaderCircle className="spin"/>Building your days…</>:<><Sparkles size={17}/> Generate itinerary</>}</button>
      {error && <p className="form-note">{error}</p>}
    </div> : <div className="itinerary"><div className="itinerary-head"><div><span className="eyebrow">Your itinerary</span><h2>{d.name}, <em>{days} days.</em></h2></div><button className="ghost-btn" onClick={()=>setPlan(null)}>Edit</button></div>{plan.days?.map(day=><article className="day" key={day.day}><div className="day-num">{String(day.day).padStart(2,"0")}</div><div><h3>{day.title}</h3><div className="day-row"><span>Morning</span><p>{day.morning}</p></div><div className="day-row"><span>Afternoon</span><p>{day.afternoon}</p></div><div className="day-row"><span>Evening</span><p>{day.evening}</p></div></div></article>)}</div>}
  </div></div>
}

function Chat({destination:d,onClose}) {
  const [messages,setMessages]=useState([{role:"assistant",content:`I'm your Roam guide for ${d.name}. Ask me how long to stay, what to see, or when to go.`}]);
  const [input,setInput]=useState(""),[loading,setLoading]=useState(false);
  async function send() {
    if(!input.trim()||loading)return;
    const next=[...messages,{role:"user",content:input.trim()}];setMessages(next);setInput("");setLoading(true);
    try {const r=await fetch("/api/ai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({destination:d.name,messages:next})});const data=await r.json();if(!r.ok)throw new Error(data.error);setMessages([...next,{role:"assistant",content:data.text}]);}
    catch {setMessages([...next,{role:"assistant",content:"I’m ready to help, but the live AI service is not configured yet. Add GEMINI_API_KEY in your deployment environment to turn me on."}]);}
    finally{setLoading(false)}
  }
  return <div className="chat-panel" role="dialog" aria-label="Roam travel assistant"><div className="chat-head"><div><span className="ai-badge"><Sparkles size={13}/> AI guide</span><strong>Roam / {d.name}</strong></div><button onClick={onClose} aria-label="Close chat"><X/></button></div><div className="chat-messages">{messages.map((m,i)=><div key={i} className={`bubble ${m.role}`}>{m.content}</div>)}{loading&&<div className="bubble assistant"><LoaderCircle className="spin" size={16}/></div>}</div><div className="chat-suggestions">{["How many days?","What should I not miss?","Best time to go?"].map(q=><button key={q} onClick={()=>setInput(q)}>{q}</button>)}</div><div className="chat-input"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask about this destination…" aria-label="Message Roam"/><button onClick={send} aria-label="Send"><Send size={17}/></button></div></div>
}

createRoot(document.getElementById("root")).render(<App />);
