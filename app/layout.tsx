import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sunrise",
  description: "A dynamic, multifaceted personal digital space.",
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
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-black text-zinc-950 dark:text-zinc-50">
        <Providers>
          {/* 全局主容器：占据全宽并提供统一的内边距，刻意不使用 max-w 限制 */}
          <main className="flex flex-col flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-10">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
