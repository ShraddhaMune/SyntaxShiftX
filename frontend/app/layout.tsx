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

  openGraph: {
    title: "SyntaxShift X",
    description: "Translate • Execute • Explain",
    images: ["/opengraph-image.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "SyntaxShift X",
    description: "Translate • Execute • Explain",
    images: ["/opengraph-image.png"],
  },
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
