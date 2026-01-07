import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import { AppLayout } from "../components/layout/AppLayout";
import { theme } from "../theme";
import { useSidebar } from "../contexts/SidebarContext";

const featureGuides = [
  {
    id: "home",
    icon: "🏠",
    title: "Home Dashboard",
    description: "Your central hub for managing family activities.",
    howToUse: [
      "View today's overview with weather and date",
      "See upcoming events and tasks at a glance",
      "Use quick action buttons to add events, tasks, or items",
    ],
    tips: ["Check the dashboard daily for updates", "Use quick actions for faster task creation"],
  },
  {
    id: "calendar",
    icon: "🗓️",
    title: "Family Calendar",
    description: "Shared calendar for events, appointments, and activities.",
    howToUse: [
      "Tap + to add a new event",
      "Select a date to view events for that day",
      "Set reminders for important events",
    ],
    tips: ["Assign events to family members", "Set recurring events for regular activities"],
  },
  {
    id: "tasks",
    icon: "✅",
    title: "Tasks & Chores",
    description: "Manage household chores and assignments.",
    howToUse: [
      "Tap + to create a task",
      "Assign to family members and set due dates",
      "Check off tasks when completed",
    ],
    tips: ["Create recurring tasks for weekly chores", "Use chore rotation for fairness"],
  },
  {
    id: "lists",
    icon: "🛒",
    title: "Shopping Lists",
    description: "Create and share categorized shopping lists.",
    howToUse: [
      "Tap + to add list items",
      "Drag to reorder by priority",
      "Check off items while shopping",
    ],
    tips: ["Add quantity and notes", "Create lists per store"],
  },
];

const faqItems = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "How do I set up my family account?",
        a: "Go through onboarding to add family name and invite members. You can also do it later in Settings → Family Members.",
      },
      {
        q: "Can I use the app on multiple devices?",
        a: "Yes! Sign in with the same account on each device and data syncs automatically.",
      },
    ],
  },
  {
    category: "Calendar & Events",
    questions: [
      {
        q: "How do I add a recurring event?",
        a: "When creating an event, enable Repeat and choose the frequency (Daily, Weekly, Monthly, or Custom).",
      },
      {
        q: "Can I assign events to family members?",
        a: "Yes, each event can be assigned to one or more family members and will use their color on the calendar.",
      },
    ],
  },
];

const quickTips = [
  "Use quick actions for adding tasks/events",
  "Enable reminders to stay notified",
  "Mark recurring tasks for weekly chores",
  "Share lists with everyone instantly",
];

