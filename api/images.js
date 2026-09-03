export default async function handler(req, res) {
  const q = req.query.q || "travel destination";
  if (!process.env.PEXELS_API_KEY) {
    return res.status(503).json({ error: "Image API is not configured." });
  }
  try {
    const url = new URL("https://api.pexels.com/v1/search");
    url.searchParams.set("query", q);
    url.searchParams.set("per_page", "12");
    const response = await fetch(url, {
      headers: { Authorization: process.env.PEXELS_API_KEY }
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error || "Images unavailable." });
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    return res.status(200).json(data.photos || []);
  } catch {
    return res.status(500).json({ error: "Could not reach image service." });
  }
}