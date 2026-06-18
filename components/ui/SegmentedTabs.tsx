import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface Tab {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

interface SegmentedTabsProps {
  tabs: Tab[];
  activeKey: string;
  onChange: (key: string) => void;
}

export function SegmentedTabs({ tabs, activeKey, onChange }: SegmentedTabsProps) {
  return (
    <View className="flex-row bg-background rounded-full p-1">
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onChange(tab.key)}
            className={`flex-1 flex-row items-center justify-center py-2.5 px-3 rounded-full ${
              isActive ? "bg-brand" : ""
            }`}
            activeOpacity={0.8}
          >
            {tab.icon}
            <Text
              className={`text-sm font-rubik-medium ${
                isActive ? "text-white" : "text-text-muted"
              } ${tab.icon ? "ml-1.5" : ""}`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
