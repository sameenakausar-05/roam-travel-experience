export default async function handler(req, res) {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: "Missing coordinates." });
  if (!process.env.OPENWEATHER_API_KEY) {
    return res.status(503).json({ error: "Weather API is not configured." });
  }
  try {
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.searchParams.set("lat", lat);
    url.searchParams.set("lon", lon);
    url.searchParams.set("units", "metric");
    url.searchParams.set("appid", process.env.OPENWEATHER_API_KEY);
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.message || "Weather unavailable." });
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ error: "Could not reach weather service." });
  }
}