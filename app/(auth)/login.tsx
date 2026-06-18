import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { FoodSnapLogo } from "@/components/ui/FoodSnapLogo";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { useTranslation } from "@/hooks/useTranslation";

export default function LoginScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <ScreenContainer className="bg-surface dark:bg-[#1A1A2E]" edges={["top", "bottom"]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} className="px-6 py-8" keyboardShouldPersistTaps="handled">
          <FoodSnapLogo />

          <View className="bg-background dark:bg-[#0F0F1A] rounded-3xl p-6">
            <Text className="text-2xl font-rubik-bold text-text dark:text-white mb-1">{t("auth.welcome")}</Text>
            <Text className="text-text-muted dark:text-gray-400 font-rubik mb-6">{t("auth.welcomeSubtitle")}</Text>

            <FormInput placeholder={t("auth.email")} keyboardType="email-address" autoCapitalize="none" />
            <FormInput placeholder={t("auth.password")} secureTextEntry />

            <Button label={t("auth.login")} onPress={() => router.replace("/(tabs)/feed")} className="mt-2" />
          </View>

          <View className="flex-row justify-center mt-8">
            <Text className="text-text-muted dark:text-gray-400 font-rubik">{t("auth.noAccount")} </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
              <Text className="text-brand font-rubik-semibold">{t("auth.signUp")}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
