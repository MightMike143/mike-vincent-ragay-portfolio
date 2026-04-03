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
          role: "system",
          // This is where you give the AI its brain and personality!
          content: `You are the official AI assistant for Mike's portfolio website. 
          Your job is to represent Mike professionally and answer questions about his career. 
          
          Here are the facts about Mike:
          - He specializes in Splunk implementations and data engineering.
          - He works at Accenture, focusing on data pipelines and real-time analytics.
          - His goal is turning complex data into actionable insights.
          
          Rules:
          - Be friendly, concise, and professional.
          - Never break character. You are Mike's assistant.
          - If a user asks something completely unrelated to tech or Mike's career, politely steer the conversation back to Mike's portfolio.
          - If you don't know the answer, tell them to reach out to Mike directly via LinkedIn or the contact form.`
        },
        {
          role: "user",
          content: message, // The actual question from the frontend
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    // 3. Extract the text and send it as 'reply'
    const aiText = completion.choices[0].message.content;
    res.status(200).json({ reply: aiText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
