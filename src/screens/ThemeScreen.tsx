import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { AppLayout } from "../components/layout/AppLayout";
import { theme } from "../theme";
import { useSidebar } from "../contexts/SidebarContext";

const appearanceOptions = [
  { label: "Light", icon: "☀️" },
  { label: "Dark", icon: "🌙" },
  { label: "System", icon: "📱" },
];

const accentColors = [
  { label: "Ocean Blue", color: "#1f4c85" },
  { label: "Forest Green", color: "#1c9b5f" },
  { label: "Royal Purple", color: "#7d4dd1" },
  { label: "Sunset Orange", color: "#ff7a1a" },
  { label: "Rose Pink", color: "#dd2b7f" },
  { label: "Tropical Teal", color: "#12b0b3" },
];

export const ThemeScreen: React.FC = () => {
  const [appearance, setAppearance] = useState("Dark");
  const [accent, setAccent] = useState(accentColors[0]);
  const [textSize] = useState(0.6);
  const { openSidebar } = useSidebar();

  return (
    <>
      <AppLayout>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerRow}>
            <Pressable onPress={openSidebar} style={styles.backButton}>
              <Text style={styles.backIcon}>‹</Text>
            </Pressable>
            <Text style={styles.title}>Theme</Text>
          </View>

          <View style={styles.personalizeCard}>
            <View style={styles.personalizeIcon}>
              <Text style={styles.iconText}>🎨</Text>
            </View>
            <View>
              <Text style={styles.personalizeTitle}>Personalize</Text>
              <Text style={styles.personalizeSubtitle}>Make Family Chores yours</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.appearanceRow}>
            {appearanceOptions.map((option) => (
              <Pressable
                key={option.label}
                style={[
                  styles.appearanceCard,
                  appearance === option.label && styles.appearanceActive,
                ]}
                onPress={() => setAppearance(option.label)}
              >
                <View style={styles.appearanceIcon}>
                  <Text style={styles.iconText}>{option.icon}</Text>
                </View>
                <Text style={styles.cardLabel}>{option.label}</Text>
                {appearance === option.label && <Text style={styles.checkMark}>✓</Text>}
              </Pressable>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Accent Color</Text>
          <View style={styles.accentCard}>
            {accentColors.map((colorOption) => (
              <Pressable
                key={colorOption.label}
                style={[
                  styles.accentDot,
                  { backgroundColor: colorOption.color },
                  accent.color === colorOption.color && styles.accentActive,
                ]}
                onPress={() => setAccent(colorOption)}
              >
                {accent.color === colorOption.color && (
                  <Text style={styles.accentCheck}>✓</Text>
                )}
              </Pressable>
            ))}
            <Text style={styles.accentLabel}>{accent.label}</Text>
          </View>

          <Text style={styles.sectionTitle}>Text Size</Text>
          <View style={styles.sliderRow}>
            <Text style={styles.sliderLabel}>A</Text>
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderThumb, { left: `${textSize * 100}%` }]} />
            </View>
            <Text style={styles.sliderLabel}>A</Text>
          </View>

          <Text style={styles.sectionTitle}>Preview</Text>
          <View style={styles.previewCard}>
            <View style={styles.previewIcon}>
              <Text style={styles.iconText}>😃</Text>
            </View>
            <View style={styles.previewText}>
              <Text style={styles.previewTitle}>Sample Task</Text>
              <Text style={styles.previewSub}>Due today</Text>
              <View style={styles.previewTags}>
                <View style={[styles.tag, styles.tagHigh]}>
                  <Text style={styles.tagText}>High Priority</Text>
                </View>
                <View style={[styles.tag, styles.tagComplete]}>
                  <Text style={styles.tagText}>Completed</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </AppLayout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: 120,
    backgroundColor: theme.colors.background,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: theme.colors.card,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  backIcon: {
    fontSize: 26,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  personalizeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#14295b",
    borderRadius: 24,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },
  personalizeIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  iconText: {
    fontSize: 24,
  },
  personalizeTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.primaryForeground,
  },
  personalizeSubtitle: {
    color: "#a9c6ff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.foreground,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  appearanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  appearanceCard: {
    flex: 1,
    alignItems: "center",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    marginRight: theme.spacing.sm,
    borderWidth: 2,
    borderColor: "transparent",
  },
  appearanceActive: {
    borderColor: theme.colors.primary,
  },
  appearanceIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: theme.colors.muted,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  checkMark: {
    marginTop: theme.spacing.sm,
    color: theme.colors.primary,
    fontSize: 18,
  },
  accentCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  accentDot: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  accentActive: {
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },
  accentLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.foreground,
  },
  sliderRow: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: theme.spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  sliderLabel: {
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  sliderTrack: {
    flex: 1,
    height: 12,
    backgroundColor: theme.colors.muted,
    borderRadius: 6,
    position: "relative",
  },
  sliderThumb: {
    position: "absolute",
    top: -6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
  },
  previewCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  previewIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: theme.colors.muted,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  previewText: {
    flex: 1,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  previewSub: {
    color: theme.colors.mutedForeground,
    marginBottom: theme.spacing.sm,
  },
  previewTags: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  tag: {
    borderRadius: 12,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 4,
  },
  tagHigh: {
    backgroundColor: "#dfe8ff",
  },
  tagComplete: {
    backgroundColor: "#d7f2d5",
  },
  tagText: {
    color: theme.colors.foreground,
    fontWeight: "600",
  },
});
