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

const tabs = ["Overview", "Breakdown", "Insights"];

const budgetTargets = [
  { label: "Groceries", amount: 1250, limit: 10000, icon: "🛒", widthStyle: "progressGroceries" },
  { label: "Utilities", amount: 2400, limit: 5000, icon: "⚡", widthStyle: "progressUtilities" },
  { label: "Food", amount: 850, limit: 8000, icon: "🍽️", widthStyle: "progressFood" },
  { label: "Transport", amount: 450, limit: 6000, icon: "🚗", widthStyle: "progressTransport" },
  { label: "Entertainment", amount: 199, limit: 2000, icon: "🎬", widthStyle: "progressEntertainment" },
];

const insights = [
  "You overspent on groceries by 15% this month",
  "Switch to LED bulbs to save ₹500/month",
  "Great job! You're on track to save ₹15k this month",
  "Your income increased 17% compared to last month",
];

const categorySpending = [
  { label: "Groceries", fillStyle: "barGreen", widthStyle: "barWidthGroceries" },
  { label: "Utilities", fillStyle: "barYellow", widthStyle: "barWidthUtilities" },
  { label: "Food", fillStyle: "barOrange", widthStyle: "barWidthFood" },
  { label: "Transport", fillStyle: "barBlue", widthStyle: "barWidthTransport" },
  { label: "Entertainment", fillStyle: "barPurple", widthStyle: "barWidthEntertainment" },
];

const legendItems = [
  { label: "Income", style: "legendGreen" },
  { label: "Expenses", style: "legendRed" },
];

