import Groq from "groq-sdk";

export default async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json({ error: "Message required" }, { status: 400 });
    }

    const apiKey = Netlify.env.get("GROQ_API_KEY");
    if (!apiKey) {
      return Response.json(
        { error: "Chat service not configured" },
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey });

    const completion = await groq.chat.completions.create({
      model: "mixtral-8x7b-32768",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant answering questions about Mike Vincent Ragay, a Data Engineering Analyst and Splunk Core Certified Consultant at Accenture. He specializes in real-time analytics, data pipelines, and Splunk implementations. Keep answers concise and professional.",
        },
        { role: "user", content: message },
      ],
      max_tokens: 500,
    });

    return Response.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
