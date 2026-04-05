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
    <html lang="en" data-theme="dark" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
        <Providers>
          <main className="flex w-full flex-1 flex-col px-4 py-6 sm:px-6 md:px-8 md:py-10 lg:px-12">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
