import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AppLayout } from "../components/layout/AppLayout";
import { theme } from "../theme";
import { useSidebar } from "../contexts/SidebarContext";

const sections = [
  {
    title: "FEATURES",
    items: [
      { label: "Recipes & Meals", description: "Meal planning & recipes", icon: "🍽️", color: "#8da3c5", route: "Recipes" },
      { label: "Nutrition & Health", description: "Track health & diet", icon: "❤️", color: "#f6b6b6", route: "Nutrition" },
      { label: "Expenses & Finance", description: "Budget & spending", icon: "💼", color: "#ccf0d7", route: "Expenses" },
    ],
  },
  {
    title: "FAMILY",
    items: [
      { label: "Family Members", description: "Manage family profiles", icon: "👥", color: "#1b315d", badge: "4", route: "Family" },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      { label: "Notifications", description: "Alerts & quiet hours", icon: "🔔", color: "#ffe3b6", route: "Notifications" },
      { label: "Privacy & Security", description: "Data protection", icon: "🛡️", color: "#d4e5f6", route: "Privacy" },
      { label: "Theme", description: "Light / Dark mode", icon: "🎨", color: "#d4e5f6", route: "Theme" },
      { label: "Data Export", description: "Backup your data", icon: "⬇️", color: "#d4e5f6", route: "DataExport" },
      { label: "Help & Support", description: "FAQ & contact us", icon: "❓", color: "#d4e5f6", route: "Help" },
    ],
  },
];

export const MoreScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<Record<string, undefined>>>();
  const { openSidebar } = useSidebar();

  return (
    <>
      <AppLayout showNav={false}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Pressable onPress={openSidebar} style={styles.menuButton}>
              <Text style={styles.menuIcon}>☰</Text>
            </Pressable>
            <Text style={styles.title}>Settings</Text>
          </View>
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarIcon}>👨</Text>
              <View style={styles.cameraBadge}>
                <Text style={styles.cameraIcon}>📷</Text>
              </View>
            </View>
            <View>
              <Text style={styles.profileName}>Shivam Kumar</Text>
              <Text style={styles.profileEmail}>shivam@email.com</Text>
              <View style={styles.roleBadge}>
                <Text style={styles.roleText}>Family Admin</Text>
              </View>
            </View>
          </View>

          {sections.map((section) => (
            <View key={section.title} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.sectionCard}>
                {section.items.map((item) => (
                  <Pressable
                    key={item.label}
                    style={styles.itemRow}
                    onPress={() => item.route && navigation.navigate(item.route)}
                  >
                    <View style={[styles.itemIcon, { backgroundColor: item.color }]}>
                      <Text style={styles.iconText}>{item.icon}</Text>
                    </View>
                    <View style={styles.itemText}>
                      <Text style={styles.itemLabel}>{item.label}</Text>
                      <Text style={styles.itemDesc}>{item.description}</Text>
                    </View>
                    {item.badge && (
                      <View style={styles.numberBadge}>
                        <Text style={styles.numberText}>{item.badge}</Text>
                      </View>
                    )}
                    <Text style={styles.chevron}>›</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
          <Pressable style={styles.logoutButton}>
            <Text style={styles.logoutText}>Sign Out</Text>
          </Pressable>
          <Text style={styles.version}>Family Chores v1.0.0 · Made with ❤️ for families</Text>
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
  header: {
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
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: theme.colors.foreground,
    marginLeft: theme.spacing.md,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 5,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: "#1b315d",
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  avatarIcon: {
    fontSize: 36,
    marginBottom: 4,
  },
  cameraBadge: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIcon: {
    fontSize: 14,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  profileEmail: {
    color: theme.colors.mutedForeground,
    fontSize: 14,
    marginBottom: theme.spacing.xs,
  },
  roleBadge: {
    backgroundColor: "#dfeafb",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  roleText: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
  section: {
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: theme.colors.mutedForeground,
    marginBottom: theme.spacing.sm,
  },
  sectionCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    shadowColor: "#0a1a3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
  },
  itemIcon: {
    width: 46,
    height: 46,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  iconText: {
    fontSize: 20,
  },
  itemText: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.foreground,
  },
  itemDesc: {
    color: theme.colors.mutedForeground,
    fontSize: 13,
  },
  numberBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.sm,
  },
  numberText: {
    color: theme.colors.primaryForeground,
    fontWeight: "700",
  },
  chevron: {
    color: theme.colors.mutedForeground,
    fontSize: 20,
  },
  logoutButton: {
    backgroundColor: "#fff5f5",
    borderRadius: 24,
    paddingVertical: theme.spacing.md,
    marginTop: theme.spacing.md,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ff7c7c",
  },
  logoutText: {
    color: "#ff2d55",
    fontSize: 16,
    fontWeight: "700",
  },
  version: {
    textAlign: "center",
    color: theme.colors.mutedForeground,
    marginTop: theme.spacing.md,
    fontSize: 12,
  },
});
