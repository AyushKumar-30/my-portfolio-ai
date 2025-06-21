import type { NextApiRequest, NextApiResponse } from "next";
import { getTopChunks, loadAndEmbedChunks } from "@/lib/rag/search";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Missing message" });

  try {
    // 1. Load + embed all resume chunks (if not done already)
    await loadAndEmbedChunks();

    // 2. Embed the query and retrieve top 3 relevant chunks
    const topChunks = await getTopChunks(message, 3);
    const contextString = topChunks.map((c) => `- ${c.content}`).join("\n");

    // 3. Send it to OpenRouter with only relevant facts
    const openRes = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3-8b-instruct",
          messages: [
            {
              role: "system",
              content: `You are AyushBot — a helpful AI assistant that answers questions about Ayush Kumar using the context provided.

                Always follow these rules:
                - Respond clearly and conversationally.
                - Format answers using bullet points when listing achievements or experiences.
                - Bold important terms like job titles, company names, and dates.
                - Only answer based on the context below. Do not make up anything.
                - If the answer is not found, say: "I'm not sure based on what I know."

                Here is the context:
                ${contextString}`,
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    if (!openRes.ok) {
      const errorText = await openRes.text();
      console.error("OpenRouter API error:", errorText);
      return res
        .status(500)
        .json({ error: "OpenRouter failed", details: errorText });
    }

    const data = await openRes.json();
    console.log("OpenRouter raw response:", JSON.stringify(data, null, 2));

    const reply = data.choices?.[0]?.message?.content;
    if (!reply) return res.status(500).json({ error: "No reply from LLM" });

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Unhandled error:", err);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: String(err) });
  }
}
