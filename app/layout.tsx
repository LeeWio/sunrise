import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { cn } from "@heroui/react";
import { Link } from "@heroui/react";

import StoreProvider from "./store-provider";

import { fontMono, fontSans, fontSerif } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: "Sunrise Blog",
    template: "%s | Sunrise Blog",
  },
  description:
    "A modern blog platform built with Next.js 16, HeroUI, and Sunrise backend",
  keywords: ["blog", "nextjs", "heroui", "sunrise", "react", "typescript"],
  authors: [{ name: "Sunrise Team" }],
  openGraph: {
    title: "Sunrise Blog",
    description:
      "A modern blog platform built with Next.js 16, HeroUI, and Sunrise backend",
    type: "website",
    locale: "en_US",
    siteName: "Sunrise Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunrise Blog",
    description:
      "A modern blog platform built with Next.js 16, HeroUI, and Sunrise backend",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html suppressHydrationWarning data-theme="dark" lang={locale}>
      <head />
      <body
        className={cn(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
          fontSerif.variable,
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <StoreProvider>
            <div className="relative flex flex-col min-h-screen">
              <main className="w-full grow mx-auto px-6 py-8">{children}</main>

              <footer className="w-full flex items-center justify-center py-3">
                <Link.Root
                  aria-label="Visit HeroUI website"
                  className="flex items-center gap-1 text-current text-sm hover:opacity-80 transition-opacity"
                  href="https://heroui.com?utm_source=next-app-template"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="text-default-600">Powered by</span>
                  <p className="text-primary font-semibold">HeroUI</p>
                  <Link.Icon />
                </Link.Root>
              </footer>
            </div>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
