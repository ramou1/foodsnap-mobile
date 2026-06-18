import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { router } from "expo-router";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";
import { useSettings, ThemeMode } from "@/contexts/SettingsContext";
import { useTranslation } from "@/hooks/useTranslation";
import { Language } from "@/i18n/translations";

function OptionRow<T extends string>({
  label,
  options,
  value,
  onChange,
  labels,
}: {
  label: string;
  options: T[];
  value: T;
  onChange: (v: T) => void;
  labels: Record<T, string>;
}) {
  return (
    <View className="mb-5">
      <Text className="text-sm font-rubik-medium text-text-muted dark:text-gray-400 mb-2">{label}</Text>
      <View className="flex-row flex-wrap gap-2">
        {options.map((opt) => (
          <TouchableOpacity
            key={opt}
            onPress={() => onChange(opt)}
            className={`px-4 py-2.5 rounded-xl border ${
              value === opt ? "bg-brand border-brand" : "border-border dark:border-[#2D2D44] bg-background dark:bg-[#0F0F1A]"
            }`}
          >
            <Text className={`font-rubik-medium ${value === opt ? "text-white" : "text-text dark:text-white"}`}>
              {labels[opt]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { themeMode, setThemeMode, language, setLanguage } = useSettings();
  const [avatar] = useState(require("../assets/images/default-avatar.png"));
  const [name, setName] = useState("Fulano de Tal");
  const [username, setUsername] = useState("foodlover_123");
  const [bio, setBio] = useState("Amante da boa comida 🍝🍣🍕");
  const [email, setEmail] = useState("user@example.com");
  const [phone, setPhone] = useState("(55) 98123-4567");

  const themeLabels: Record<ThemeMode, string> = {
    light: t("settings.themeLight"),
    dark: t("settings.themeDark"),
    system: t("settings.themeSystem"),
  };

  const langLabels: Record<Language, string> = {
    pt: t("settings.langPt"),
    en: t("settings.langEn"),
    es: t("settings.langEs"),
  };

  const handleSave = () => Alert.alert(t("common.ok"), t("settings.saved"));

  const handleLogout = () => {
    Alert.alert(t("settings.logout"), t("settings.logoutConfirm"), [
      { text: t("settings.cancel"), style: "cancel" },
      { text: t("settings.yesLogout"), onPress: () => router.push("/(auth)/login") },
    ]);
  };

  return (
    <ScreenContainer edges={["top", "bottom"]}>
      <ScreenHeader title={t("settings.title")} showBack />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="items-center py-8 bg-surface dark:bg-[#1A1A2E] mb-3">
          <View className="relative">
            <View className="rounded-full border-2 border-brand p-1">
              <Image source={avatar} style={{ width: 110, height: 110 }} className="rounded-full" />
            </View>
            <TouchableOpacity className="absolute bottom-1 right-1 bg-brand p-2.5 rounded-full">
              <FontAwesome5 name="camera" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text className="text-text-muted dark:text-gray-400 font-rubik mt-3">{t("settings.changePhoto")}</Text>
        </View>

        <View className="bg-surface dark:bg-[#1A1A2E] rounded-3xl mx-4 p-5 mb-4">
          <Text className="text-lg font-rubik-bold text-text dark:text-white mb-4">{t("settings.appearance")}</Text>
          <OptionRow
            label={t("settings.theme")}
            options={["light", "dark", "system"]}
            value={themeMode}
            onChange={setThemeMode}
            labels={themeLabels}
          />
          <OptionRow
            label={t("settings.language")}
            options={["pt", "en", "es"]}
            value={language}
            onChange={setLanguage}
            labels={langLabels}
          />
        </View>

        <View className="bg-surface dark:bg-[#1A1A2E] rounded-3xl mx-4 p-5 mb-4">
          <FormInput label={t("settings.name")} value={name} onChangeText={setName} placeholder={t("settings.name")} />
          <FormInput label={t("settings.username")} value={username} onChangeText={setUsername} placeholder="@username" autoCapitalize="none" />
          <View className="mb-4">
            <Text className="text-sm font-rubik-medium text-text-muted dark:text-gray-400 mb-2">{t("settings.bio")}</Text>
            <TextInput
              className="bg-background dark:bg-[#0F0F1A] border border-border dark:border-[#2D2D44] rounded-2xl p-4 text-base text-text dark:text-white font-rubik min-h-[90px]"
              value={bio}
              onChangeText={setBio}
              multiline
              textAlignVertical="top"
              placeholderTextColor="#9C96AD"
            />
          </View>
          <FormInput label={t("settings.email")} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <FormInput label={t("settings.phone")} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        </View>

        <View className="px-4 pb-8 gap-3">
          <Button label={t("settings.save")} onPress={handleSave} />
          <Button label={t("settings.logout")} variant="danger" onPress={handleLogout} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
