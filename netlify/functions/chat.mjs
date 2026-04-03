import OpenAI from "openai";

const openai = new OpenAI();

export default async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json({ error: "Message required" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
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
