import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AppLayout } from "../components/layout/AppLayout";
import { AppSidebar } from "../components/layout/AppSidebar";
import { theme } from "../theme";

const sections = [
  {
    title: "Features",
    items: [
      { label: "Recipes & Meals", description: "Meal planning & recipes" },
      { label: "Nutrition & Health", description: "Track health & diet" },
      { label: "Expenses & Finance", description: "Budget & spending" },
    ],
  },
  {
    title: "Family",
    items: [{ label: "Family Members", description: "Manage family profiles" }],
  },
  {
    title: "Settings",
    items: [
      { label: "Notifications", description: "Alerts & quiet hours" },
      { label: "Privacy & Security", description: "Data protection" },
      { label: "Theme", description: "Light / Dark mode" },
      { label: "Data Export", description: "Backup your data" },
      { label: "Help & Support", description: "FAQ & contact us" },
    ],
  },
];

export const MoreScreen: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <AppLayout showNav={false}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setSidebarOpen(true)} style={styles.menuButton}>
              <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Settings</Text>
          </View>

          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarIcon}>👨</Text>
            </View>
            <View>
              <Text style={styles.profileName}>Shivam Kumar</Text>
              <Text style={styles.profileEmail}>shivam@email.com</Text>
            </View>
          </View>

          {sections.map((section) => (
            <View key={section.title} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {section.items.map((item) => (
                <TouchableOpacity key={item.label} style={styles.menuItem}>
                  <View>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                    <Text style={styles.menuDesc}>{item.description}</Text>
                  </View>
                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
          <Text style={styles.version}>Family Chores v1.0.0</Text>
        </ScrollView>
      </AppLayout>
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  menuButton: {
    padding: theme.spacing.sm,
    borderRadius: 12,
    backgroundColor: theme.colors.card,
  },
  menuIcon: {
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.foreground,
    marginLeft: theme.spacing.md,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: theme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  avatarIcon: {
    fontSize: 28,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "700",
  },
  profileEmail: {
    color: theme.colors.mutedForeground,
    fontSize: 12,
  },
  section: {
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 12,
    color: theme.colors.mutedForeground,
    textTransform: "uppercase",
    marginBottom: theme.spacing.sm,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    marginBottom: theme.spacing.sm,
  },
  menuLabel: {
    fontWeight: "600",
    color: theme.colors.foreground,
  },
  menuDesc: {
    color: theme.colors.mutedForeground,
    fontSize: 12,
  },
  chevron: {
    color: theme.colors.mutedForeground,
    fontSize: 20,
  },
  logoutButton: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.primaryLight,
    paddingVertical: theme.spacing.sm,
    borderRadius: 16,
    alignItems: "center",
  },
  logoutText: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
  version: {
    textAlign: "center",
    color: theme.colors.mutedForeground,
    marginTop: theme.spacing.md,
    fontSize: 12,
  },
});
