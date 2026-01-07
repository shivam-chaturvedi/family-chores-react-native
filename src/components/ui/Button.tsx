import { ReactNode } from "react";
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleSheet,
  Text,
} from "react-native";

import { theme } from "../../theme";

export type ButtonVariant = "primary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<PressableProps, "style"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  style?: PressableProps["style"];
}

export const Button = ({
  variant = "primary",
  size = "md",
  style,
  children,
  ...props
}: ButtonProps) => {
  const textStyle = [
    styles.text,
    variant === "ghost" ? styles.textGhost : styles.textPrimary,
    size === "sm" && styles.textSmall,
    size === "lg" && styles.textLarge,
  ];

  const pressableStyle = ({ pressed }: PressableStateCallbackType) => {
    const baseStyles = [
      styles.button,
      variant === "primary" ? styles.primary : styles.ghost,
      size === "sm" ? styles.sm : size === "lg" ? styles.lg : styles.md,
      pressed && variant === "primary" ? styles.primaryPressed : null,
    ];

    const customStyle =
      typeof style === "function" ? style({ pressed }) : style;

    return [...baseStyles, customStyle];
  };

  return (
    <Pressable
      style={pressableStyle}
      android_ripple={{
        color: variant === "primary" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
      }}
      {...props}
    >
      <Text style={textStyle}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  ghost: {
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
  primaryPressed: {
    opacity: 0.85,
  },
  md: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  sm: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
  },
  lg: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  text: {
    fontWeight: "600",
    fontSize: 14,
  },
  textPrimary: {
    color: "#fff",
  },
  textGhost: {
    color: theme.colors.primary,
  },
  textSmall: {
    fontSize: 12,
  },
  textLarge: {
    fontSize: 16,
  },
});
