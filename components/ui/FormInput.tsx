import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";

interface FormInputProps extends TextInputProps {
  label?: string;
  error?: string;
  className?: string;
}

export function FormInput({ label, error, className = "", ...props }: FormInputProps) {
  return (
    <View className="mb-4">
      {label && (
        <Text className="text-sm font-rubik-medium text-text-muted dark:text-gray-400 mb-2">{label}</Text>
      )}
      <TextInput
        className={`w-full h-12 bg-background dark:bg-[#0F0F1A] border border-border dark:border-[#2D2D44] rounded-2xl px-4 text-base text-text dark:text-white font-rubik ${className}`}
        placeholderTextColor="#9C96AD"
        {...props}
      />
      {error && <Text className="text-danger text-sm mt-1">{error}</Text>}
    </View>
  );
}
