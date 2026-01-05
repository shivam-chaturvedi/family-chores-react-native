import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import { theme } from "../theme";

interface AuthScreenProps {
  onAuthenticated: () => void;
  onForgotPassword?: () => void;
  onPrivacy?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onAuthenticated,
  onForgotPassword,
  onPrivacy,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    onAuthenticated();
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <View style={styles.logoWrapper}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🏠</Text>
            <Text style={styles.logoShield}>🔰</Text>
          </View>
        </View>
        <Text style={styles.title}>Family Chores</Text>
        <Text style={styles.subtitle}>Organize Your Family Life</Text>
      </View>

      <View style={styles.formWrapper}>
        <View style={styles.tabs}>
          <Pressable
            onPress={() => setIsLogin(true)}
            style={[
              styles.tab,
              isLogin ? styles.tabActive : styles.tabInactive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                isLogin ? styles.tabTextActive : styles.tabTextInactive,
              ]}
            >
              Sign In
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setIsLogin(false)}
            style={[
              styles.tab,
              !isLogin ? styles.tabActive : styles.tabInactive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                !isLogin ? styles.tabTextActive : styles.tabTextInactive,
              ]}
            >
              Sign Up
            </Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          {!isLogin && (
            <View style={styles.inputRow}>
              <Text style={styles.inputIcon}>👤</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Full Name"
                placeholderTextColor={theme.colors.mutedForeground}
                value={formData.name}
                onChangeText={(value) =>
                  setFormData((prev) => ({ ...prev, name: value }))
                }
              />
            </View>
          )}

          <View style={styles.inputRow}>
            <Text style={styles.inputIcon}>✉️</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Email Address"
              placeholderTextColor={theme.colors.mutedForeground}
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(value) =>
                setFormData((prev) => ({ ...prev, email: value }))
              }
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Shared Password"
              placeholderTextColor={theme.colors.mutedForeground}
              secureTextEntry={!showPassword}
              value={formData.password}
              onChangeText={(value) =>
                setFormData((prev) => ({ ...prev, password: value }))
              }
            />
            <Pressable
              onPress={() => setShowPassword((prev) => !prev)}
              style={styles.eyeButton}
            >
              <Text style={styles.eyeText}>{showPassword ? "👁️" : "🙈"}</Text>
            </Pressable>
          </View>

          {isLogin && (
            <Pressable
              onPress={() => onForgotPassword?.()}
              style={styles.forgotButton}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </Pressable>
          )}

          <Pressable style={styles.primaryButton} onPress={handleSubmit}>
            <Text style={styles.primaryButtonText}>
              {isLogin ? "Sign In" : "Create Account"}
            </Text>
          </Pressable>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.line} />
          </View>

          <Pressable style={styles.outlineButton}>
            <View style={styles.googleIcon}>
              <Text style={styles.googleIconText}>G</Text>
            </View>
            <Text style={styles.outlineButtonText}>Continue with Google</Text>
          </Pressable>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Text style={styles.infoIconText}>🔐</Text>
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>One Account, Multiple Profiles</Text>
            <Text style={styles.infoSubtitle}>
              Add family members after signing in. Each member gets their own
              profile with personal vault, calendar events, and shared lists.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By continuing, you agree to our{" "}
          <Text style={styles.linkText}>Terms of Service</Text> and{" "}
          <Text style={styles.linkText} onPress={() => onPrivacy?.()}>
            Privacy Policy
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  screenContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: "center",
    justifyContent: "center",
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
    borderColor: theme.colors.primaryLight,
  },
  logoEmoji: {
    fontSize: 30,
  },
  logoShield: {
    position: "absolute",
    right: 8,
    bottom: 6,
    fontSize: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: theme.colors.primaryForeground,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  formWrapper: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: theme.colors.muted,
    borderRadius: 16,
    padding: 4,
    marginBottom: theme.spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    borderRadius: 12,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: theme.colors.card,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  tabInactive: {},
  tabText: {
    fontWeight: "600",
    fontSize: 14,
  },
  tabTextActive: {
    color: theme.colors.foreground,
  },
  tabTextInactive: {
    color: theme.colors.mutedForeground,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 14,
    paddingHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.muted,
  },
  inputIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: theme.colors.foreground,
  },
  eyeButton: {
    marginLeft: 4,
  },
  eyeText: {
    fontSize: 18,
    color: theme.colors.mutedForeground,
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginBottom: theme.spacing.sm,
  },
  forgotText: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: 16,
    alignItems: "center",
    marginTop: theme.spacing.sm,
  },
  primaryButtonText: {
    color: theme.colors.primaryForeground,
    fontWeight: "600",
    fontSize: 16,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: theme.spacing.md,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  dividerText: {
    marginHorizontal: 8,
    color: theme.colors.mutedForeground,
    fontSize: 12,
  },
  outlineButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 16,
    paddingVertical: theme.spacing.sm,
    justifyContent: "center",
    backgroundColor: theme.colors.card,
  },
  googleIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.sm,
  },
  googleIconText: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  outlineButtonText: {
    fontWeight: "600",
    color: theme.colors.foreground,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: theme.colors.primaryLight,
    borderRadius: 16,
    padding: theme.spacing.md,
    marginTop: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  infoIconText: {
    fontSize: 20,
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
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  footerText: {
    textAlign: "center",
    color: theme.colors.mutedForeground,
    fontSize: 12,
  },
  linkText: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
});
