import React, { useEffect } from "react";
import { View, Text, StyleSheet, Pressable, StatusBar } from "react-native";
import { theme } from "../theme";

interface SplashScreenProps {
  onContinue: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  useEffect(() => {
    const timer = setTimeout(onContinue, 2000);
    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.hero}>
        <View style={styles.logoWrapper}>
          <Text style={styles.logoIcon}>🏠</Text>
          <Text style={styles.logoBadge}>✓</Text>
        </View>
        <Text style={styles.title}>Family Chores</Text>
        <Text style={styles.subtitle}>One app for your entire family</Text>
        <Pressable style={styles.primaryButton} onPress={onContinue}>
          <Text style={styles.buttonText}>Family Calendar</Text>
        </Pressable>
        <View style={styles.dotRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={[styles.dot, styles.dotInactive]} />
          <View style={styles.dot} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c2a48",
    alignItems: "center",
    justifyContent: "center",
  },
  hero: {
    width: "100%",
    flex: 1,
    backgroundColor: "#0b2f58",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  logoWrapper: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: theme.colors.card,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.lg,
    position: "relative",
    elevation: 8,
  },
  logoIcon: {
    fontSize: 40,
  },
  logoBadge: {
    position: "absolute",
    bottom: -6,
    right: -6,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#38b44a",
    color: "#fff",
    textAlign: "center",
    lineHeight: 28,
    fontWeight: "600",
  },
  title: {
    marginTop: theme.spacing.sm,
    fontSize: 32,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
    marginBottom: theme.spacing.md,
    textAlign: "center",
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 999,
    marginBottom: theme.spacing.lg,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  dotRow: {
    flexDirection: "row",
    marginTop: theme.spacing.md,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: "#ffffff",
  },
  dotInactive: {
    backgroundColor: "rgba(255,255,255,0.25)",
  },
});
