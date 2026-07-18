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
  const [programInput, setProgramInput] = useState("");
  const [translatedCode, setTranslatedCode] = useState("");
  const [executionOutput, setExecutionOutput] = useState("");
  const [explanation, setExplanation] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
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

      setLoadingMessage(
        "🚀 Starting AI server... If this is your first translation, Render may take up to 60 seconds to wake up."
      );

      const data = await translateCode(
        sourceLanguage,
        targetLanguage,
        sourceCode,
        programInput
      );

      setLoadingMessage("⚡ AI is translating your code...");

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
        setLoadingMessage("");
      }
  }

  function copyCode() {
    navigator.clipboard.writeText(translatedCode);
  }

  function clearAll() {
  setSourceCode(EXAMPLES[sourceLanguage]);
  setProgramInput("");      // ← NEW
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

      <div className="text-center py-10">

        <h1 className="text-4xl md:text-6xl font-extrabold">
          Translate. <span className="text-cyan-400">Execute.</span> Explain.
        </h1>

        <p className="mt-4 text-gray-400 text-lg max-w-3xl mx-auto">
          Instantly translate code between Python, Java, C, C++, JavaScript and
          TypeScript with AI. Execute your translated code and understand it with
          built-in AI explanations.
        </p>

      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        <div className="d gap-5 flex-wrap mb-6">

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
            {loading && (
              <div className="mt-3 rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-sm text-cyan-300">
                {loadingMessage}
              </div>
            )}

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

          <ConvertButton
            loading={loading}
            onClick={handleConvert}
            className="w-full sm:w-auto"
          />

        <button
            onClick={clearAll}
            className="
            w-full sm:w-auto
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
            w-full sm:w-auto
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          <div className="bg-[#101828] rounded-2xl border border-cyan-500/15 p-4">

            <h2 className="text-xl font-bold mb-3">
              Source Code
            </h2>

            <CodeEditor
              language={sourceLanguage}
              value={sourceCode}
              onChange={setSourceCode}
              height="280px"
            />

          </div>

          <div className="bg-[#101828] rounded-2xl border border-cyan-500/15 p-4">

            <div className="flex justify-between items-center mb-3">

              <h2 className="text-xl font-bold">
                Translated Code
              </h2>

              <div className="flex flex-col sm:flex-row gap-3">

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
              height="300px"
            />

          </div>

        </div>

        <div className="mt-5 bg-[#101828] rounded-2xl border border-cyan-500/15 p-4">

  <h2 className="text-xl font-bold mb-1">
  Console Input (Optional)
</h2>

<p className="text-sm text-gray-400 mb-3">
  Enter each input on a new line.
</p>

  <textarea
  value={programInput}
  onChange={(e) => setProgramInput(e.target.value)}
  placeholder={`Example:
5
7`}
  spellCheck={false}
  className="
    w-full
    h-24
    rounded-xl
    bg-[#0b1220]
    border
    border-cyan-500/20
    p-4
    resize-none
    outline-none
    text-white
    font-mono
    text-sm
    focus:border-cyan-400
    focus:ring-2
    focus:ring-cyan-500/20
    transition-all
  "
/>

</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">

          <OutputPanel title="Execution Output">
            {executionOutput}
          </OutputPanel>

          <OutputPanel title="AI Explanation">
            {explanation}
          </OutputPanel>

        </div>

      </section>

    <footer className="mt-10 border-t border-cyan-500/20 py-6 text-center text-gray-400">

    
        <p className="text-center text-gray-400 px-4 leading-7">
          Built by <span className="font-semibold">Shraddha Mune</span>
          <br />
          Powered by Next.js • FastAPI • OpenRouter
        </p>
  

    <p className="mt-2 text-cyan-400 font-semibold">
        SyntaxShift X © 2026
    </p>

    </footer>
    </main>
  );
}