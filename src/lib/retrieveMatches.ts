import type { ConanEntry } from "../types/conan";

const MAX_MATCHES = 3;

function normalizeText(value: string): string {
  return value.trim().toLowerCase();
}

function getKeywords(entry: ConanEntry): string[] {
  return entry.keywords
    .split(",")
    .map(normalizeText)
    .filter(Boolean);
}

function countKeywordOverlap(userMessage: string, entry: ConanEntry): number {
  const normalizedMessage = normalizeText(userMessage);
  const uniqueKeywords = new Set(getKeywords(entry));

  return [...uniqueKeywords].filter((keyword) =>
    normalizedMessage.includes(keyword)
  ).length;
}

export function retrieveMatches(
  userMessage: string,
  conanData: ConanEntry[]
): ConanEntry[] {
  if (!userMessage.trim()) {
    return [];
  }

  return conanData
    .map((entry, index) => ({
      entry,
      index,
      score: countKeywordOverlap(userMessage, entry),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, MAX_MATCHES)
    .map(({ entry }) => entry);
}
