import React from "react";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import "../global.css";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import { AppWrapper } from "@/components/AppWrapper";

export default function RootLayout() {
  const router = useRouter();
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) return null;

  return (
    <AppWrapper>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            headerTitle: "FoodSnap",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => router.push("/posts/create-post")}
                style={{ marginRight: 15 }}
              >
                <Ionicons name="camera" size={24} color="#FF6B6B" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="posts/[id]"
          options={{
            headerShown: false,
            presentation: "card",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="users/[id]"
          options={{
            headerShown: false,
            presentation: "card",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="chat/[id]"
          options={{
            headerShown: false,
            presentation: "card",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="create-post"
          options={{
            headerTitle: "nova publicação",
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
      </Stack>
    </AppWrapper>
  );
}