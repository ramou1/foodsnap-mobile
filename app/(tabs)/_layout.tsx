import { Tabs } from "expo-router";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { theme } from "@/constants/theme";
import { useSettings } from "@/contexts/SettingsContext";
import { useTranslation } from "@/hooks/useTranslation";

export default function TabLayout() {
  const { t } = useTranslation();
  const { isDark } = useSettings();

  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          tabBarShowLabel: true,
          tabBarActiveTintColor: theme.brand,
          tabBarInactiveTintColor: theme.muted,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isDark ? "#1A1A2E" : "#fff",
            height: 64,
            elevation: 0,
            shadowOpacity: 0,
            borderTopWidth: 1,
            borderTopColor: isDark ? "#2D2D44" : theme.border,
            paddingBottom: 4,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontFamily: "Rubik-Medium",
            paddingBottom: 2,
          },
        }}
      >
        <Tabs.Screen
          name="feed"
          options={{
            title: t("tabs.feed"),
            tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={21} color={color} />,
          }}
        />
        <Tabs.Screen
          name="trend"
          options={{
            title: t("tabs.trends"),
            tabBarIcon: ({ color }) => <FontAwesome5 name="fire" size={21} color={color} />,
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "",
            tabBarIcon: () => (
              <View
                style={{
                  backgroundColor: theme.brand,
                  borderRadius: 28,
                  width: 56,
                  height: 56,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 22,
                  shadowColor: theme.brand,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.35,
                  shadowRadius: 8,
                  elevation: 6,
                }}
              >
                <Ionicons name="add" size={30} color="#fff" />
              </View>
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              router.push("/posts/create-post");
            },
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: t("tabs.chat"),
            tabBarIcon: ({ color }) => <FontAwesome5 name="comment-dots" size={21} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: t("tabs.profile"),
            tabBarIcon: ({ color }) => <FontAwesome5 name="user" size={21} color={color} />,
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
