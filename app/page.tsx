"use client";
import { useTranslations } from "next-intl";

import LangSwitch from "@/components/lang-switch";
import { RichText } from "@/components/rich-text";
import { MusicPlayer } from "@/components/music-player/music-player";
import { useMetadata } from "@/components/music-player/hooks/use-metadata";

export default function Home() {
  const t = useTranslations("Route");
  const { metadata, coverUrl } = useMetadata("/aaa.wav");

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <MusicPlayer autoplay={true} url="/aaa.wav" />
      <RichText />
      <LangSwitch />

      <button className="button button--primary">{t("dashboard")}</button>
    </section>
  );
}
