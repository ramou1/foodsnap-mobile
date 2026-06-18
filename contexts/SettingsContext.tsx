import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Language } from "@/i18n/translations";

export type ThemeMode = "light" | "dark" | "system";

interface SettingsState {
  themeMode: ThemeMode;
  language: Language;
  isDark: boolean;
  isReady: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  setLanguage: (lang: Language) => void;
}

const STORAGE_KEY = "@foodsnap/app-settings";

const SettingsContext = createContext<SettingsState | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useSystemColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system");
  const [language, setLanguageState] = useState<Language>("pt");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed.themeMode) setThemeModeState(parsed.themeMode);
          if (parsed.language) setLanguageState(parsed.language);
        } catch { /* ignore */ }
      }
      setIsReady(true);
    });
  }, []);

  const persist = useCallback(async (theme: ThemeMode, lang: Language) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ themeMode: theme, language: lang }));
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    persist(mode, language);
  }, [language, persist]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    persist(themeMode, lang);
  }, [themeMode, persist]);

  const isDark = useMemo(() => {
    if (themeMode === "system") return systemScheme === "dark";
    return themeMode === "dark";
  }, [themeMode, systemScheme]);

  const value = useMemo(
    () => ({ themeMode, language, isDark, isReady, setThemeMode, setLanguage }),
    [themeMode, language, isDark, isReady, setThemeMode, setLanguage]
  );

  if (!isReady) return null;

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
