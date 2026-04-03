import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req, res) {
  // Simple CORS setup
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { messages } = req.body;

    const completion = await groq.chat.completions.create({
      messages: messages,
      model: "llama-3.3-70b-versatile", // This model is extremely fast and smart
    });

    res.status(200).json(completion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch from Groq" });
  }
}