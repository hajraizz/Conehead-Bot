import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY in .env.local");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function generateReply(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error: any) {
    if (error?.status === 429) {
      return "gemini is rate-limiting me rn. very dramatic. try one message again in a bit.";
    }

    console.error("Gemini error:", error);
    return "i tried to consult the conan archives and immediately entered my error era.";
  }
}