export const HelpScreen: React.FC = () => {
  const { openSidebar } = useSidebar();
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"features" | "faq">("features");

  const filteredFeatures = useMemo(
    () =>
      featureGuides.filter(
        (feature) =>
          feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          feature.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  const filteredFaqs = useMemo(
    () =>
      faqItems.map((category) => ({
        ...category,
        questions: category.questions.filter(
          (faq) =>
            faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.a.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })),
    [searchQuery]
  ).filter((category) => category.questions.length > 0);

  return (
    <>
      <AppLayout showNav={false}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerRow}>
            <Pressable onPress={openSidebar} style={styles.backButton}>
              <Text style={styles.backIcon}>‹</Text>
            </Pressable>
            <View>
              <Text style={styles.title}>Help & Support</Text>
              <Text style={styles.subtitle}>Learn how to use every feature</Text>
            </View>
          </View>

          <View style={styles.heroCard}>
            <View style={styles.heroIcon}>
              <Text style={styles.heroIconText}>📖</Text>
            </View>
            <View>
              <Text style={styles.heroTitle}>Complete User Guide</Text>
              <Text style={styles.heroSubtitle}>Everything you need to manage your family</Text>
            </View>
          </View>

          <Pressable style={styles.tutorialCard}>
            <Text style={styles.tutorialTitle}>Watch Tutorial Again</Text>
            <Text style={styles.tutorialSubtitle}>Step-by-step walkthrough of all features</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>

          <TextInput
            style={styles.searchInput}
            placeholder="Search features or questions..."
            placeholderTextColor={theme.colors.mutedForeground}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <View style={styles.tabRow}>
            <Pressable
              style={[styles.tabPill, activeTab === "features" && styles.tabActive]}
              onPress={() => setActiveTab("features")}
            >
              <Text style={[styles.tabText, activeTab === "features" && styles.tabTextActive]}>
                📚 Feature Guide
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tabPill, activeTab === "faq" && styles.tabActive]}
              onPress={() => setActiveTab("faq")}
            >
              <Text style={[styles.tabText, activeTab === "faq" && styles.tabTextActive]}>❓ FAQ</Text>
            </Pressable>
          </View>

          {activeTab === "features" && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Tap any feature to learn how to use it</Text>
              {filteredFeatures.map((feature) => (
                <View key={feature.id} style={styles.featureCard}>
                  <Pressable
                    onPress={() =>
                      setExpandedFeature((prev) => (prev === feature.id ? null : feature.id))
                    }
                    style={styles.featureHeader}
                  >
                    <View style={styles.featureIcon}>
                      <Text style={styles.iconText}>{feature.icon}</Text>
                    </View>
                    <View style={styles.featureText}>
                      <Text style={styles.featureTitle}>{feature.title}</Text>
                      <Text style={styles.featureSubtitle}>{feature.description}</Text>
                    </View>
                    <Text style={styles.chevron}>
                      {expandedFeature === feature.id ? "▲" : "▼"}
                    </Text>
                  </Pressable>
                  {expandedFeature === feature.id && (
                    <View style={styles.accordionContent}>
                      <Text style={styles.accordionLabel}>How to Use</Text>
                      {feature.howToUse.map((step, index) => (
                        <Text key={index} style={styles.accordionText}>
                          {index + 1}. {step}
                        </Text>
                      ))}
                      <Text style={[styles.accordionLabel, { marginTop: theme.spacing.md }]}>
                        Pro Tips
                      </Text>
                      {feature.tips.map((tip, index) => (
                        <Text key={index} style={styles.accordionText}>
                          • {tip}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {activeTab === "faq" && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Find answers to common questions</Text>
              {filteredFaqs.map((category) => (
                <View key={category.category} style={styles.faqCard}>
                  <Pressable
                    onPress={() =>
                      setExpandedFaq((prev) => (prev === category.category ? null : category.category))
                    }
                    style={styles.faqHeader}
                  >
                    <Text style={styles.featureTitle}>{category.category}</Text>
                    <Text style={styles.chevron}>
                      {expandedFaq === category.category ? "▲" : "▼"}
                    </Text>
                  </Pressable>
                  {expandedFaq === category.category &&
                    category.questions.map((faq, index) => (
                      <View key={faq.q} style={styles.faqItem}>
                        <Text style={styles.accordionText}>
                          Q{index + 1}. {faq.q}
                        </Text>
                        <Text style={[styles.accordionText, styles.accordionAnswer]}>{faq.a}</Text>
                      </View>
                    ))}
                </View>
              ))}
            </View>
          )}

          <View style={styles.quickCard}>
            <Text style={styles.quickTitle}>Quick Reference</Text>
            <View style={styles.quickRow}>
              <Text style={styles.quickLabel}>Add Items</Text>
              <Text style={styles.quickTip}>Tap + on any screen</Text>
            </View>
            <View style={styles.quickRow}>
              <Text style={styles.quickLabel}>Drag & Drop</Text>
              <Text style={styles.quickTip}>Hold and move items to reorder</Text>
            </View>
            <View style={styles.quickRow}>
              <Text style={styles.quickLabel}>Recurring</Text>
              <Text style={styles.quickTip}>Toggle repeat for events/tasks</Text>
            </View>
            <View style={styles.quickRow}>
              <Text style={styles.quickLabel}>Reminders</Text>
              <Text style={styles.quickTip}>Set alerts for important dates</Text>
            </View>
          </View>

          <View style={styles.footer}>
            {quickTips.map((tip) => (
              <Text key={tip} style={styles.footerText}>
                • {tip}
              </Text>
            ))}
            <Text style={styles.footerMuted}>Family Chores v1.0.0 · Made with ❤️ for families</Text>
          </View>
        </ScrollView>
      </AppLayout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    paddingBottom: 120,
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
  subtitle: {
    color: theme.colors.mutedForeground,
  },
  heroCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0c2b5f",
    borderRadius: 24,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 6 },
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
  heroIconText: {
    fontSize: 28,
    color: theme.colors.primaryForeground,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.primaryForeground,
  },
  heroSubtitle: {
    color: "#a9c6ff",
  },
  tutorialCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    justifyContent: "space-between",
  },
  tutorialTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  tutorialSubtitle: {
    color: theme.colors.mutedForeground,
    fontSize: 12,
  },
  searchInput: {
    height: 48,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.muted,
    borderRadius: 16,
    marginBottom: theme.spacing.sm,
    color: theme.colors.foreground,
  },
  tabRow: {
    flexDirection: "row",
    backgroundColor: theme.colors.muted,
    borderRadius: 18,
    padding: 4,
    marginBottom: theme.spacing.sm,
  },
  tabPill: {
    flex: 1,
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    borderRadius: 16,
  },
  tabActive: {
    backgroundColor: theme.colors.card,
  },
  tabText: {
    color: theme.colors.mutedForeground,
    fontWeight: "600",
  },
  tabTextActive: {
    color: theme.colors.foreground,
  },
  section: {
    marginTop: theme.spacing.sm,
  },
  sectionLabel: {
    color: theme.colors.mutedForeground,
    fontSize: 12,
    marginBottom: theme.spacing.sm,
  },
  featureCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  featureHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: theme.colors.muted,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.sm,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  featureSubtitle: {
    color: theme.colors.mutedForeground,
    fontSize: 12,
  },
  accordionContent: {
    marginTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.muted,
    paddingTop: theme.spacing.sm,
  },
  accordionLabel: {
    fontWeight: "700",
    color: theme.colors.foreground,
    marginBottom: theme.spacing.xs,
  },
  accordionText: {
    color: theme.colors.mutedForeground,
    fontSize: 12,
    marginBottom: theme.spacing.xs,
  },
  faqCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqItem: {
    marginTop: theme.spacing.sm,
  },
  quickCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  quickTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: theme.spacing.sm,
  },
  quickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.xs,
  },
  quickLabel: {
    fontWeight: "600",
    color: theme.colors.foreground,
  },
  quickTip: {
    color: theme.colors.mutedForeground,
    fontSize: 12,
  },
  footer: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.muted,
  },
  footerText: {
    color: theme.colors.mutedForeground,
    fontSize: 12,
    marginBottom: theme.spacing.xs,
  },
  footerMuted: {
    color: theme.colors.mutedForeground,
    fontSize: 10,
    textAlign: "center",
  },
});
