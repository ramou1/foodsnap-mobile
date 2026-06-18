import React from "react";
import { Pressable, Text, ActivityIndicator, PressableProps, Platform } from "react-native";

type Variant = "primary" | "secondary" | "outline" | "danger" | "ghost";

interface ButtonProps extends PressableProps {
  label: string;
  variant?: Variant;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const variants: Record<Variant, { container: string; text: string }> = {
  primary: { container: "bg-brand", text: "text-white" },
  secondary: { container: "bg-brand/10", text: "text-brand" },
  outline: { container: "bg-white dark:bg-[#1A1A2E] border border-border dark:border-[#2D2D44]", text: "text-text dark:text-white" },
  danger: { container: "bg-danger", text: "text-white" },
  ghost: { container: "bg-transparent", text: "text-brand" },
};

export function Button({
  label,
  variant = "primary",
  loading = false,
  icon,
  disabled,
  className = "",
  onPress,
  ...props
}: ButtonProps) {
  const v = variants[variant];
  const isDisabled = Boolean(disabled || loading);

  return (
    <Pressable
      className={`h-12 rounded-2xl flex-row items-center justify-center px-6 ${v.container} ${
        isDisabled ? "opacity-50" : ""
      } ${className}`}
      disabled={isDisabled}
      onPress={onPress}
      style={Platform.OS === "web" && !isDisabled ? { cursor: "pointer" } : undefined}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" ? "#6e11b0" : "#fff"} />
      ) : (
        <>
          {icon}
          <Text className={`font-rubik-semibold text-base ${v.text} ${icon ? "ml-2" : ""}`}>
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}
