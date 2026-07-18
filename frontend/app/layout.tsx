import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SyntaxShift X",
  description:
    "AI-Powered Programming Language Translator. Translate code between Python, Java, C, C++, JavaScript, and TypeScript using AI.",
  keywords: [
    "SyntaxShift X",
    "AI",
    "Code Translator",
    "Programming",
    "Next.js",
    "FastAPI",
    "OpenRouter",
    "Java",
    "Python",
    "C++",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
