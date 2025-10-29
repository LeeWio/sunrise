import { useTranslations } from "next-intl";

import LangSwitch from "@/components/lang-switch";
import { RichText } from "@/components/rich-text";

export default function Home() {
  const t = useTranslations("Route");

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <RichText />
      <LangSwitch />

      <button className="button button--primary">{t("dashboard")}</button>
    </section>
  );
}
