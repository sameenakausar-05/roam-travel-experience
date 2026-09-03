export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST required." });
  if (!process.env.GEMINI_API_KEY) {
    return res.status(503).json({ error: "AI is not configured. Add GEMINI_API_KEY in Vercel." });
  }
  try {
    const { messages = [], destination = "" } = req.body || {};
    const prompt = `You are Roam's concise, warm travel concierge. The destination is ${destination || "unspecified"}.
Answer the visitor's question with practical, specific advice. Prefer short paragraphs and bullets.
Never invent live facts. If asked about current prices, opening hours, weather, visas or safety, say those should be checked against an official/current source.
Conversation:
${messages.map(m => `${m.role}: ${m.content}`).join("\n")}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error?.message || "AI unavailable." });
    const text = data.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("") || "I couldn't form an answer just now.";
    return res.status(200).json({ text });
  } catch {
    return res.status(500).json({ error: "Could not reach the AI service." });
  }
}