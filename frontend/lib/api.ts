const API_URL = "http://127.0.0.1:8000";

export interface TranslateResponse {
  translated_code: string;
  execution_output: string;
  explanation: string;
}

export async function translateCode(
  sourceLanguage: string,
  targetLanguage: string,
  code: string
): Promise<TranslateResponse> {
  const response = await fetch(`${API_URL}/translate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source_language: sourceLanguage,
      target_language: targetLanguage,
      code,
    }),
  });

  if (!response.ok) {
    throw new Error("Translation failed");
  }

  return await response.json();
}

export const FILE_EXTENSIONS: Record<string, string> = {
  c: "c",
  cpp: "cpp",
  java: "java",
  python: "py",
  javascript: "js",
  typescript: "ts",
};