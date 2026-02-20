/**
 * AI chatbox assistant: cold-chain Q&A using OpenAI.
 * Uses OPENAI_API_KEY in Convex env.
 * Runs in default Convex runtime (no "use node") to avoid Windows ESM loader error
 * (file:// URL scheme) when running convex dev locally.
 */
import { v } from "convex/values";
import { action } from "../_generated/server";

const OPENAI_MODEL = "gpt-4o-mini";

const SYSTEM_PROMPT = `You are a helpful cold chain compliance assistant for ThermoGuard. You answer questions about:
- Cold chain monitoring for food (HACCP/FSMA) and pharmaceuticals (GDP/GxP)
- Temperature excursions, compliance, and audit trails
- Best practices for shipping temperature-sensitive goods

Keep answers concise (2-4 sentences unless the user asks for detail). Be professional and factual. If you don't know something, say so.`;

export const sendMessage = action({
  args: {
    message: v.string(),
    history: v.optional(
      v.array(
        v.object({
          role: v.union(v.literal("user"), v.literal("assistant")),
          content: v.string(),
        })
      )
    ),
  },
  returns: v.string(),
  handler: async (ctx, args) => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return "AI assistant is not configured. Set OPENAI_API_KEY in your Convex dashboard (Settings → Environment Variables), then redeploy.";
    }

    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      { role: "system", content: SYSTEM_PROMPT },
    ];
    if (args.history && args.history.length > 0) {
      const recent = args.history.slice(-10);
      for (const m of recent) {
        messages.push({ role: m.role, content: m.content });
      }
    }
    messages.push({ role: "user", content: args.message });

    const body = JSON.stringify({
      model: OPENAI_MODEL,
      messages,
      max_tokens: 400,
      temperature: 0.5,
    });

    const maxRetries = 2;
    let lastRes: Response | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      if (attempt > 0) {
        const delayMs = attempt * 2000;
        await new Promise((r) => setTimeout(r, delayMs));
      }
      lastRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body,
      });
      if (lastRes.ok) break;
      if (lastRes.status !== 429 || attempt === maxRetries) break;
    }

    const res = lastRes!;
    if (!res.ok) {
      if (res.status === 429) {
        return "Rate limit reached. Please wait a minute and try again, or check usage at platform.openai.com.";
      }
      return `Sorry, I couldn't process that. (Error: ${res.status})`;
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content?.trim() ?? "No response.";
    return content;
  },
});
