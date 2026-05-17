import Papa from "papaparse";
import type { ConanEntry } from "../types/conan";

/**
 * Fetches and parses the Conan dataset CSV into a typed array of ConanEntry objects.
 *
 * @returns A promise that resolves to an array of ConanEntry objects.
 * @throws If the fetch fails or PapaParse encounters a fatal error.
 */
export async function parseConanCSV(): Promise<ConanEntry[]> {
  const response = await fetch("/data/ConanData.csv");

  if (!response.ok) {
    throw new Error(
      `Failed to fetch CSV: ${response.status} ${response.statusText}`
    );
  }

  const csvText = await response.text();

  return new Promise<ConanEntry[]>((resolve, reject) => {
    Papa.parse<ConanEntry>(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      transform: (value) => value.trim(),
      complete: (results) => {
        if (results.errors.length > 0) {
          const fatal = results.errors.find(
            (error) => error.type === "Delimiter" || error.type === "Quotes"
          );
          if (fatal) {
            reject(new Error(`CSV parse error: ${fatal.message}`));
            return;
          }
          console.warn("CSV non-fatal parse warnings:", results.errors);
        }
        resolve(results.data);
      },
      error: (error: Error) => {
        reject(new Error(`PapaParse error: ${error.message}`));
      },
    });
  });
}
