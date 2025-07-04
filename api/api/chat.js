export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { message } = req.body;
  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });
    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content || "لا يوجد رد.";
    res.status(200).json({ reply });
  } catch {
    res.status(500).json({ error: "حدث خطأ أثناء المعالجة." });
  }
}