export const ExpensesScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const { openSidebar } = useSidebar();

  return (
    <>
      <AppLayout>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerRow}>
            <Pressable onPress={openSidebar} style={styles.menuButton}>
              <Text style={styles.menuIcon}>☰</Text>
            </Pressable>
            <View>
              <Text style={styles.title}>Family Finances</Text>
              <Text style={styles.subtitle}>Track income, expenses & budgets</Text>
            </View>
            <Pressable style={styles.addButton}>
              <Text style={styles.addIcon}>＋</Text>
              <Text style={styles.addText}>Add</Text>
            </Pressable>
          </View>

          <View style={styles.tabRow}>
            {tabs.map((tab) => {
              const active = tab === activeTab;
              return (
                <Pressable
                  key={tab}
                  style={[styles.tabPill, active && styles.tabPillActive]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text style={[styles.tabText, active && styles.tabTextActive]}>{tab}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Current Balance</Text>
            <Text style={styles.balanceValue}>₹94,851</Text>
            <View style={styles.metricsRow}>
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>Income</Text>
                <Text style={styles.metricValue}>₹100,000</Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricLabel}>Expenses</Text>
                <Text style={styles.metricValue}>₹5,149</Text>
              </View>
            </View>
          </View>

          <View style={styles.savingsCard}>
            <View style={styles.savingsLeft}>
              <Text style={styles.sectionTitle}>Monthly Savings</Text>
              <Text style={styles.savingsMeta}>94.9% of income</Text>
            </View>
            <Text style={styles.savingsValue}>₹94,851</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, styles.progressFillActive]} />
            </View>
          </View>

          <View style={styles.chartCard}>
            <Text style={styles.sectionTitle}>6-Month Trend</Text>
            <View style={styles.trendChart}>
              <View style={styles.trendHeader}>
                <Text style={styles.axisLabel}>₹100k</Text>
                <Text style={styles.axisLabel}>₹75k</Text>
                <Text style={styles.axisLabel}>₹50k</Text>
                <Text style={styles.axisLabel}>₹25k</Text>
                <Text style={styles.axisLabel}>₹0k</Text>
              </View>
              <View style={styles.trendPlot}>
                <View style={[styles.trendLine, styles.incomeLine]} />
                <View style={[styles.trendLine, styles.expenseLine]} />
                <View style={styles.monthRow}>
                  {["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"].map((month) => (
                    <Text key={month} style={styles.monthLabel}>
                      {month}
                    </Text>
                  ))}
                </View>
              </View>
              <View style={styles.legendRow}>
                {legendItems.map((legend) => (
                  <View key={legend.label} style={styles.legendItem}>
                    <View style={[styles.legendDot, styles[legend.style]]} />
                    <Text>{legend.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.breakdownCard}>
            <Text style={styles.sectionTitle}>Budget vs Actual</Text>
            {budgetTargets.map((item) => (
              <View key={item.label} style={styles.budgetRow}>
                <View style={styles.budgetLabel}>
                  <Text style={styles.budgetIcon}>{item.icon}</Text>
                  <Text style={styles.budgetText}>{item.label}</Text>
                </View>
                <View style={styles.budgetAmount}>
                  <Text style={styles.budgetValue}>₹{item.amount.toLocaleString()}</Text>
                  <Text style={styles.budgetLimit}>/ ₹{item.limit.toLocaleString()}</Text>
                </View>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, styles[item.widthStyle]]} />
                </View>
              </View>
            ))}
          </View>

          <View style={styles.insightsCard}>
            <Text style={styles.sectionTitle}>AI Insights</Text>
            {insights.map((note) => (
              <View key={note} style={styles.insightRow}>
                <Text style={styles.insightText}>{note}</Text>
              </View>
            ))}
          </View>

          <View style={styles.categoryCard}>
            <Text style={styles.sectionTitle}>Category Spending</Text>
            <View style={styles.categoryChart}>
              {categorySpending.map((cat) => (
                <View key={cat.label} style={styles.categoryRow}>
                  <Text style={styles.budgetText}>{cat.label}</Text>
                  <View style={styles.categoryBarBackground}>
                    <View style={[styles.categoryBarFill, styles[cat.fillStyle], styles[cat.widthStyle]]} />
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.tipsCard}>
            <Text style={styles.sectionTitle}>Money Saving Tips</Text>
            <View style={styles.tipRow}>
              <Text>✔️</Text>
              <Text style={styles.tipText}>Set up automatic transfers to savings on payday</Text>
            </View>
            <View style={styles.tipRow}>
              <Text>✔️</Text>
              <Text style={styles.tipText}>Review subscriptions monthly and cancel unused ones</Text>
            </View>
            <View style={styles.tipRow}>
              <Text>✔️</Text>
              <Text style={styles.tipText}>Use the 24-hour rule before making impulse purchases</Text>
            </View>
            <View style={styles.tipRow}>
              <Text>✔️</Text>
              <Text style={styles.tipText}>Plan meals weekly to reduce food waste and dining out</Text>
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
  menuButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: theme.colors.card,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  menuIcon: {
    fontSize: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: theme.colors.foreground,
    marginLeft: theme.spacing.md,
  },
  subtitle: {
    color: theme.colors.mutedForeground,
    fontSize: 14,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: 18,
    justifyContent: "center",
    gap: theme.spacing.xs,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  addIcon: {
    fontSize: 20,
    color: theme.colors.primaryForeground,
  },
  addText: {
    color: theme.colors.primaryForeground,
    fontWeight: "700",
  },
  tabRow: {
    flexDirection: "row",
    backgroundColor: theme.colors.muted,
    borderRadius: 20,
    padding: 4,
    marginBottom: theme.spacing.md,
  },
  tabPill: {
    flex: 1,
    alignItems: "center",
    borderRadius: 16,
    paddingVertical: theme.spacing.md,
  },
  tabPillActive: {
    backgroundColor: theme.colors.card,
  },
  tabText: {
    fontWeight: "600",
    color: theme.colors.mutedForeground,
  },
  tabTextActive: {
    color: theme.colors.foreground,
  },
  balanceCard: {
    borderRadius: 24,
    padding: theme.spacing.lg,
    backgroundColor: "#0c2b5f",
    marginBottom: theme.spacing.md,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  balanceLabel: {
    color: "#b9cee7",
    marginBottom: theme.spacing.xs,
  },
  balanceValue: {
    color: theme.colors.primaryForeground,
    fontSize: 32,
    fontWeight: "700",
  },
  metricsRow: {
    flexDirection: "row",
    marginTop: theme.spacing.md,
    gap: theme.spacing.md,
  },
  metric: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,
    padding: theme.spacing.md,
  },
  metricLabel: {
    color: "#c8d6f0",
  },
  metricValue: {
    color: theme.colors.primaryForeground,
    fontSize: 20,
    fontWeight: "700",
  },
  savingsCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  savingsLeft: {
    marginBottom: theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: theme.spacing.xs,
    color: theme.colors.foreground,
  },
  savingsMeta: {
    color: theme.colors.mutedForeground,
  },
  savingsValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#299b4c",
    marginBottom: theme.spacing.sm,
  },
  progressBar: {
    width: "100%",
    height: 10,
    backgroundColor: theme.colors.muted,
    borderRadius: 6,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#299b4c",
  },
  chartCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  trendChart: {
    marginTop: theme.spacing.sm,
  },
  trendHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  axisLabel: {
    fontSize: 10,
    color: theme.colors.mutedForeground,
  },
  trendPlot: {
    height: 160,
    marginTop: theme.spacing.sm,
    backgroundColor: "#f5f8ff",
    borderRadius: 16,
    padding: theme.spacing.sm,
    position: "relative",
    overflow: "hidden",
  },
  trendLine: {
    position: "absolute",
    left: 20,
    right: 20,
    height: 2,
    borderRadius: 4,
  },
  incomeLine: {
    top: 30,
    backgroundColor: "#34a853",
  },
  expenseLine: {
    top: 100,
    backgroundColor: "#ea4335",
  },
  monthRow: {
    position: "absolute",
    bottom: theme.spacing.sm,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  monthLabel: {
    color: theme.colors.mutedForeground,
    fontSize: 12,
  },
  legendRow: {
    flexDirection: "row",
    marginTop: theme.spacing.sm,
    justifyContent: "flex-start",
    gap: theme.spacing.lg,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendGreen: {
    backgroundColor: "#34a853",
  },
  legendRed: {
    backgroundColor: "#ea4335",
  },
  breakdownCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  budgetRow: {
    marginBottom: theme.spacing.sm,
  },
  budgetLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.xs,
  },
  budgetIcon: {
    marginRight: theme.spacing.sm,
    fontSize: 18,
  },
  budgetText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.foreground,
  },
  budgetAmount: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  budgetValue: {
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  budgetLimit: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
    marginLeft: theme.spacing.xs,
  },
  barBackground: {
    height: 8,
    backgroundColor: theme.colors.muted,
    borderRadius: 4,
    marginTop: theme.spacing.xs,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
  },
  progressFillActive: {
    width: "94%",
    backgroundColor: theme.colors.primary,
  },
  progressGroceries: {
    width: "13%",
  },
  progressUtilities: {
    width: "48%",
  },
  progressFood: {
    width: "11%",
  },
  progressTransport: {
    width: "8%",
  },
  progressEntertainment: {
    width: "10%",
  },
  barGreen: {
    backgroundColor: "#34a853",
  },
  barYellow: {
    backgroundColor: "#fbbc05",
  },
  barOrange: {
    backgroundColor: "#ff7b00",
  },
  barBlue: {
    backgroundColor: "#4285f4",
  },
  barPurple: {
    backgroundColor: "#8a64e5",
  },
  insightsCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  insightRow: {
    backgroundColor: "#f0f4ff",
    borderRadius: 16,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  insightText: {
    color: theme.colors.foreground,
  },
  categoryCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  categoryChart: {
    marginTop: theme.spacing.md,
  },
  categoryBarBackground: {
    flex: 1,
    height: 10,
    backgroundColor: "#e5e9f2",
    borderRadius: 5,
  },
  categoryBarFill: {
    height: "100%",
    borderRadius: 5,
  },
  tipsCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  tipRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  tipText: {
    color: theme.colors.foreground,
  },
});
