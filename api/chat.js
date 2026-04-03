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
    // 1. Grab the single 'message' sent by your frontend
    const { message } = req.body; 

    // 2. Wrap it in the array format Groq needs
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message, 
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    // 3. Send the response
    res.status(200).json(completion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
