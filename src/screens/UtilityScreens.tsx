import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppLayout } from "../components/layout/AppLayout";
import { theme } from "../theme";

const createUtilityScreen = (title: string, subtitle?: string) => () => (
  <AppLayout>
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  </AppLayout>
);

export const DocumentsScreen = createUtilityScreen("Documents", "Store and organize family documents");
export const ExpensesScreen = createUtilityScreen("Expenses", "Track bills and budgets");
export const FamilyScreen = createUtilityScreen("Family", "Manage members and profiles");
export const NotificationsScreen = createUtilityScreen("Notifications", "Configure alert settings");
export const PrivacyScreen = createUtilityScreen("Privacy", "Privacy and security preferences");
export const ThemeScreen = createUtilityScreen("Theme", "Light and dark mode controls");
export const ExportScreen = createUtilityScreen("Export", "Download your family data");
export const HelpScreen = createUtilityScreen("Help", "Frequently asked questions");
export const ForgotPasswordScreen = createUtilityScreen("Forgot Password", "Reset your account password");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.foreground,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    color: theme.colors.mutedForeground,
    fontSize: 14,
    textAlign: "center",
  },
});
