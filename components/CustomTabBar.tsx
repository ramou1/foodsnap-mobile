import React from "react";
import { View, Pressable, Text, StyleSheet, Platform } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "@/constants/theme";
import { useSettings } from "@/contexts/SettingsContext";
import { useTranslation } from "@/hooks/useTranslation";

const TAB_ICONS: Record<string, { family: "fa5" | "ion"; name: string }> = {
  feed: { family: "fa5", name: "home" },
  trend: { family: "fa5", name: "fire" },
  chat: { family: "fa5", name: "comment-dots" },
  profile: { family: "fa5", name: "user" },
};

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { isDark } = useSettings();
  const { t } = useTranslation();

  const labels: Record<string, string> = {
    feed: t("tabs.feed"),
    trend: t("tabs.trends"),
    chat: t("tabs.chat"),
    profile: t("tabs.profile"),
  };

  const navigateToTab = (routeName: string, routeKey: string, isFocused: boolean) => {
    if (routeName === "create") {
      router.push("/posts/create-post");
      return;
    }

    const event = navigation.emit({
      type: "tabPress",
      target: routeKey,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? "#1A1A2E" : "#fff",
          borderTopColor: isDark ? "#2D2D44" : theme.border,
          paddingBottom: Math.max(insets.bottom, 4),
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const icon = TAB_ICONS[route.name];

        if (route.name === "create") {
          return (
            <Pressable
              key={route.key}
              onPress={() => navigateToTab("create", route.key, isFocused)}
              style={styles.createTab}
              accessibilityRole="button"
              accessibilityLabel="Criar post"
            >
              <View style={styles.createButton}>
                <Ionicons name="add" size={28} color="#fff" />
              </View>
            </Pressable>
          );
        }

        const color = isFocused ? theme.brand : theme.muted;

        return (
          <Pressable
            key={route.key}
            onPress={() => navigateToTab(route.name, route.key, isFocused)}
            style={styles.tab}
            accessibilityRole="button"
            accessibilityState={{ selected: isFocused }}
          >
            {icon?.family === "fa5" ? (
              <FontAwesome5 name={icon.name as "home"} size={21} color={color} />
            ) : (
              <Ionicons name={icon?.name as "home"} size={21} color={color} />
            )}
            <Text style={[styles.label, { color }]}>{labels[route.name] ?? route.name}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    minHeight: 64,
    borderTopWidth: 1,
    ...Platform.select({
      web: {
        position: "relative",
        zIndex: 1000,
      },
      default: {},
    }),
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
    paddingBottom: 4,
    minHeight: 56,
  },
  label: {
    fontSize: 11,
    fontFamily: "Rubik-Medium",
    marginTop: 4,
  },
  createTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 6,
    minHeight: 56,
  },
  createButton: {
    backgroundColor: theme.brand,
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
    shadowColor: theme.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
});
