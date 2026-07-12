"use client";

import { useRef, useState } from "react";

import Navbar from "@/components/Navbar";
import LanguageSelector from "@/components/LanguageSelector";
import CodeEditor from "@/components/CodeEditor";
import ConvertButton from "@/components/ConvertButton";
import OutputPanel from "@/components/OutputPanel";

import { translateCode } from "@/lib/api";

const EXAMPLES: Record<string, string> = {
  c: `#include <stdio.h>

int main() {
    printf("Hello SyntaxShift X");
    return 0;
}`,

  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello SyntaxShift X";
    return 0;
}`,

  java: `public class Main {

    public static void main(String[] args){

        System.out.println("Hello SyntaxShift X");

    }

}`,

  python: `print("Hello SyntaxShift X")`,

  javascript: `console.log("Hello SyntaxShift X");`,

  typescript: `console.log("Hello SyntaxShift X");`,
};

export default function Home() {
  const [sourceLanguage, setSourceLanguage] = useState("java");
  const [targetLanguage, setTargetLanguage] = useState("python");

  const [sourceCode, setSourceCode] = useState(EXAMPLES.java);

  const [translatedCode, setTranslatedCode] = useState("");
  const [executionOutput, setExecutionOutput] = useState("");
  const [explanation, setExplanation] = useState("");

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function changeSourceLanguage(lang: string) {
    setSourceLanguage(lang);
    setSourceCode(EXAMPLES[lang]);
  }

  function swapLanguages() {

  const oldSource = sourceLanguage;
  const oldTarget = targetLanguage;

  setSourceLanguage(oldTarget);
  setTargetLanguage(oldSource);

  setSourceCode(translatedCode || EXAMPLES[oldTarget]);
  setTranslatedCode(sourceCode);

  setExecutionOutput("");
  setExplanation("");
 }

  async function handleConvert() {
    try {
      setLoading(true);

      const data = await translateCode(
        sourceLanguage,
        targetLanguage,
        sourceCode
      );

      setTranslatedCode(data.translated_code || "");
      setExecutionOutput(data.execution_output || "");
      setExplanation(data.explanation || "");
    } catch (error) {
      console.error(error);

      setTranslatedCode("Translation failed.");
      setExecutionOutput("");
      setExplanation("");
    } finally {
      setLoading(false);
    }
  }

  function copyCode() {
    navigator.clipboard.writeText(translatedCode);
  }

  function clearAll() {
    setSourceCode(EXAMPLES[sourceLanguage]);
    setTranslatedCode("");
    setExecutionOutput("");
    setExplanation("");
  }

  function uploadCode(
    event: React.ChangeEvent<HTMLInputElement>
    ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {

        const content = e.target?.result as string;

        setSourceCode(content);

    };

    reader.readAsText(file);
    } 

  function downloadCode() {
    const blob = new Blob([translatedCode], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = `translated.${targetLanguage}`;

    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-[#070b14] text-white overflow-hidden">

      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-6">

        <div className="flex items-end gap-5 flex-wrap mb-6">

          <LanguageSelector
            label="Source"
            value={sourceLanguage}
            onChange={changeSourceLanguage}
            />

            <button
            onClick={swapLanguages}
            className="
                mt-7
                h-12
                w-12
                rounded-xl
                bg-cyan-600
                hover:bg-cyan-500
                transition-all
                duration-300
                hover:rotate-180
                hover:scale-110
                text-xl
                font-bold
            "
            >
            ⇄
            </button>

            <LanguageSelector
            label="Target"
            value={targetLanguage}
            onChange={setTargetLanguage}
            />

        <div className="flex gap-3 flex-wrap">

          <ConvertButton
            loading={loading}
            onClick={handleConvert}
          />

        <button
            onClick={clearAll}
            className="
            px-6 py-3
            rounded-xl
            bg-red-500
            hover:bg-red-400
            transition-all
            duration-300
            hover:scale-105
            font-semibold
            "
        >
            🗑 Clear
        </button>
        
        <button
            onClick={() => fileInputRef.current?.click()}
            className="
                px-6
                py-3
                rounded-xl
                bg-violet-600
                hover:bg-violet-500
                transition-all
                duration-300
                hover:scale-105
                font-semibold
            "
            >
            📂 Upload
            </button>

            <input
            ref={fileInputRef}
            type="file"
            accept=".java,.py,.cpp,.c,.js,.ts,.txt"
            hidden
            onChange={uploadCode}
            />

        </div>

        </div>

        <div className="grid grid-cols-2 gap-5">

          <div className="bg-[#101828] rounded-2xl border border-cyan-500/15 p-4">

            <h2 className="text-xl font-bold mb-3">
              Source Code
            </h2>

            <CodeEditor
              language={sourceLanguage}
              value={sourceCode}
              onChange={setSourceCode}
              height="320px"
            />

          </div>

          <div className="bg-[#101828] rounded-2xl border border-cyan-500/15 p-4">

            <div className="flex justify-between items-center mb-3">

              <h2 className="text-xl font-bold">
                Translated Code
              </h2>

              <div className="flex gap-3">

                <button
                  onClick={copyCode}
                  className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
                >
                  Copy
                </button>

                <button
                  onClick={downloadCode}
                  className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg transition"
                >
                  Download
                </button>

              </div>

            </div>

            <CodeEditor
              language={targetLanguage}
              value={translatedCode}
              readOnly
              height="320px"
            />

          </div>

        </div>

        <div className="grid grid-cols-2 gap-5 mt-5">

          <OutputPanel title="Execution Output">
            {executionOutput}
          </OutputPanel>

          <OutputPanel title="AI Explanation">
            {explanation}
          </OutputPanel>

        </div>

      </section>

    <footer className="mt-10 border-t border-cyan-500/20 py-6 text-center text-gray-400">

    <p>
        Built with ❤️ using Next.js · FastAPI · Ollama · Monaco Editor
    </p>

    <p className="mt-2 text-cyan-400 font-semibold">
        SyntaxShift X © 2026
    </p>

    </footer>
    </main>
  );
}