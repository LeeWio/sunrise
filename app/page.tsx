import LangSwitch from "@/components/lang-switch";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Route")
  return (
    <>
      <LangSwitch />
      <button className="button button--primary " >{t('dashboard')}</button>
    </>
  );
}
