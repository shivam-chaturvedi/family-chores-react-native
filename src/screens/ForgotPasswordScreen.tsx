import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { theme } from "../theme";

type NavProp = StackNavigationProp<Record<string, object | undefined>>;

export const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const [email, setEmail] = useState("");

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backRow}>
          <Text style={styles.backText}>← Back to Sign In</Text>
        </Pressable>
        <View style={styles.logoWrapper}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>🏠</Text>
            <Text style={styles.logoBadge}>🔐</Text>
          </View>
        </View>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>We'll send you a reset link</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>✉️</Text>
        </View>
        <Text style={styles.heading}>Forgot your password?</Text>
        <Text style={styles.description}>
          Don't worry! Enter your email and we will send you a link to reset your password.
        </Text>

        <View style={styles.inputRow}>
          <Text style={styles.inputIcon}>✉️</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email address"
            placeholderTextColor={theme.colors.mutedForeground}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Send Reset Link</Text>
        </Pressable>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoIcon}>
          <Text style={styles.infoIconText}>🛡️</Text>
        </View>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTitle}>Secure Reset Process</Text>
          <Text style={styles.infoSubtitle}>
            The reset link expires in 24 hours. If you don't see the email, check your spam
            folder or request another link.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#e6edf9",
  },
  content: {
    flexGrow: 1,
    paddingBottom: theme.spacing.lg,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: "center",
  },
  backRow: {
    position: "absolute",
    left: theme.spacing.lg,
    top: theme.spacing.lg,
  },
  backText: {
    color: theme.colors.primaryForeground,
    fontWeight: "600",
    fontSize: 16,
  },
  logoWrapper: {
    marginBottom: theme.spacing.sm,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: theme.colors.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#bdd5ff",
  },
  logoIcon: {
    fontSize: 30,
  },
  logoBadge: {
    position: "absolute",
    right: 8,
    bottom: 6,
    fontSize: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: theme.colors.primaryForeground,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
  },
  card: {
    marginHorizontal: theme.spacing.lg,
    marginTop: -40,
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: "#dfe9f5",
    shadowColor: "#2a4e8c",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 6,
    alignItems: "center",
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#edf3ff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.md,
  },
  icon: {
    fontSize: 28,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: theme.colors.foreground,
    marginBottom: theme.spacing.sm,
  },
  description: {
    fontSize: 14,
    color: theme.colors.mutedForeground,
    textAlign: "center",
    marginBottom: theme.spacing.lg,
    lineHeight: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "#edf3ff",
    paddingHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    width: "100%",
  },
  inputIcon: {
    marginRight: 10,
    fontSize: 18,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: theme.spacing.sm,
    color: theme.colors.foreground,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    width: "100%",
    borderRadius: 16,
    paddingVertical: theme.spacing.md,
    alignItems: "center",
    shadowColor: "#0b1f3c",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 3,
  },
  primaryButtonText: {
    color: theme.colors.primaryForeground,
    fontWeight: "600",
    fontSize: 16,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#dfe9f5",
    borderRadius: 16,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: "#c4d6f6",
  },
  infoIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  infoIconText: {
    fontSize: 22,
    color: theme.colors.primaryForeground,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontWeight: "600",
    color: theme.colors.foreground,
    marginBottom: 4,
  },
  infoSubtitle: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
    lineHeight: 18,
  },
});
