import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { AppLayout } from "../components/layout/AppLayout";
import { theme } from "../theme";
import { useSidebar } from "../contexts/SidebarContext";

const exportFormats = [
  { label: "JSON", description: "Full data export", size: "~2.4 MB" },
  { label: "CSV", description: "Spreadsheet compatible", size: "~1.8 MB" },
  { label: "Cloud Backup", description: "Secure cloud storage", size: "Automatic" },
];

const dataOptions = [
  { label: "Calendar Events", items: 156, selected: true },
  { label: "Tasks & Chores", items: 89, selected: true },
  { label: "Shopping Lists", items: 234, selected: true },
  { label: "Recipes", items: 45, selected: true },
  { label: "Documents", items: 58, selected: false },
  { label: "Expenses", items: 312, selected: true },
];

export const DataExportScreen: React.FC = () => {
  const [format, setFormat] = useState("JSON");
  const { openSidebar } = useSidebar();
  const [selectedData, setSelectedData] = useState(
    dataOptions.filter((option) => option.selected).map((option) => option.label)
  );

  const toggleData = (label: string) => {
    setSelectedData((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  return (
    <>
      <AppLayout>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerRow}>
            <Pressable onPress={openSidebar} style={styles.backButton}>
              <Text style={styles.backIcon}>‹</Text>
            </Pressable>
            <Text style={styles.title}>Data Export</Text>
          </View>

          <View style={styles.heroCard}>
            <View style={styles.heroIcon}>
              <Text style={styles.iconText}>⬇️</Text>
            </View>
            <View>
              <Text style={styles.heroTitle}>Backup Your Data</Text>
              <Text style={styles.heroSubtitle}>Export all your family data securely</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Export Format</Text>
          {exportFormats.map((option) => (
            <Pressable
              key={option.label}
              style={[styles.optionCard, format === option.label && styles.optionActive]}
              onPress={() => setFormat(option.label)}
            >
              <View style={styles.optionIcon}>
                <Text style={styles.iconText}>📄</Text>
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionLabel}>{option.label}</Text>
                <Text style={styles.optionSubtitle}>{option.description}</Text>
              </View>
              <Text style={styles.optionSize}>{option.size}</Text>
              {format === option.label && <Text style={styles.checkMark}>✓</Text>}
            </Pressable>
          ))}

          <Text style={styles.sectionTitle}>Select Data</Text>
          <View style={styles.dataCard}>
            {dataOptions.map((option) => (
              <Pressable
                key={option.label}
                style={styles.dataRow}
                onPress={() => toggleData(option.label)}
              >
                <View style={[styles.checkbox, selectedData.includes(option.label) && styles.checkboxActive]}>
                  {selectedData.includes(option.label) && <Text style={styles.checkMark}>✓</Text>}
                </View>
                <View style={styles.dataText}>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                </View>
                <Text style={styles.optionSubtitle}>{option.items} items</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.lastBackup}>
            <Text style={styles.optionLabel}>Last Backup</Text>
            <Text style={styles.optionSubtitle}>December 28, 2025 at 3:45 PM</Text>
            <Text style={styles.backupStatus}>✓ Up to date</Text>
          </View>

          <Pressable style={styles.exportButton}>
            <Text style={styles.exportText}>Export Data</Text>
          </Pressable>
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
    marginBottom: theme.spacing.sm,
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
  heroCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0c2b5f",
    borderRadius: 24,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.primaryForeground,
  },
  heroSubtitle: {
    color: "#a9c6ff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.foreground,
    marginBottom: theme.spacing.sm,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 2,
    borderColor: "transparent",
  },
  optionActive: {
    borderColor: theme.colors.primary,
  },
  optionIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: theme.colors.muted,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  optionText: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  optionSubtitle: {
    color: theme.colors.mutedForeground,
    fontSize: 12,
  },
  optionSize: {
    color: theme.colors.mutedForeground,
    marginRight: theme.spacing.sm,
  },
  checkMark: {
    color: theme.colors.primary,
    fontSize: 18,
  },
  dataCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: theme.spacing.md,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  dataRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.colors.muted,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  checkboxActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  dataText: {
    flex: 1,
  },
  lastBackup: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  backupStatus: {
    marginTop: theme.spacing.xs,
    color: "#2ece4a",
    fontWeight: "600",
  },
  exportButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    paddingVertical: theme.spacing.lg,
    alignItems: "center",
  },
  exportText: {
    color: theme.colors.primaryForeground,
    fontWeight: "700",
    fontSize: 18,
  },
});
