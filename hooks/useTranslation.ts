import { useSettings } from "@/contexts/SettingsContext";
import { translations, Language } from "@/i18n/translations";

function getNested(obj: Record<string, unknown>, path: string): string {
  const result = path.split(".").reduce<unknown>((current, key) => {
    if (current && typeof current === "object" && key in (current as object)) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
  return typeof result === "string" ? result : path;
}

export function useTranslation() {
  const { language } = useSettings();
  const t = (key: string): string =>
    getNested(translations[language] as Record<string, unknown>, key);
  return { t, language: language as Language };
}
