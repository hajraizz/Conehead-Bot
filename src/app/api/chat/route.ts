import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import Papa from "papaparse";

import { generateReply } from "@/src/lib/gemini";
import { buildPrompt } from "@/src/lib/promptBuilder";
import { retrieveMatches } from "@/src/lib/retrieveMatches";
import type { ConanEntry } from "@/src/types/conan";

export const runtime = "nodejs";

interface ChatRequestBody {
  message?: string;
}

async function loadConanDataset(): Promise<ConanEntry[]> {
  const csvPath = path.join(process.cwd(), "public", "data", "ConanData.csv");
  const csvText = await readFile(csvPath, "utf8");

  return new Promise<ConanEntry[]>((resolve, reject) => {
    Papa.parse<ConanEntry>(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      transform: (value) => value.trim(),
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error(results.errors[0].message));
          return;
        }

        resolve(results.data);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
}

export async function POST(request: Request) { // main handler for chat API
  try {
    const body = (await request.json()) as ChatRequestBody;
    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json(
        { reply: "SPEAK UP! I KNOW YOU HATE ME but I need something before I yap  " },
        { status: 400 }
      );
    }

    const conanData = await loadConanDataset();
    const matches = retrieveMatches(message, conanData).slice(0, 1); // only take the top match to keep the prompt focused and concise
    console.log("Selected match:", matches[0]);
    const prompt = buildPrompt(message, matches);
    const reply = await generateReply(prompt);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      { reply: "i tried to be social and immediately crashed." },
      { status: 500 }
    );
  }
}
