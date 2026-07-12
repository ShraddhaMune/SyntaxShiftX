"use client";

import { LANGUAGES } from "@/lib/language";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function LanguageSelector({
  label,
  value,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-300 text-sm">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#111827] border border-cyan-500/20 rounded-lg px-4 py-3 text-white outline-none"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}