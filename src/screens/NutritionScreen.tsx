import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AppLayout } from "../components/layout/AppLayout";
import { theme } from "../theme";
import { Button } from "../components/ui/Button";

const suggestions = [
  { title: "Hydration", detail: "Drink 2L water today", icon: "💧" },
  { title: "Protein Boost", detail: "Add 200g paneer/chicken", icon: "🥩" },
  { title: "Fiber", detail: "Include whole grains", icon: "🌾" },
];

export const NutritionScreen: React.FC = () => {
  return (
    <AppLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Nutrition Insights</Text>
          <Button variant="ghost" size="sm">
            Weekly Report
          </Button>
        </View>

        {suggestions.map((item) => (
          <View key={item.title} style={styles.card}>
            <Text style={styles.icon}>{item.icon}</Text>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.detail}</Text>
            </View>
          </View>
        ))}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Macros</Text>
          <View style={styles.macroRow}>
            <Text style={styles.macroLabel}>Protein</Text>
            <Text style={styles.macroValue}>120g</Text>
          </View>
          <View style={styles.macroRow}>
            <Text style={styles.macroLabel}>Carbs</Text>
            <Text style={styles.macroValue}>210g</Text>
          </View>
          <View style={styles.macroRow}>
            <Text style={styles.macroLabel}>Fats</Text>
            <Text style={styles.macroValue}>65g</Text>
          </View>
        </View>
      </ScrollView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  icon: {
    fontSize: 32,
    marginRight: theme.spacing.md,
  },
  cardBody: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  cardSubtitle: {
    color: theme.colors.mutedForeground,
    fontSize: 14,
  },
  section: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: theme.spacing.sm,
  },
  macroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.sm,
  },
  macroLabel: {
    color: theme.colors.mutedForeground,
  },
  macroValue: {
    fontWeight: "600",
  },
});
