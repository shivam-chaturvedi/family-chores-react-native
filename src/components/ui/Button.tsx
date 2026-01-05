import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { theme } from "../../theme";

type ButtonVariant = "primary" | "ghost" | "outline";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  onPress?: () => void;
  style?: object;
}

const sizeMap = {
  sm: { paddingVertical: 6 },
  md: { paddingVertical: 10 },
  lg: { paddingVertical: 14 },
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  onPress,
  style = {},
}) => {
  const variantStyles = {
    primary: [styles.primary, styles.primaryText],
    ghost: [styles.ghost, styles.ghostText],
    outline: [styles.outline, styles.outlineText],
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        sizeMap[size],
        variantStyles[variant][0],
        style,
      ]}
    >
      <Text style={[styles.text, variantStyles[variant][1]]}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.lg,
  },
  text: {
    fontWeight: "600",
    fontSize: 16,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  primaryText: {
    color: theme.colors.primaryForeground,
  },
  ghost: {
    backgroundColor: theme.colors.muted,
  },
  ghostText: {
    color: theme.colors.foreground,
  },
  outline: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
  },
  outlineText: {
    color: theme.colors.foreground,
  },
});
