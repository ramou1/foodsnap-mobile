import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/hooks/useTranslation";

const avatarOptions = [
  { id: "1", uri: require("../../assets/avatars/avatar01.png") },
  { id: "2", uri: require("../../assets/avatars/avatar02.png") },
  { id: "3", uri: require("../../assets/avatars/avatar03.png") },
  { id: "4", uri: require("../../assets/avatars/avatar04.png") },
  { id: "5", uri: require("../../assets/avatars/avatar05.png") },
  { id: "6", uri: require("../../assets/avatars/avatar06.png") },
];

const FOOD_KEYS = ["italian", "japanese", "mexican", "vegan", "fastFood", "bbq", "sweets", "healthy"] as const;

export default function RegisterScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [selectedFood, setSelectedFood] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const stepTitles = [
    t("auth.stepAvatar"),
    t("auth.stepName"),
    t("auth.stepFood"),
    t("auth.stepFinish"),
  ];

  const toggleFood = (key: string) => {
    setSelectedFood((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return selectedAvatar !== null;
      case 1: return name.trim().length > 0;
      case 2: return selectedFood.length > 0;
      case 3: return email.includes("@") && password.length >= 6 && password === confirmPassword;
      default: return false;
    }
  };

  const nextStep = () => {
    if (!canProceed()) return;
    if (currentStep < 3) setCurrentStep((s) => s + 1);
    else router.replace("/(tabs)/feed");
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
    else router.back();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <View className="w-full">
            <Text className="text-text-muted dark:text-gray-400 font-rubik mb-4">{t("auth.avatarHint")}</Text>
            <FlatList
              data={avatarOptions}
              numColumns={3}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setSelectedAvatar(item.id)}
                  className={`p-2 m-2 rounded-2xl ${
                    selectedAvatar === item.id ? "bg-brand/10 border-2 border-brand" : "border-2 border-transparent"
                  }`}
                >
                  <Image source={item.uri} style={{ width: 80, height: 80 }} className="rounded-full" resizeMode="cover" />
                </TouchableOpacity>
              )}
              contentContainerStyle={{ alignItems: "center" }}
            />
          </View>
        );
      case 1:
        return (
          <FormInput label={t("auth.yourName")} value={name} onChangeText={setName} placeholder={t("auth.namePlaceholder")} />
        );
      case 2:
        return (
          <View className="w-full">
            <Text className="text-text-muted dark:text-gray-400 font-rubik mb-4">{t("auth.foodHint")}</Text>
            <View className="flex-row flex-wrap">
              {FOOD_KEYS.map((key) => {
                const selected = selectedFood.includes(key);
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={() => toggleFood(key)}
                    className={`flex-row items-center p-3 m-1.5 rounded-2xl border ${
                      selected ? "bg-brand/10 border-brand" : "border-border dark:border-[#2D2D44] bg-surface dark:bg-[#1A1A2E]"
                    }`}
                    style={{ width: "47%" }}
                  >
                    <View className={`w-5 h-5 rounded-full border mr-2 items-center justify-center ${selected ? "bg-brand border-brand" : "border-brand bg-white dark:bg-[#1A1A2E]"}`}>
                      {selected && <AntDesign name="check" size={12} color="white" />}
                    </View>
                    <Text className="font-rubik text-text dark:text-white">{t(`auth.food.${key}`)}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      case 3:
        return (
          <View>
            <FormInput label={t("auth.email")} value={email} onChangeText={setEmail} placeholder="seu@email.com" keyboardType="email-address" autoCapitalize="none" />
            <FormInput label={t("auth.password")} value={password} onChangeText={setPassword} placeholder="••••••" secureTextEntry />
            <FormInput label={t("auth.confirmPassword")} value={confirmPassword} onChangeText={setConfirmPassword} placeholder="••••••" secureTextEntry />
            {password !== confirmPassword && password.length > 0 && confirmPassword.length > 0 && (
              <Text className="text-danger font-rubik mb-2">{t("auth.passwordMismatch")}</Text>
            )}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScreenContainer className="bg-surface dark:bg-[#1A1A2E]" edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScreenHeader title={stepTitles[currentStep]} showBack onBack={prevStep} />

        <View className="flex-row justify-center px-6 py-4">
          {[0, 1, 2, 3].map((step) => (
            <View key={step} className={`h-1.5 flex-1 mx-1 rounded-full ${step <= currentStep ? "bg-brand" : "bg-border dark:bg-[#2D2D44]"}`} />
          ))}
        </View>

        <View className="flex-1">
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 16 }}
            keyboardShouldPersistTaps="handled"
          >
            {renderStepContent()}
          </ScrollView>
        </View>

        <View style={{ paddingHorizontal: 24, paddingBottom: 16, paddingTop: 8, zIndex: 1 }}>
          <Button
            label={currentStep === 3 ? t("auth.createAccount") : t("auth.continue")}
            onPress={nextStep}
            disabled={!canProceed()}
          />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
