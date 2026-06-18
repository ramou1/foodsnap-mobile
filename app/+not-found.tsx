import { Link, Stack } from "expo-router";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/hooks/useTranslation";

export default function NotFoundScreen() {
  const { t } = useTranslation();

  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-24 h-24 rounded-full bg-brand/10 items-center justify-center mb-6">
          <Ionicons name="restaurant-outline" size={48} color="#6e11b0" />
        </View>
        <Text className="text-3xl font-rubik-bold text-text dark:text-white mb-2">{t("common.notFoundTitle")}</Text>
        <Text className="text-text-muted dark:text-gray-400 font-rubik text-center mb-8">{t("common.notFoundMsg")}</Text>
        <Link href="/" asChild>
          <Button label={t("common.goHome")} />
        </Link>
      </View>
    </ScreenContainer>
  );
}
