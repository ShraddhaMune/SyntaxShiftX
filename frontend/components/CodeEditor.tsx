"use client";

import dynamic from "next/dynamic";

const MonacoEditor = dynamic(
  () => import("@monaco-editor/react"),
  { ssr: false }
);

interface CodeEditorProps {
  language: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  height?: string;
}

export default function CodeEditor({
  language,
  value,
  onChange,
  readOnly = false,
  height = "280px",
}: CodeEditorProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-cyan-500/20 shadow-lg shadow-cyan-500/5">
      <MonacoEditor
        height={height}
        language={language}
        theme="vs-dark"
        value={value}
        onChange={(value) => onChange?.(value || "")}
        options={{
          readOnly,
          automaticLayout: true,
          minimap: {
            enabled: false,
          },
          fontSize: 14,
          fontLigatures: true,
          wordWrap: "on",
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          roundedSelection: true,
          padding: {
            top: 15,
          },
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        }}
      />
    </div>
  );
}