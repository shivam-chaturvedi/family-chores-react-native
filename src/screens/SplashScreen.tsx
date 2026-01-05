import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { theme } from "../theme";

interface SplashScreenProps {
  onContinue: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  return (
    <View style={styles.container}>
      <View style={styles.illustration}>
        <Text style={styles.icon}>🤝</Text>
      </View>
      <Text style={styles.title}>Family Chores</Text>
      <Text style={styles.subtitle}>
        Plan meals, track tasks, store documents, and keep the whole family in sync.
      </Text>
      <Pressable style={styles.button} onPress={onContinue}>
        <Text style={styles.buttonText}>Launch App</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.xl,
  },
  illustration: {
    width: 140,
    height: 140,
    borderRadius: 30,
    backgroundColor: theme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.lg,
  },
  icon: {
    fontSize: 64,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: theme.colors.primaryForeground,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    textAlign: "center",
    color: theme.colors.primaryForeground,
    fontSize: 16,
    marginBottom: theme.spacing.xl,
  },
  button: {
    backgroundColor: theme.colors.card,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: 20,
  },
  buttonText: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
});
